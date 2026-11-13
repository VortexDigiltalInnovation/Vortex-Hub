# Unica – note di sicurezza (revisione fase 7)

Revisione interna del codice e test automatici su Chromium. **Non è un audit indipendente**: prima di affidare dati molto sensibili conviene farne uno.

## Come proteggiamo i dati
- AES-256-GCM per ogni elemento; AAD = id|tipo|versione (un record non si può scambiare con un altro né riportare a una versione diversa).
- Master password → PBKDF2-SHA256 600.000 iterazioni → chiave che avvolge due chiavi casuali da 256 bit: **Kc** (carte) e **Kp** (Vault e conti).
- Codice di recupero a 24 parole (11 bit per parola, 264 bit in totale) → HKDF → seconda copia delle chiavi.
- Le chiavi in memoria sono `CryptoKey` non estraibili; i byte grezzi vengono azzerati dopo l'uso.
- Passkey (WebAuthn + PRF): sblocca le carte e, se il dispositivo supporta PRF, anche l'area protetta. Senza PRF l'area protetta chiede sempre la master password.
- Blocco automatico: inattività (1/5/15 min), app in background, Kp azzerata dopo 2 minuti se non si entra nell'area protetta, report di stampa rimosso al blocco.
- Tentativi di password: attesa crescente dal 3° errore.
- Clipboard svuotata dopo 30 s. Controllo password compromesse con k-anonymity (solo 5 caratteri dell'hash, con padding).

## Cosa è stato verificato (test automatici)
| Controllo | Esito |
|---|---|
| Nessun dato in chiaro (nomi carte, codici, password) in IndexedDB | ok |
| Scambio di ciphertext tra due record (stessa chiave) | rifiutato (AAD) |
| Bit alterato nel ciphertext | rifiutato, nessun crash |
| Script/handler inline iniettati nel DOM | bloccati dalla CSP |
| Nomi/valori ostili (`<img onerror>`, `__proto__`, NaN, 1e999) in carte, link condivisi, Fidelity JSON, Financial Dashboard, Vault | mostrati come testo, nessuna esecuzione, nessun prototype pollution |
| Dopo il blocco: chiavi, elementi decifrati e report di stampa | azzerati (il report restava nel DOM: **corretto in questa versione**) |
| Limite tentativi password | attivo |
| Backup .enc: password sbagliata / recupero / verifica senza modificare i dati | ok |

## Limiti noti (da conoscere)
1. **Backup**: chi ha il file `.enc` può tentare la password offline. La sicurezza dipende dalla forza della master password (la soglia minima è bassa: usa una frase lunga). Il limite tentativi vale solo sul dispositivo.
2. **Cambio password**: i vecchi backup si aprono ancora con la vecchia password. Rifai il backup dopo ogni cambio.
3. **Dispositivo compromesso** (malware, estensioni ostili, schermo condiviso): nessuna app web può difendersi.
4. **Passkey senza PRF**: protegge solo l'accesso alle carte (chiave legata al dispositivo), non è una crittografia a sé.
5. **Rotazione completa delle chiavi** (Kc/Kp) non c'è: oggi cambia solo la master password. Da fare con la sincronizzazione.
6. **Google Drive** è opzionale e provato solo con risposte simulate; il file resta cifrato. Il token resta in memoria.
7. **Link di condivisione carta** contiene nome e codice in chiaro nel frammento dell'URL (non va ai server, ma chi ha il link vede il codice).
8. La CSP è in un meta tag: `frame-ancestors` e gli header veri vanno impostati dall'hosting (file `_headers` incluso per Netlify/Cloudflare Pages).
9. Nessuna sincronizzazione tra dispositivi: i dati vivono solo sul dispositivo e nei backup.

## Prima di usarla per davvero
- Pubblica solo su HTTPS (serve per passkey, crittografia e service worker) con gli header di `_headers`.
- Fai un backup, **poi** prova a ripristinarlo su un altro browser con "Verifica un file di backup" e con il ripristino reale.
- Prova su iPhone/Safari e Android/Chrome: i test sono stati fatti solo su Chromium desktop.
- Conserva il codice di recupero su carta, fuori dal telefono.
