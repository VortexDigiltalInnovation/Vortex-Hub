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
12. **Assistente**: l'assistente locale non invia dati a un'IA esterna. La dettatura vocale usa il riconoscimento del browser, che su alcuni browser elabora l'audio presso il fornitore; la lettura a voce usa solo voci locali. Le password non vengono mai lette né mostrate nei risultati di ricerca.

13. **Condivisione di credenziali**: i messaggi di testo (WhatsApp, SMS, email…) restano nelle chat di terzi; per le password usa il file cifrato con codice monouso (PBKDF2 600.000 iterazioni + AES-GCM) e comunica il codice a parte. Il codice ha circa 60 bit: adatto a un uso una tantum, non come protezione di lungo periodo.

14. **Backup su cartella**: i file `.enc` restano cifrati, ma la cartella è fuori dal controllo dell'app (chi la sincronizza, ad es. OneDrive, vede solo dati cifrati). Su Drive e sulla cartella la rotazione elimina solo i file creati da Unica con il proprio schema di nome.

## Prima di usarla per davvero
- Pubblica solo su HTTPS (serve per passkey, crittografia e service worker) con gli header di `_headers`.
- Fai un backup, **poi** prova a ripristinarlo su un altro browser con "Verifica un file di backup" e con il ripristino reale.
- Prova su iPhone/Safari e Android/Chrome: i test sono stati fatti solo su Chromium desktop.
- Conserva il codice di recupero su carta, fuori dal telefono.
15. L'esportazione CSV del Vault è in chiaro per natura: il file non è cifrato e resta sul dispositivo (e nei suoi backup) finché non lo elimini. I CSV importati da altri gestori vanno cancellati dopo l'uso.
16. La ricerca «negozi vicini» e gli avvisi di prossimità sono attivi per impostazione iniziale dopo lo sblocco. Inviano a OpenStreetMap un'area approssimata di circa 100 m e i nomi dei negozi; funzionano solo con l'app aperta e si possono disattivare in Impostazioni. La posizione precisa resta sul dispositivo.
17. La ricerca automatica di sito e logo è attiva per impostazione iniziale: invia il NOME del negozio a Wikidata e il dominio a icon.horse, Google e DuckDuckGo; per questo la CSP ammette immagini da questi host. Le carte e i codici non partono mai. Si disattiva in Impostazioni.
18. Il riconoscimento dell'insegna da foto con OCR (Tesseract da CDN) di Fidelity Wallet non è incluso: richiederebbe codice esterno non verificabile (script da CDN) in un'app che gestisce segreti.
19. IA generativa (facoltativa): usa la TUA chiave API (Claude o OpenAI), cifrata sul dispositivo con la chiave delle carte (non è nei backup né nella sincronizzazione: va reinserita sugli altri dispositivi). Verso il servizio parte solo il testo scritto nella chat IA, con un avviso se sembra contenere IBAN, numeri di carta o password. Il servizio può conservare i messaggi secondo le sue regole. La chiave in sé è un segreto di fatturazione: chi sblocca le carte può usarla. Si possono usare chiavi con limite di spesa. La CSP ammette connessioni solo a api.anthropic.com e api.openai.com.
20. Sblocco biometrico per l'area protetta senza PRF (facoltativo, con consenso): la chiave principale è custodita da una chiave non estraibile del dispositivo e rilasciata dopo la verifica biometrica WebAuthn, ma il controllo biometrico è applicato dall'app: un attaccante che esegue codice nell'origine di Unica sul dispositivo sbloccato potrebbe ottenerla senza biometria. Per questo scade dopo 14 giorni o 25 sblocchi (serve la master password) e viene cancellato con la passkey o la rotazione delle chiavi. Con PRF (modalità più sicura) nulla di tutto ciò è necessario.
21. Avvisi di vicinanza: la posizione precisa resta sul dispositivo; a OpenStreetMap vanno solo un'area di ~100 m e i NOMI dei negozi (non i codici). La cache dei negozi è cifrata. La posizione salvata in una carta è cifrata con le carte. Funziona solo con l'app aperta (nessun GPS in background nelle PWA). Il browser deve autorizzare l'accesso alla posizione e alle notifiche di sistema.
22. Notifiche push: il tuo Worker conserva l'indirizzo anonimo di notifica del browser, giorno e ora; il push parte senza contenuto, tramite il servizio del browser (Google/Apple/Mozilla), che vede solo che Unica ha una notifica. Il titolo delle notifiche di vicinanza può mostrare il nome del negozio a schermo bloccato (disattivabile).

23. **Ricerca vocale**: il riconoscimento è del browser (Web Speech API). Si prova prima l'elaborazione locale; se il pacchetto italiano non è disponibile, l'app chiede il consenso prima di passare al riconoscimento online, che potrebbe inviare l'audio al servizio vocale del browser. Il testo riconosciuto serve solo a filtrare le carte e non viene salvato né inviato altrove.

24. **TOTP**: la chiave 2FA è un campo della voce, cifrato come la password. Tenere password e 2FA nello stesso posto riduce la protezione "a due fattori": usa una master password lunga.
25. **Carta cifrata condivisa**: «monouso» è garantito solo sul dispositivo che riceve (il file porta un identificativo che l'app ricorda) e dalla scadenza di 48 ore; chi possiede file e codice può comunque aprirlo da un altro dispositivo prima di quella scadenza. Il codice (60 bit) protegge dal tentativo offline in modo ragionevole ma non quanto una master password: comunicalo su un canale diverso dal file.

26. **OCR**: il motore è codice esterno (Tesseract da jsDelivr, versione fissata) ma gira in un iframe `sandbox` senza `allow-same-origin`, con CSP propria: non può leggere IndexedDB, chiavi o pagina di Unica; riceve solo la foto scelta. Non usa integrità SRI (hash non verificabile in fase di build): chi preferisce può ospitare i file Tesseract sul proprio dominio e cambiare gli URL in `ocr-frame.js`.
27. **_headers**: `ocr.html` deve poter essere incorniciato dalla stessa origine; per questo le intestazioni `X-Frame-Options: DENY` ora sono elencate per ogni file tranne `ocr.html`. Se usi un hosting diverso da Netlify/Cloudflare Pages, replica la regola.
28. **IA del browser**: elaborazione sul dispositivo, ma dipende dal browser (può scaricare un modello di alcuni GB).
29. **Allegati**: cifrati come le altre voci; il limite per file è 15 MB. Le foto non vengono ripulite dai metadati (posizione, ecc.) prima di essere salvate: restano cifrate nel Vault ma, se le scarichi e le inoltri, portano i metadati originali.


## Ricerca vocale (v2.3.0)
La ricerca vocale usa il riconoscimento del browser. Su Chrome per Android l'audio viene in genere inviato al servizio di riconoscimento di Google; Unica non lo registra né lo salva e usa solo il testo riconosciuto per filtrare le carte. Se non vuoi che l'audio lasci il dispositivo, non usare il microfono e scrivi la ricerca.


## Biometria in un tocco (v2.5.0)
L'attivazione rapida usa solo l'autenticatore del dispositivo (WebAuthn platform). Se il dispositivo non supporta PRF, la chiave dell'area protetta resta custodita da una chiave non estraibile del dispositivo, con scadenza di 14 giorni o 25 sblocchi: ora viene attivata subito insieme alla passkey invece di chiedere una seconda conferma. Si disattiva da Impostazioni.


## Loghi (v2.6.0)
Il recupero dei loghi invia a icon.horse, Google o DuckDuckGo soltanto il nome del sito (es. netflix.com), mai password, codici o nomi utente. Parte solo dopo il tuo consenso (stessa impostazione della ricerca automatica) e puoi disattivarla da Impostazioni. I loghi scaricati sono salvati dentro la voce cifrata. Per le voci del Vault la ricerca avviene solo ad area protetta aperta.

## Biometria (v2.6.0)
La passkey è creata come credenziale non rilevabile sul solo autenticatore del dispositivo (residentKey: discouraged, attachment: platform). Nessuna chiave resta nel gestore password di Google.


## Rinomina in Vortex Hub (2.9.0)
Nessuna modifica crittografica: AES-256-GCM, PBKDF2 600k, sincronizzazione a conoscenza zero e codice di recupero restano identici. I nomi tecnici interni (database `unica`, chiavi `unica_*`, etichette di derivazione) sono rimasti invariati di proposito, perché cambiarli renderebbe illeggibili i dati e i backup già cifrati. Il logo è incorporato nel file, senza richieste di rete.


## Blocco, backup e dispositivi (2.10.0)
- Il blocco per uscita dall'app usa il momento in cui la pagina passa in secondo piano; è disattivato per impostazione predefinita perché alcuni selettori di file lo possono far scattare.
- L'elenco dispositivi è un elemento cifrato come le carte (chiave dell'account) e viaggia con la sincronizzazione; il server non vede nomi né date.
- La «revoca» non è un semplice flag: un dispositivo che ha già la chiave potrebbe continuare a leggere ciò che ha. Per questo avvia il cambio delle chiavi (nuove chiavi, nuovo codice di recupero, nuovo spazio di sincronizzazione). I dati già presenti sul dispositivo revocato non si possono cancellare da remoto.
- Le categorie apprese e le scadenze restano sul dispositivo e nei backup cifrati; nessuna richiesta di rete in più.

## Impostazioni compatte (2.10.1)
Modifica solo di interfaccia: nessun cambiamento a cifratura, chiavi, backup o rete. La preferenza delle sezioni aperte (`unica_setopen`) contiene solo i nomi delle sezioni e delle schede, mai dati. Hash CSP di script e stile ricalcolati.

## Assistente nella Home e meteo (2.11.0)
- Nuovo host nella CSP (`connect-src`): `https://api.open-meteo.com`. Viene contattato solo se attivi il meteo e dopo un consenso esplicito.
- Alla richiesta vanno solo latitudine e longitudine arrotondate a 2 decimali (circa 1 km), senza cookie né referrer. La posizione non viene salvata: in `localStorage` (`unica_wxc`) resta solo l’ultima previsione (temperature, codice meteo, vento, probabilità di pioggia).
- Preferenze: `unica_wx` (meteo acceso, 1/0) e `unica_jv` (assistente visibile, 0 = nascosto).
- Il briefing legge solo dati già disponibili senza area protetta (scadenze delle carte, età dell’ultimo backup, stato di sincronizzazione, carte vicine, batteria). Nessun dato del Vault o dei Conti, nessuna chiamata all’IA.

## Nuovo logo e colori (2.12.0)
Solo grafica: nessun cambiamento a cifratura, chiavi, backup, permessi o host di rete. Icone e logo sono immagini incorporate nella pagina (`data:`), già consentite dalla CSP. Hash CSP di script e stile ricalcolati.

## Agenda e scadenze personali (2.13.0)
- Le scadenze sono record `deadline` cifrati con la chiave delle carte (AES-256-GCM, stessa AAD delle altre voci). Titolo, data e categoria non sono mai in chiaro nel database.
- Nessuna nuova richiesta di rete e nessun nuovo host in CSP. Il punteggio di sicurezza è calcolato sul dispositivo; le password vengono lette solo con l’area protetta già aperta, e non lasciano mai la pagina.
- Le scadenze sono visibili senza lo sblocco forte (come le carte): non inserire in questo elenco dati che vuoi tenere solo nell’area protetta.

