# Novità

## 2.16.0
**Scadenza su ogni elemento**
- Ogni **carta**, ogni elemento del **Vault** (password, passkey, note e soprattutto **file**) e ogni voce dei **Conti** (conti bancari, titoli, BTP, Poste, PAC, flussi) ha un blocco «Scadenza (facoltativa)»: data, «si ripete ogni anno» e «avvisami prima» (7–90 giorni). Per cancellarla basta svuotare la data.
- Gli obiettivi dei Conti usano già la loro data; le scadenze di BTP e Poste vengono prese in automatico.
- La scadenza resta dentro l’elemento: è cifrata con lui e viaggia nel backup e nella sincronizzazione.

**Agenda unica**
- «Agenda e sicurezza» mostra in un solo elenco ordinato le scadenze personali, delle carte (anche il mese di scadenza della carta), del Vault e dei Conti, con l’area di provenienza. Toccando una riga si apre l’elemento.
- Con l’area protetta bloccata vedi solo quelle delle carte e un avviso per sbloccare: Vault e Conti restano cifrati.
- Home, briefing e conteggio «scadenze vicine» usano lo stesso elenco.

**Assistente e IA**
- Assistente locale: «che scadenze ho?», «scadenze nel vault», «scadenze dei conti», «scadenze delle carte». Funziona sul dispositivo, senza rete.
- IA generativa: il pulsante «Scadenze» allega solo quelle personali e delle carte. Per i titoli delle scadenze di Vault e Conti c’è un pulsante separato, «Scad. Vault e Conti», che attivi tu messaggio per messaggio (vedi sempre il testo con «Vedi cosa invio»). Password, note, contenuti dei file e importi non vengono mai allegati.

## 2.16.1
**Avvisi di scadenza sul telefono**
- Impostazioni → Notifiche → «Scadenze e promemoria» → «Avvisami delle scadenze». Una notifica compare quando una scadenza entra nel suo anticipo, a 7 giorni e il giorno stesso (una sola volta per fase, senza ripetizioni). Toccandola si apre l’Agenda.
- Scatta quando apri o riapri l’app, dopo lo sblocco e dopo l’apertura dell’area protetta. Per un promemoria anche ad app chiusa c’è il promemoria push, ora anche **ogni giorno** (prima solo settimanale). Non serve aggiornare il Worker.
- Privacy: nelle notifiche compaiono i titoli di scadenze personali e carte; di Vault e Conti solo quante sono, senza titoli (il testo si vede a schermo bloccato).

**Meno doppioni**
- Home: backup, carte in scadenza e sincronizzazione compaiono una volta sola (prima fino a tre volte fra riquadro dell’assistente, avviso e «Promemoria»). Il riquadro «Promemoria» non mostra più «Tutto in ordine» quando non c’è nulla.
- Agenda: l’invito a sbloccare l’area protetta non è più ripetuto.
- Codice: tolte quattro definizioni doppie che non venivano più usate e le regole di stile ripetute.

## 2.15.0
**Assistente locale (nessuna rete, nessuna chiave)**
- Meteo: «che tempo fa?», «devo portare l’ombrello?», «cosa indosso?» con consigli. Se il meteo è spento, propone di attivarlo.
- «Cosa devo fare oggi?»: riepilogo unico con data, meteo, scadenze vicine, avvisi e punteggio di sicurezza.
- Scadenze: «che scadenze ho?». Per crearne una basta scrivere «aggiungi scadenza passaporto 15 marzo 2027», «ricordami la revisione tra 3 mesi» o «segna scadenza assicurazione 12/05/2027 ogni anno»: l’app prepara il modulo con titolo, data e categoria e tu controlli e salvi.
- «Punteggio sicurezza» e «accesso di emergenza» con i pulsanti per agire. Nuove domande rapide nell’assistente.

**IA generativa (con la tua chiave)**
- Nuovi pulsanti «Allega»: Briefing, Meteo, Scadenze, Sicurezza, Carte (solo nomi). Li attivi tu, messaggio per messaggio; «Vedi cosa invio» mostra il testo esatto, che compare per intero anche nella chat. Dopo l’invio gli allegati si azzerano. Vault, Conti e password non si possono allegare.
- L’IA conosce la data di oggi e sa di non vedere altro: usa i dati allegati senza inventare quelli che mancano.

**Correzioni**
- Pulsanti e righe nascosti (come «Interrompi» e le domande rapide in modalità IA) ora si nascondono davvero.
- L’avviso «Sblocca l’area protetta» ora dice cosa aggiunge (password e Conti negli avvisi).

## 2.14.0
- **Accesso di emergenza:** Impostazioni → Sicurezza e accesso → «Accesso di emergenza». Il codice di recupero viene diviso in parti (2 su 3, 2 su 4, 3 su 5 o 3 su 6) da affidare a persone di fiducia. Una parte da sola non rivela nulla; il numero richiesto di parti, insieme al file di backup `.enc`, apre tutti i dati.
- Ogni parte è un elenco di 27 parole con un controllo che segnala i refusi. Non viene salvata nell’app: si vede solo al momento della creazione.
- **Uso:** nelle finestre «Recupero con il codice» (schermata di blocco) e «Ripristino» (da backup) c’è il pulsante «Ho le parti di emergenza»: si incollano le parti e il codice si ricostruisce da solo.
- «Istruzioni per i fiduciari»: testo pronto da consegnare insieme alle parti.
- **Cambia le chiavi** invalida le parti già consegnate (il codice di recupero cambia): l’app te lo ricorda azzerando lo stato.
- Il punteggio di sicurezza include ora «Accesso di emergenza».
- Limite: non c’è un tempo di attesa né la possibilità di annullare, perché non c’è un server. Chi ha abbastanza parti e il backup può aprire tutto.

## 2.13.0
- **Agenda e sicurezza:** nuova schermata (Home → «Agenda e sicurezza») che riunisce scadenze personali, avvisi (carte in scadenza, backup, sincronizzazione, password) e un punteggio di sicurezza da 0 a 100.
- **Scadenze personali:** patente, passaporto, assicurazioni, bollo, garanzie, abbonamenti. Data, categoria, ripetizione annuale e preavviso a scelta (7–90 giorni). Sono cifrate con la chiave delle carte, quindi visibili senza sbloccare l’area protetta, viaggiano nel backup e nella sincronizzazione.
- **Punteggio di sicurezza:** controlla backup recente, blocco automatico, sblocco con impronta/Face ID, dispositivi non usati da oltre 90 giorni e, con l’area protetta aperta, password deboli, ripetute o ferme da oltre un anno. Ogni punto da migliorare ha il suo pulsante.
- **Home:** sotto l’assistente compaiono le scadenze vicine e il punteggio, con il pulsante per aprire l’agenda.
- Le notifiche push per le scadenze non sono ancora incluse.

## 2.12.0
- Nuovo logo (vortice blu e arancio con portafoglio, grafico e cassaforte) in schermata iniziale, blocco, icona dell'app, icone maskable, icona Apple e favicon. Nel logo dell'app il fondo è circolare e trasparente fuori dal cerchio.
- Colori dell'interfaccia uniformati al logo: blu e azzurro come tinta principale, arancio come accento (tema chiaro e scuro, cielo stellato, colline del tema giorno, pulsanti e icone delle sezioni). Resta solo l'effetto arcobaleno degli ologrammi delle carte.
- Intestazione della Home: il titolo non viene più troncato (su schermi stretti la versione si legge in Impostazioni → Info).
- Dopo l'aggiornamento, per vedere la nuova icona sulla schermata Home di Android può servire reinstallare l'app (fai prima un backup).

## 2.11.0
**Home: assistente**
- Nuova scheda sotto il riepilogo: ora grande aggiornata ogni 15 secondi, data estesa e un breve «briefing» con quello che conta adesso.
- Meteo (facoltativo): temperatura, condizioni, minima/massima, probabilità di pioggia e vento da Open-Meteo, con consigli («porta l’ombrello», «copriti bene», «bevi acqua») e il tempo di domani. Si attiva con un tocco sul riquadro meteo, dopo il tuo consenso. Aggiornamento ogni 30 minuti al massimo.
- Il briefing usa solo dati locali delle carte: carte in scadenza, promemoria backup, errori di sincronizzazione, carte per i negozi vicini, stato offline, batteria bassa. Nulla dell’area protetta (Vault e Conti) compare nella Home.
- Impostazioni → Aspetto → «Home e assistente»: nascondi l’assistente o spegni il meteo.

## 2.10.1
- Impostazioni più corte: all'apertura tutte le sezioni sono chiuse (prima «Sicurezza e accesso» occupava oltre 1200 px) e dentro ogni sezione le schede (Sicurezza, Dispositivi, Backup, Privacy…) sono righe a tendina con il solo titolo.
- Le sezioni e le schede aperte vengono ricordate; la ricerca apre da sola le schede che contengono il testo cercato.
- Nessuna modifica ai dati, alle chiavi o ai backup.

## 2.10.0
**Sicurezza**
- Blocco automatico configurabile: area protetta (1/5/15/30 min), intera app (5 min–1 ora) e, a scelta, blocco quando esci dall'app (30 s o 2 min). Impostazioni → Sicurezza e accesso.
- Promemoria backup più insistente: banner con pulsante «Backup ora» su Home e Carte, avviso una volta al giorno allo sblocco e conteggio delle modifiche non ancora salvate (da 15 in su).
- Elenco dei dispositivi (Impostazioni → Sicurezza e accesso → Dispositivi): nome, ultimo accesso e versione; puoi rinominare questo dispositivo. «Revoca» avvia il cambio delle chiavi, che esclude davvero il dispositivo.

**Uso quotidiano**
- Home: sezione «Carte rapide» subito sotto il riepilogo (vicine, preferite, usate di recente) per mostrare una carta in due tocchi.
- Nuova scorciatoia dell'icona «Ultima carta usata» (pressione lunga sull'icona dell'app, dopo aver reinstallato).
- Carte: campo facoltativo «Scadenza» (mese/anno); etichetta «Scaduta» o «Scade fra N g» sulle carte e nei Promemoria.
- Conti: categorie che imparano dalle tue spese (più di 2 voci simili già classificate), parole chiave ampliate, pulsante «Riclassifica» per le spese in «Varie / Altro» e grafico «Ultimi 6 mesi» con valori e mesi; toccando una barra apri quel mese.

## 2.9.1
- Rimossa la quadrettatura da tutti gli sfondi (tema chiaro e scuro).

## 2.9.0 – Vortex Hub
- L'app si chiama ora **Vortex Hub** (schermata iniziale, blocco, installazione, notifiche, manifest, privacy, guida).
- Il tuo emblema è il logo dell'app: schermata iniziale, schermata di blocco e icone di installazione (192, 512, maskable, Apple, favicon).
- Le icone sono incorporate anche nel service worker: se sul sito mancano i file in `icons/`, l'installazione resta possibile.
- Dati, backup e account esistenti restano compatibili: i nomi interni (database, chiavi locali) non sono cambiati e i vecchi file `Unica_backup_*.enc` vengono ancora riconosciuti.
- Nuovi file esportati: `VortexHub_backup_…`, `VortexHub_credenziale_…`, `VortexHub_carta_…`.
- Se avevi installato la vecchia app, rimuovila e reinstallala per vedere nome e icona nuovi.

## v2.8.0 — Impostazioni razionalizzate
- Le 16 schede di Impostazioni (prima una pagina lunghissima) sono ora **7 sezioni ripiegabili**, ciascuna con icona a colori e descrizione: Aspetto · Sicurezza e accesso (con lo sblocco biometrico) · Dati e backup (backup, copie automatiche, cartella, sincronizzazione) · Carte e Vault (importazioni, vicinanza ai negozi, CSV) · Notifiche (preferenze e push) · Assistente IA · App e informazioni (versione, installazione, privacy).
- **Ricerca** in cima: filtra e apre le sezioni che contengono il testo cercato (per esempio «biometr», «backup», «chiave»).
- L'app ricorda quali sezioni hai aperto; la prima volta è aperta solo «Sicurezza e accesso».
- Nessuna funzione tolta: tutte le azioni e i campi di prima sono ancora presenti, solo raggruppati.

## v2.7.1 — Tema chiaro: cielo, nuvole e colline (al posto delle bolle)
- Cielo azzurro-pesca con sole luminoso e fasci di luce che ondeggiano piano.
- Nuvole morbide su due piani (lontane e vicine) che scorrono con velocità diverse.
- Quattro strati di colline pastello (lavanda, menta, rosa, azzurro) con nebbiolina e parallasse col movimento del telefono o del mouse.
- Le bolle di vetro sono state rimosse; restano poche scintille dorate nei raggi. Con «riduci movimento» lo sfondo resta fermo.

## v2.7.0 — Barre superiori chiare, microfono grande, ricerca che riparte
- **Barre superiori**: ogni azione ha un'icona a colori dedicata con etichetta sotto: Cerca, Assistente (scintille), Blocca, Controllo (scudo), Genera (dado, al posto delle frecce circolari che si confondevano con «aggiorna»), Nuova, Vicino, Scansiona, Schede/Icone, Report.
- **Microfono della ricerca vocale** molto più grande (56 px, tondo, a gradiente), nella ricerca delle carte e in quella del Vault.
- **Nuova carta**: cambiando il nome la ricerca automatica di sito, colore e logo riparte da sola ogni volta, senza premere «Cerca». Il sito trovato dalla ricerca precedente viene sostituito; se lo scrivi tu a mano, resta quello.

## v2.6.0 — Biometria semplice, nuovi sfondi, loghi
- **Biometria semplice**: l'attivazione usa solo il sensore del telefono (impronta, volto o blocco schermo) con una credenziale non rilevabile, quindi niente passkey salvata su Google, niente chiavi di sicurezza, niente QR e niente altri dispositivi. Se il telefono la rifiuta compare un errore con il nome tecnico, ma non viene più proposta nessuna chiave esterna.
- **Tema scuro: cielo stellato**: cielo profondo con via lattea, nebulose, centinaia di stelle che brillano, cinque costellazioni ben visibili (Orione, Orsa Maggiore, Cassiopea, Cigno, Scorpione) che si disegnano all'apertura con piccoli impulsi di luce lungo le linee, stelle cadenti e parallasse col movimento del telefono o del mouse.
- **Tema chiaro: «alba di vetro»**: gradiente pesca-lilla-azzurro, sole con raggi che ruotano piano, nastri di aurora ondulati (menta, viola, rosa, cielo), bolle di vetro che salgono con riflessi e scintille dorate. Con «riduci movimento» lo sfondo resta fermo.
- **Loghi di carte e servizi**: Impostazioni → «Scarica i loghi mancanti» cerca il logo di ogni carta senza logo (dal sito indicato o dal catalogo delle catene italiane) e di ogni voce del Vault (dal sito o dal nome: Google, Netflix, banche, gestori ecc.). Dopo il consenso la ricerca riparte da sola, al massimo una volta al minuto. Solo il nome del sito viene richiesto a icon.horse, Google o DuckDuckGo; i loghi restano poi salvati cifrati sul dispositivo. Il logo non sostituisce mai una tua foto.
- Vetro sfocato dietro riquadri e righe per mantenere leggibile il testo sopra gli sfondi.

## v2.5.1 — Biometria: «unknown error occurred while talking to the credential manager»
- Il gestore credenziali di Android rifiutava la richiesta di passkey. Ora Unica prova in sequenza richieste via via più semplici (con e senza suggerimenti, estensione PRF, vincolo sul sensore del dispositivo) e si ferma solo se annulli tu. Lo stesso vale per lo sblocco.
- Se l'errore persiste, il messaggio mostra anche il nome tecnico (es. «NotSupportedError – …») per capire la causa.
- Se continua a fallire: verifica che il telefono abbia un blocco schermo con impronta/volto, che Chrome sia aggiornato e che in Impostazioni di Android → Google → Gestore password/Passkey il servizio sia attivo.

## v2.5.0 — Zero iniziale, biometria in un tocco, password che non si azzera
- **Zero iniziale delle carte**: la scansione ora completa a 13 cifre gli EAN-13 (e a 8 gli EAN-8) che alcuni lettori consegnano senza lo zero davanti, e il salvataggio completa un EAN-13 scritto con 12 cifre. Se una carta già salvata ha ancora lo zero mancante, aprila con Modifica e correggi il codice.
- **Biometria senza elementi esterni**: la passkey ora usa solo il sensore del dispositivo (impronta, volto o blocco schermo), senza proporre chiavi di sicurezza, QR o altri telefoni.
- **Attivazione in un tocco**: nella Home compare «Entra con impronta o Face ID → Attiva ora». Una sola verifica, senza finestre di conferma né seconda richiesta della password; anche Impostazioni usa lo stesso percorso. Dove il telefono non supporta la modalità più sicura, la biometria vale anche per Vault e Conti con la scadenza di sempre (14 giorni o 25 sblocchi, poi master password).
- **Password che si azzerava**: la schermata di blocco non si ricarica più da sola mentre scrivi (succedeva quando era pronta una nuova versione dell'app), e la richiesta automatica dell'impronta non parte se hai già cominciato a digitare.

## v2.4.0 — Effetto wow: carte olografiche 3D e Home viva
- **Carta fisica 3D**: aprendo una carta compare una vera «tessera» (colore, logo, nome) che si inclina seguendo il telefono (giroscopio) o il puntatore e, dopo un istante, **gira con una molla** mostrando il codice sul retro bianco, pronto per la cassa. Un tocco (o Invio/Spazio) la rigira. Con «riduci movimento» attivo il codice compare subito, senza animazioni.
- **Ologramma**: su ogni carta della lista e sulla tessera un riflesso iridescente cambia con l'inclinazione. Su iPhone il permesso al movimento viene chiesto al primo tocco.
- **Home viva**: saluto per fascia oraria, contatori animati (carte, preferite, utilizzi) e anello animato della quota di preferite.
- Tutto locale, senza librerie né rete; i dati mostrati sono solo quelli delle carte.

## v2.3.0 — Ricerca vocale libera, icone sui pulsanti, installazione
- **Ricerca vocale libera**: il microfono usa direttamente il riconoscimento del browser, senza il blocco «solo offline» e senza la finestra di conferma. Se il riconoscimento non è disponibile compare solo un messaggio chiaro (microfono negato, nessun audio, rete assente). Su Chrome l'audio può essere elaborato dal servizio del browser (vedi SICUREZZA.md).
- **Icone di qualità su tutti i pulsanti**: set coerente di icone a tratto (SVG inline, nessuna dipendenza) applicato in modo automatico a ogni pulsante testuale, anche nelle schermate future: salva, annulla, elimina, importa/ripristina, chiavi e password, notifiche, sincronizzazione, diagnostica, cartelle, categorie, condivisione ecc. Colore coerente con il tema, versione piccola nei pulsanti compatti.
- **Installazione**: la diagnostica indicava `icons/icon-192x192.png`, `icon-512x512.png` e `apple-touch-icon.png` mancanti sul tuo hosting, causa per cui Chrome non offre «Installa». Il service worker ora fornisce da solo queste icone se mancano (copia di riserva, non testata sul tuo Chrome), ma il modo corretto resta caricare l'intera cartella `icons/` (vedi INSTALLAZIONE.md).

## v2.2.1 — Ricerca e avvisi automatici
- Ricerca automatica di sito e logo abilitata per impostazione iniziale, con interruttore nelle Impostazioni; parte dopo aver inserito il nome del negozio.
- Ricerca negozi vicini e avvisi di prossimità attivi per impostazione iniziale dopo lo sblocco. Il browser deve autorizzare la posizione; le notifiche di sistema richiedono il relativo permesso.
- «Trova il negozio più vicino» ora tollera nomi con accenti e varianti di insegna, cerca anche il gestore e usa una posizione più precisa; errori e negozi non trovati sono distinti.
- Se manca il riconoscimento offline in italiano, la ricerca vocale propone il riconoscimento online solo dopo aver spiegato che il browser potrebbe inviare l’audio.
- Icone esplicative aggiunte alle azioni di installazione, posizione, ricerca e avvisi. La PWA non si installa senza conferma: serve HTTPS e l’approvazione nel browser.

## Vault (v0.9.0): funzioni portate dall'app originale
- Viste **Schede / Tabella / Icone** (ricordata), filtro per **categoria e proprietario**, gestione di categorie e proprietari (aggiungi, rinomina, elimina con spostamento delle voci).
- **Aspetto personalizzato** per ogni voce: colore, icona o foto (ridimensionata e cifrata con la voce).
- **Selezione multipla**: sposta di categoria, assegna a un proprietario, elimina.
- **Condividi una credenziale**: scegli i campi, invio della password in un secondo messaggio, WhatsApp/Telegram/SMS/Email/altre app, oppure **file cifrato con codice monouso** (importabile anche dal Vault originale).
- **Ricerca vocale** e **stato della voce** (password debole/ripetuta/vecchia).

## Già integrato (v0.8.0)
- **Home con promemoria** che unisce le tre aree: backup, sincronizzazione, password deboli/ripetute/vecchie, scadenze BTP e Poste (60 giorni), budget superati.
- **Cerca ovunque** (Ctrl/Cmd+K o lente in Home): carte, Vault, conti, titoli, BTP, Poste, spese e azioni. Le password non compaiono mai.
- **Assistente unico** (testo, dettatura, lettura a voce): carte, Vault, conti, backup, scadenze, ripartizione di un investimento.
- **Collegamenti**: carta con sito → credenziali nel Vault; credenziale ↔ carta con lo stesso sito; conto bancario ↔ credenziali del Vault.
- **Backup interni** automatici con rotazione, copie con nome e copia di sicurezza prima di ogni ripristino; promemoria backup e vibrazione configurabili.
- **Quote JSON** per aggiornare i prezzi di titoli e BTP (come in Financial Dashboard).

## v1.8.0: geofencing, icone, notifiche, biometria
- **Geofencing rifatto** come in Fidelity Wallet: GPS continuo ad alta precisione, geometria degli edifici da OpenStreetMap (avviso quando sei dentro o a 20/30/50/100 m), controllo dell'accuratezza, pausa di 20 minuti, stato in tempo reale nella schermata Carte, schermo acceso opzionale, posizione del negozio salvabile nella carta («Posizione attuale» / «Trova il negozio più vicino»). Cache dei negozi cifrata.
- **Vista a icone** per le carte fedeltà (pulsante nell'intestazione, scelta ricordata), con logo/iniziale, stella dei preferiti e punto luminoso per «qui vicino».
- **Notifiche** consegnate dal service worker (funzionano su Android, dove `new Notification` non va), tocco sulla notifica apre la carta, prova della notifica, nome negozio facoltativo.
- **Notifiche push** programmate dal tuo Worker (promemoria settimanale senza contenuto, chiavi VAPID, trigger orario, `gen-vapid.mjs`).
- **Sblocco biometrico** anche per Vault e Conti sui dispositivi senza PRF (con scadenza di sicurezza), richiesta automatica dell'impronta all'apertura, scheda dedicata in Impostazioni.

## v1.7.0: autoinstallante
- Proposta di installazione automatica dopo lo sblocco: banner «Installa Unica» (Android/desktop: un tocco; iPhone: istruzioni Condividi → Aggiungi alla Home). «Più tardi» la ripropone dopo 7 giorni, ✕ non la mostra più.
- Autosufficiente: se manifest.webmanifest o le icone mancano (per esempio copiando solo index.html), l'app genera da sola manifest e icone; funziona anche da una cartella con il solo index.html servito via https.
- Aggiornamento automatico: controlla nuove versioni ogni ora e al ritorno nell'app, e le applica da sola al primo blocco.
- Chiede al browser la memoria persistente per proteggere i dati cifrati dalla pulizia automatica.

## v1.6.0: IA generativa integrata
- Nell'Assistente, interruttore «Locale / IA generativa». L'IA risponde in streaming (Claude o OpenAI) con la tua chiave API, impostabile in Impostazioni → IA generativa (verifica della chiave al salvataggio, rimozione, modello modificabile).
- Privacy: parte solo ciò che scrivi nella chat IA; mai carte, Vault, conti o password. Avviso se il messaggio contiene IBAN, numeri di carta o password. Cronologia solo in memoria, azzerata al blocco. Pulsante «Interrompi», risposta in formato leggibile (grassetto, elenchi, codice) con testo sempre ripulito.
- Nessuna libreria esterna: tutto il codice è nel file unico (nessun CDN), quindi nessun codice di terzi da fidarsi.

## v1.5.0: allineamento a Fidelity Wallet 13.7
- Database di 19 insegne italiane: scrivendo il nome (o dal prefisso del codice) compaiono sito e colore; per le altre, sito da Wikidata preferendo il .it; logo salvato nella carta (consenso al primo uso).
- Link di condivisione `?card=` di Fidelity Wallet accettati; import dei backup `{cards:[…]}` e delle carte con campo `fav`; codici lunghi che vanno a capo nella carta aperta.
- Già presenti: Modifica/Elimina nella carta aperta, ordinamento, controlli EAN-13 e duplicati, limite backup Drive, geofencing opzionale, assistente vocale.
- Non portato: OCR da foto (Tesseract da CDN).

## v1.4.0: ultime funzioni portate dalle app originali
- Assistente: analisi sicurezza con punteggio di salute, password riutilizzate/deboli/corte/vecchie, controllo violazioni (HIBP), statistiche del Vault, consigli, generatore, ricerca «cerca …», aiuto «cosa posso dire?» e domande rapide.
- Vault: importazione CSV (Chrome, Edge, Firefox, Bitwarden…) con rilevamento dei duplicati, esportazione CSV in chiaro con conferma.
- Installazione dell'app (Android/desktop e istruzioni iOS), «Aggiornamento e diagnostica» (versione, service worker, cerca aggiornamenti, verifica file, ripara e ricarica), Guida all'uso integrata.
- Notifiche generiche quando un avviso di prezzo viene raggiunto; avviso automatico facoltativo «sei vicino a un negozio» con la tua carta (da Fidelity Wallet).
- Pulsante «torna in cima», ricordo dell'ultima scheda dei Conti, «Ripristina le impostazioni standard».

## v1.3.0: effetti avanzati
- Costellazione di particelle animata sullo sfondo che reagisce al puntatore (si ferma con «riduci movimento», contrasto elevato o scheda in background).
- Riflesso luminoso che segue il dito/mouse su tessere, schede e pulsanti; carte fedeltà 3D inclinabili; anelli orbitali nelle schermate di accesso; testi e grafici con bagliore neon.

## v1.2.0: nuova grafica «Aurora»
- Interfaccia a vetro (glassmorphism) con aurora animata e griglia luminosa, accenti neon ciano/viola/rosa, logo con anello rotante, pulsanti a gradiente, carte 3D con riflesso, barra di navigazione flottante, fogli a comparsa sfocati, barre di avanzamento luminose, linea dello scanner animata.
- Nuove icone dell'app. Tema Auto/Chiaro/Scuro invariato.
- Rispetta «riduci movimento» e «contrasto elevato» (animazioni e sfocature disattivate).

## v1.1.0: rotazione delle chiavi
- «Cambia le chiavi di cifratura» (Impostazioni → Sicurezza): chiavi nuove, ricifratura atomica di carte, Vault, allegati e conti, nuovo codice di recupero, nuovo spazio di sincronizzazione. Prima viene creata una copia interna con le chiavi precedenti.

## v1.0.0: ultime funzioni portate
- **Drive con rotazione ed etichette**: ogni salvataggio è un file datato; si conservano le ultime N copie senza nome (3/5/10/20), quelle con nome restano sempre; elenco, ripristino, nome ed eliminazione dall'app.
- **Backup automatico su cartella** del dispositivo (browser desktop Chromium): una copia cifrata al giorno se qualcosa è cambiato, con rotazione; tocca solo i file `Unica_backup_*.enc`.
- **Schede comprimibili e «Vai a»** nelle sezioni Conti (lo stato aperto/chiuso viene ricordato).

## Non portato (di proposito)
- Import da Excel: l'app originale Financial Dashboard sapeva solo *esportare* l'Excel, non importarlo; l'export c'è anche in Unica.
- Funzioni che dipendono da librerie esterne (CDN): Unica non ne carica nessuna.

## v1.9.0 — Ricerca vocale nelle carte
- Pulsante microfono nella ricerca delle Carte: parla e la lista si filtra; mostra la trascrizione in tempo reale e il numero di carte trovate.
- Comandi vocali: «apri Esselunga», «cerca Coop», «mostra tutte», «preferite», «vicino a me», «vista icone / schede», «ordina per più usate / A–Z», «nuova carta», «scansiona».
- Ricerca più tollerante (anche digitando): errori di ortografia e di pronuncia («esselonga», «decatlon», «cop»), nomi parziali, dominio del sito, codice; risultati ordinati per pertinenza.
- Per aprire una carta a voce serve una corrispondenza chiara; se ambigua resta la ricerca filtrata. Con "lettura vocale" attiva, la conferma viene letta.
- Messaggi chiari per microfono negato, nessun audio, rete assente.

## v1.9.1 — Installazione e versione
- La versione (es. v1.9.1) compare accanto al logo/nome nelle schermate di benvenuto, sblocco e Home.
- «Impostazioni → Installazione» ora spiega il motivo esatto se il browser non permette l'installazione (file://, senza https, file mancanti accanto a index.html, browser interno di un'altra app, Safari su iPhone, Firefox desktop…).
- Manifest più completo (id, display_override, categorie); errori del service worker rilevati e mostrati.
- Importante: per installare servono TUTTI i file dello zip sullo stesso hosting https (index.html, sw.js, manifest.webmanifest, cartella icons).

## v2.0.0 — Rifinitura grafica
- Marchio gradiente nell'intestazione, barra di ricerca con microfono integrato, menu a tendina e checkbox coerenti con il tema.
- Schede carta con lucentezza e profondità, stato vuoto illustrato, transizione morbida tra le pagine, focus da tastiera ben visibile, supporto contrasto elevato e riduzione animazioni.
- Notifiche brevi sopra la barra di navigazione (non la coprono più); pulsanti del Vault più compatti.
- Funzioni delle app originali: tutte già presenti. Unica eccezione: OCR da foto (richiede la libreria Tesseract da internet; non incluso per mantenere l'app senza dipendenze esterne).

## v2.1.0 — 2FA, estratti conto, carte cifrate
- **Codici 2FA (TOTP) nel Vault**: nelle voci di accesso c'è il campo «Codice 2FA»: incolla la chiave del sito o il link otpauth://, oppure scansiona il QR. Nel dettaglio compare il codice a 6 cifre con conto alla rovescia e copia. Supporta SHA-1/256/512, 6–8 cifre, periodo personalizzato; verificato sui vettori ufficiali RFC 6238. La chiave è cifrata come la password e finisce nei backup/sincronizzazione.
- **Import estratti conto CSV intelligente** (Conti → Spese): riconosce da solo separatore, codifica (UTF-8/Windows), righe di intestazione, colonne data/descrizione/importo oppure dare/avere; puoi correggere le colonne e invertire il segno. Anteprima con totali, rilevamento dei movimenti già presenti (nessun doppione se reimporti lo stesso file), categorizzazione automatica, «Annulla import».
- **Condivisione carta con file cifrato e codice monouso** (Carte → carta → Condividi): file `.json` cifrato (AES-256-GCM) + codice tipo ABCD-EFGH-JKLM da comunicare a parte. Il file vale 48 ore e, una volta usato, non si riapre su quel dispositivo. Chi riceve: Impostazioni → Carte → «Importa una carta cifrata ricevuta» (o il pulsante in fondo alla lista Carte).

## v2.2.0 — Allegati, obiettivi, ricorrenze, OCR, IA del browser
- **Allegati cifrati** su accessi, note e passkey: documenti e foto (anche dalla fotocamera), anteprima immagini, download, eliminazione; si cancellano insieme alla voce e viaggiano nei backup/sincronizzazione.
- **Passkey (promemoria)**: nuova voce «Passkey» per annotare dove si trova (iCloud, Google, Windows Hello, chiave di sicurezza…) e su quale dispositivo. Una passkey vera non può essere salvata né usata da Unica.
- **Scorciatoie dell'icona** (pressione lunga, Android/Chrome e Windows): Carte preferite, Scansiona carta, Nuova carta, Vault, Conti. Aprono l'app dopo lo sblocco. Non è possibile una scorciatoia per ogni singola carta (il manifest è fisso).
- **Obiettivi di risparmio** (Conti → Obiettivi): progresso, versamenti, previsione della data di raggiungimento e importo mensile necessario per la scadenza.
- **Ricorrenze e abbonamenti** (Conti → Ricorrenze): rilevati da soli dalle spese (settimanali, mensili, trimestrali, annuali); totale mensile/annuale; prossimo addebito; promemoria in Home e notifica 3 giorni prima; «Ignora».
- **Confronti** (Conti → Confronti): mese contro mese per categoria, ultimi 6 mesi a barre impilate, flusso delle spese dal totale alle categorie.
- **OCR da foto** (nel modulo carta): legge nome e codice da una foto. Il motore Tesseract si scarica da cdn.jsdelivr.net solo dopo il tuo consenso ed è eseguito in una finestra isolata che non vede i dati di Unica. Va caricato anche `ocr.html` e `ocr-frame.js`.
- **IA del browser** (Assistente → IA generativa → «Usa l’IA del browser»): usa il modello integrato (Prompt API/Gemini Nano) dove il browser lo offre; nessuna chiave né server.
