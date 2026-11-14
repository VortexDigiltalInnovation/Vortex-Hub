// Genera la coppia di chiavi VAPID per le notifiche push. Uso:  node gen-vapid.mjs
// Poi:  npx wrangler secret put VAPID_PRIVATE   (incolla la riga "PRIVATA")
//       npx wrangler secret put VAPID_PUBLIC    (incolla la riga "PUBBLICA")
const { subtle } = globalThis.crypto;
const kp = await subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
const raw = new Uint8Array(await subtle.exportKey('raw', kp.publicKey));
const b64u = u => Buffer.from(u).toString('base64url');
console.log('PUBBLICA:', b64u(raw));
console.log('PRIVATA :', JSON.stringify(await subtle.exportKey('jwk', kp.privateKey)));
