# Vortex Hub 2.25.3

- Corretto il digest SHA-256 nella Content Security Policy (CSP) per lo script inline: la release 2.25.2 aveva un hash non corrispondente, che poteva bloccare l'intero JavaScript e impedire l'avvio.
- Aggiornata la cache del Service Worker.
- Nessuna modifica ai dati locali o alla struttura del database.
- Verifiche: sintassi JavaScript inline, Service Worker e OCR frame; hash CSP ricalcolato e verificato. Non testato su dispositivo Android fisico.
