// Server di sincronizzazione di Unica: conserva SOLO dati già cifrati sul dispositivo.
// Un "spazio" = id casuale + token casuale. Il server memorizza l'hash del token, mai il token.
const MAX = 20 * 1024 * 1024;
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
const same = (a, b) => { if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0; };
export default {
  async fetch(req, env) {
    const cors = { 'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*', 'Access-Control-Allow-Headers': 'authorization,content-type,x-rev', 'Access-Control-Allow-Methods': 'GET,PUT,DELETE,OPTIONS', 'Access-Control-Expose-Headers': 'x-rev', 'Vary': 'Origin', 'Cache-Control': 'no-store' };
    const out = (s, b, h) => new Response(b || null, { status: s, headers: { ...cors, ...(h || {}) } });
    if (req.method === 'OPTIONS') return out(204);
    const path = new URL(req.url).pathname;
    if (path === '/push/key') return out(200, env.VAPID_PUBLIC || '', { 'Content-Type': 'text/plain' });
    const pm = path.match(/^\/push\/([A-Za-z0-9_-]{22,64})$/);
    const m = pm || path.match(/^\/s\/([A-Za-z0-9_-]{22,64})$/);
    if (!m) return out(404, 'non trovato');
    const tok = (req.headers.get('authorization') || '').replace(/^Bearer /, '');
    if (tok.length < 32 || tok.length > 128) return out(401, 'token mancante');
    const th = hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(tok)));
    if (pm) return pushRoute(req, env, out, pm[1], th);
    const key = 'd:' + m[1], cur = await env.SYNC.getWithMetadata(key, 'text');
    if (cur.value !== null && !same(cur.metadata.h, th)) return out(403, 'token errato');
    const have = cur.value === null ? 0 : cur.metadata.rev;
    if (req.method === 'GET') return cur.value === null ? out(404, 'vuoto') : out(200, cur.value, { 'Content-Type': 'application/json', 'x-rev': String(have) });
    if (req.method === 'PUT') {
      if (+(req.headers.get('x-rev') || '0') !== have) return out(409, 'conflitto', { 'x-rev': String(have) });
      const body = await req.text(); if (body.length > MAX) return out(413, 'troppo grande');
      try { const j = JSON.parse(body); if (j.app !== 'unica' || !Array.isArray(j.items)) throw 0; } catch (e) { return out(400, 'formato non valido'); }
      await env.SYNC.put(key, body, { metadata: { h: th, rev: have + 1 } });
      return out(200, JSON.stringify({ rev: have + 1 }), { 'Content-Type': 'application/json', 'x-rev': String(have + 1) });
    }
    if (req.method === 'DELETE') { await env.SYNC.delete(key); await env.SYNC.delete('p:' + m[1]); return out(200, '{}', { 'Content-Type': 'application/json' }); }
    return out(405, 'metodo non consentito');
  },
  // ogni ora: invia i promemoria in scadenza (push senza contenuto: il server non sa nulla dei tuoi dati)
  async scheduled(event, env, ctx) { ctx.waitUntil(sendDue(env, new Date(event.scheduledTime || Date.now()))); }
};

/* ---------- Web Push (promemoria settimanale/giornaliero, senza payload) ---------- */
const b64u = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
async function pushRoute(req, env, out, id, th) {
  const key = 'p:' + id, cur = await env.SYNC.getWithMetadata(key, 'text');
  if (cur.value !== null && !same(cur.metadata.h, th)) return out(403, 'token errato');
  if (req.method === 'DELETE') { await env.SYNC.delete(key); return out(200, '{}', { 'Content-Type': 'application/json' }); }
  if (req.method === 'GET') return out(cur.value === null ? 404 : 200, cur.value, { 'Content-Type': 'application/json' });
  if (req.method !== 'PUT') return out(405, 'metodo non consentito');
  let j; try { j = JSON.parse(await req.text()); } catch (e) { return out(400, 'formato non valido'); }
  let ep; try { ep = new URL(j.sub && j.sub.endpoint); } catch (e) { return out(400, 'endpoint non valido'); }
  if (ep.protocol !== 'https:' || ep.href.length > 600) return out(400, 'endpoint non valido');
  const rec = { endpoint: ep.href, dow: Number.isInteger(j.dow) && j.dow >= -1 && j.dow <= 6 ? j.dow : 0, hour: Number.isInteger(j.hour) && j.hour >= 0 && j.hour <= 23 ? j.hour : 9, off: Number.isInteger(j.off) ? Math.max(-840, Math.min(840, j.off)) : 0 };
  await env.SYNC.put(key, JSON.stringify(rec), { metadata: { h: th } });
  return out(200, '{}', { 'Content-Type': 'application/json' });
}
async function vapidHeader(env, endpoint) {
  const aud = new URL(endpoint).origin, enc = o => b64u(new TextEncoder().encode(JSON.stringify(o)));
  const head = enc({ typ: 'JWT', alg: 'ES256' }), body = enc({ aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: env.VAPID_SUBJECT || 'mailto:admin@example.com' });
  const k = await crypto.subtle.importKey('jwk', JSON.parse(env.VAPID_PRIVATE), { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, k, new TextEncoder().encode(head + '.' + body));
  return 'vapid t=' + head + '.' + body + '.' + b64u(sig) + ', k=' + env.VAPID_PUBLIC;
}
async function sendDue(env, now) {
  if (!env.VAPID_PRIVATE || !env.VAPID_PUBLIC) return;
  let cursor; do {
    const l = await env.SYNC.list({ prefix: 'p:', cursor }); cursor = l.list_complete ? undefined : l.cursor;
    for (const k of l.keys) {
      const v = await env.SYNC.get(k.name); if (!v) continue; let r; try { r = JSON.parse(v); } catch (e) { continue; }
      const local = new Date(now.getTime() - r.off * 60000); // ora locale dell'utente (off = getTimezoneOffset)
      if (local.getUTCHours() !== r.hour) continue;
      if (r.dow !== -1 && local.getUTCDay() !== r.dow) continue;
      try { const res = await fetch(r.endpoint, { method: 'POST', headers: { Authorization: await vapidHeader(env, r.endpoint), TTL: '86400', 'Content-Length': '0', Urgency: 'low' } }); if (res.status === 404 || res.status === 410) await env.SYNC.delete(k.name); } catch (e) { }
    }
  } while (cursor);
}
