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
    const m = new URL(req.url).pathname.match(/^\/s\/([A-Za-z0-9_-]{22,64})$/);
    if (!m) return out(404, 'non trovato');
    const tok = (req.headers.get('authorization') || '').replace(/^Bearer /, '');
    if (tok.length < 32 || tok.length > 128) return out(401, 'token mancante');
    const th = hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(tok)));
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
    if (req.method === 'DELETE') { await env.SYNC.delete(key); return out(200, '{}', { 'Content-Type': 'application/json' }); }
    return out(405, 'metodo non consentito');
  }
};
