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
