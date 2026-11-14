# Server di sincronizzazione (Cloudflare Worker + KV) – gratuito

Il server vede solo dati cifrati sul tuo dispositivo e non può leggerli. Se non lo attivi, Unica funziona lo stesso (solo locale + backup).

## Installazione dal browser (senza comandi)
1. Su dash.cloudflare.com: **Workers & Pages → KV → Create namespace** (nome: `unica-sync`).
2. **Workers & Pages → Create → Worker**, nome `unica-sync`, Deploy; poi **Edit code**, incolla tutto `worker.js`, Deploy.
3. Nel Worker: **Settings → Bindings → Add → KV namespace**: nome variabile `SYNC`, scegli `unica-sync`.
4. **Settings → Variables**: aggiungi `ALLOWED_ORIGIN` = indirizzo dove pubblichi Unica (es. `https://unica.tuodominio.it`, senza barra finale).
5. Copia l'indirizzo del Worker (`https://unica-sync.TUO-NOME.workers.dev`): è quello da incollare in Unica → Impostazioni → Sincronizzazione.

## Con la riga di comando
`npx wrangler kv namespace create SYNC` → copia l'id in `wrangler.toml` → `npx wrangler deploy`.

## Note
- Il piano gratuito basta per uso personale. Limite per spazio: 20 MB (allegati del Vault inclusi).
- KV è «eventualmente coerente»: dopo una modifica un altro dispositivo può vedere il dato aggiornato entro ~1 minuto.
- Unica accetta per impostazione indirizzi `*.workers.dev`. Con un dominio personalizzato modifica `connect-src` nel meta CSP di `index.html` (e rigenera, se usi i sorgenti).

## Notifiche push (facoltative)
Il Worker può inviare un promemoria settimanale/giornaliero **senza contenuto** (nessun dato personale).
1. `node gen-vapid.mjs` genera una coppia di chiavi (stampa la PUBBLICA e la PRIVATA).
2. `npx wrangler secret put VAPID_PRIVATE` (incolla la riga PRIVATA) e `npx wrangler secret put VAPID_PUBLIC` (la PUBBLICA).
3. In `wrangler.toml` imposta `VAPID_SUBJECT` con la tua email (`mailto:…`). Il trigger orario (`[triggers] crons`) è già configurato.
4. `npx wrangler deploy`.
5. In Unica: Impostazioni → Notifiche push → «Ricordami ogni settimana» (richiede la sincronizzazione attiva e l'app su https; su iPhone installata nella schermata Home, iOS 16.4+).
Il server conserva solo l'indirizzo anonimo di notifica del browser, il giorno e l'ora scelti; il fuso orario è quello del dispositivo all'attivazione.
