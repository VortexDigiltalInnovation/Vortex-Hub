# Unica – stato dell'integrazione

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
