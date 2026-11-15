# Installare Vortex Hub

Vortex Hub è una **Progressive Web App (PWA)**, non un file APK/EXE. Per motivi di sicurezza il browser non può installarla senza il tuo consenso.

## Prima di installare

1. Estrai tutto il contenuto dello ZIP.
2. Pubblica tutti i file e le cartelle estratti su un hosting statico **HTTPS**, mantenendo la struttura delle cartelle. Non caricare solo `index.html`.
3. Apri l’indirizzo HTTPS nel browser indicato sotto. Aprire `index.html` direttamente dal file manager (`file://`) non consente l’installazione né la geolocalizzazione.

## Se Chrome non offre «Installa»

In Vortex Hub apri Impostazioni → Aggiornamento e diagnostica → Verifica file. Se elenca file mancanti (per esempio `icons/icon-192x192.png`), non sono stati caricati: su GitHub Pages carica **anche la cartella `icons/` con tutti i 6 file PNG**, oltre a `index.html`, `sw.js`, `manifest.webmanifest`, `privacy.html`, `ocr.html`, `ocr-frame.js`. Con il caricamento dal sito web di GitHub le cartelle vanno trascinate intere (oppure usa «Add file → Upload files» entrando prima nella cartella `icons`). Poi premi «Ripara e ricarica» e riapri il sito. Chrome può impiegare qualche secondo a mostrare «Installa app» nel menu ⋮.

## Android

Apri il sito in Chrome o Edge e premi **Installa Vortex Hub** nel banner, oppure apri il menu ⋮ e scegli **Installa app** / **Aggiungi alla schermata Home**.

## iPhone e iPad

Apri il sito in **Safari**, premi **Condividi** e scegli **Aggiungi alla schermata Home**. Gli altri browser su iOS potrebbero non offrire l’installazione.

## Computer

In Chrome o Edge apri il sito e usa l’icona **Installa** nella barra degli indirizzi o il menu del browser.

## Posizione e avvisi

Al primo avvio consenti al browser di usare la posizione. Gli avvisi dentro Vortex Hub funzionano con l’app aperta; per le notifiche di sistema premi **Prova la notifica** nelle impostazioni e concedi il permesso. Il browser non permette a Vortex Hub di concedersi questi permessi da sola.
