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
5. **Rotazione delle chiavi**: Impostazioni → Sicurezza → «Cambia le chiavi di cifratura». Genera chiavi nuove, ricifra tutto in un'unica operazione atomica e crea un nuovo codice di recupero. Non cancella la copia già presente su un dispositivo perso (resta cifrata con le vecchie chiavi e con la vecchia password): cambia quindi anche la master password e fai la rotazione appena possibile. Le copie interne con le chiavi precedenti vanno eliminate se il rischio era la compromissione del dispositivo.
6. **Google Drive** è opzionale e provato solo con risposte simulate; il file resta cifrato. Il token resta in memoria.
7. **Link di condivisione carta** contiene nome e codice in chiaro nel frammento dell'URL (non va ai server, ma chi ha il link vede il codice).
8. La CSP è in un meta tag: `frame-ancestors` e gli header veri vanno impostati dall'hosting (file `_headers` incluso per Netlify/Cloudflare Pages).
9. **Sincronizzazione** (facoltativa, Cloudflare Worker + KV): sul server arrivano solo dati già cifrati; il server non ha mai le chiavi. Chi possiede il *codice di collegamento* (indirizzo + id + token) può leggere i dati cifrati e anche cancellarli o riportarli a una versione precedente: non condividerlo e tieni backup regolari. Il merge è per elemento (versione più alta, poi data più recente); due modifiche simultanee allo stesso elemento: vince l'ultima. KV è eventualmente coerente (fino a ~1 minuto). Il token è salvato cifrato con la chiave delle carte. Chiunque conosca l'indirizzo del tuo Worker può creare spazi propri (uso del tuo piano gratuito): non diffonderlo.
10. Non c'è un elenco dei singoli dispositivi: per escluderne uno si fa la rotazione delle chiavi, che crea anche un nuovo spazio di sincronizzazione (nuovo id e token) ed elimina il vecchio; gli altri dispositivi vanno ricollegati con il nuovo codice.

11. **Backup interni** (IndexedDB, solo cifrati): proteggono da errori e ripristini sbagliati, non dalla perdita o dal furto del dispositivo; l'eliminazione dell'account li cancella. Una copia vecchia si apre con la master password in vigore *quando fu creata* (o con il codice di recupero).
12. **Assistente**: tutto locale, nessuna IA esterna. La dettatura vocale usa il riconoscimento del browser, che su alcuni browser elabora l'audio presso il fornitore; la lettura a voce usa solo voci locali. Le password non vengono mai lette né mostrate nei risultati di ricerca.

13. **Condivisione di credenziali**: i messaggi di testo (WhatsApp, SMS, email…) restano nelle chat di terzi; per le password usa il file cifrato con codice monouso (PBKDF2 600.000 iterazioni + AES-GCM) e comunica il codice a parte. Il codice ha circa 60 bit: adatto a un uso una tantum, non come protezione di lungo periodo.

14. **Backup su cartella**: i file `.enc` restano cifrati, ma la cartella è fuori dal controllo dell'app (chi la sincronizza, ad es. OneDrive, vede solo dati cifrati). Su Drive e sulla cartella la rotazione elimina solo i file creati da Unica con il proprio schema di nome.

## Prima di usarla per davvero
- Pubblica solo su HTTPS (serve per passkey, crittografia e service worker) con gli header di `_headers`.
- Fai un backup, **poi** prova a ripristinarlo su un altro browser con "Verifica un file di backup" e con il ripristino reale.
- Prova su iPhone/Safari e Android/Chrome: i test sono stati fatti solo su Chromium desktop.
- Conserva il codice di recupero su carta, fuori dal telefono.
15. L'esportazione CSV del Vault è in chiaro per natura: il file non è cifrato e resta sul dispositivo (e nei suoi backup) finché non lo elimini. I CSV importati da altri gestori vanno cancellati dopo l'uso.
16. L'avviso «negozi vicini» (facoltativo) invia a OpenStreetMap un'area di circa 150 m e i nomi dei negozi; è attivo solo con l'app aperta e solo se lo abiliti.
17. La ricerca automatica di sito e logo (facoltativa, chiede il consenso la prima volta) invia il NOME del negozio a Wikidata e il dominio a icon.horse, Google e DuckDuckGo; per questo la CSP ammette immagini da questi host. Le carte e i codici non partono mai. Si disattiva rispondendo «no» o cancellando la chiave `unica_web`.
18. Il riconoscimento dell'insegna da foto con OCR (Tesseract da CDN) di Fidelity Wallet non è incluso: richiederebbe codice esterno non verificabile (script da CDN) in un'app che gestisce segreti.
19. IA generativa (facoltativa): usa la TUA chiave API (Claude o OpenAI), cifrata sul dispositivo con la chiave delle carte (non è nei backup né nella sincronizzazione: va reinserita sugli altri dispositivi). Verso il servizio parte solo il testo scritto nella chat IA, con un avviso se sembra contenere IBAN, numeri di carta o password. Il servizio può conservare i messaggi secondo le sue regole. La chiave in sé è un segreto di fatturazione: chi sblocca le carte può usarla. Si possono usare chiavi con limite di spesa. La CSP ammette connessioni solo a api.anthropic.com e api.openai.com.
20. Sblocco biometrico per l'area protetta senza PRF (facoltativo, con consenso): la chiave principale è custodita da una chiave non estraibile del dispositivo e rilasciata dopo la verifica biometrica WebAuthn, ma il controllo biometrico è applicato dall'app: un attaccante che esegue codice nell'origine di Unica sul dispositivo sbloccato potrebbe ottenerla senza biometria. Per questo scade dopo 14 giorni o 25 sblocchi (serve la master password) e viene cancellato con la passkey o la rotazione delle chiavi. Con PRF (modalità più sicura) nulla di tutto ciò è necessario.
21. Avvisi di vicinanza: la posizione resta sul dispositivo; a OpenStreetMap vanno solo un'area di ~100 m e i NOMI dei negozi (non i codici). La cache dei negozi è cifrata. La posizione salvata in una carta è cifrata con le carte. Funziona solo con l'app aperta (nessun GPS in background nelle PWA).
22. Notifiche push: il tuo Worker conserva l'indirizzo anonimo di notifica del browser, giorno e ora; il push parte senza contenuto, tramite il servizio del browser (Google/Apple/Mozilla), che vede solo che Unica ha una notifica. Il titolo delle notifiche di vicinanza può mostrare il nome del negozio a schermo bloccato (disattivabile).
