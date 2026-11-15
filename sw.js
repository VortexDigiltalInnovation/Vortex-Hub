/* Unica – Service Worker: solo shell offline. Nessun dato utente passa dalla cache. */
const VERSION = 'unica-v2-2-0';
const SHELL = ['./', './index.html', './manifest.webmanifest', './privacy.html', './ocr.html', './ocr-frame.js', './icons/icon-192x192.png', './icons/icon-512x512.png', './icons/maskable-192x192.png', './icons/maskable-512x512.png', './icons/apple-touch-icon.png', './icons/favicon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => Promise.all(SHELL.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => null)))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== VERSION).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;   // API esterne: sempre rete, mai cache
  e.respondWith(fetch(r).then(res => { if (res.ok) { const c = res.clone(); caches.open(VERSION).then(ca => ca.put(r, c)); } return res; }).catch(() => caches.match(r).then(h => h || caches.match('./index.html'))));
});
/* Notifiche: tocco su una notifica -> apre l'app (e la carta, se indicata) */
self.addEventListener('notificationclick', e => {
  e.notification.close(); const id = e.notification.data && e.notification.data.cardId;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    const w = list.find(c => 'focus' in c); if (w) { if (id) w.postMessage({ t: 'openCard', id }); return w.focus(); }
    return self.clients.openWindow('./' + (id ? '?open=' + encodeURIComponent(id) : ''));
  }));
});
/* Web Push (senza contenuto): mostra un promemoria generico; il server non conosce i dati dell'utente */
self.addEventListener('push', e => {
  e.waitUntil(self.registration.showNotification('Unica · promemoria', { body: 'Controlla il backup cifrato e le scadenze: apri Unica.', icon: 'icons/icon-192x192.png', badge: 'icons/icon-192x192.png', tag: 'unica-reminder', renotify: false }));
});
