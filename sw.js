/* Unica – Service Worker: solo shell offline. Nessun dato utente passa dalla cache. */
const VERSION = 'unica-v0-6-0';
const SHELL = ['./', './index.html', './manifest.webmanifest', './privacy.html', './icons/icon-192x192.png', './icons/icon-512x512.png', './icons/maskable-192x192.png', './icons/maskable-512x512.png', './icons/apple-touch-icon.png', './icons/favicon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => Promise.all(SHELL.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => null)))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== VERSION).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;   // API esterne: sempre rete, mai cache
  e.respondWith(fetch(r).then(res => { if (res.ok) { const c = res.clone(); caches.open(VERSION).then(ca => ca.put(r, c)); } return res; }).catch(() => caches.match(r).then(h => h || caches.match('./index.html'))));
});
