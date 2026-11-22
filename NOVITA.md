# Vortex Hub 2.25.2

## Miglioramento backup su cartella
- Messaggi più espliciti quando la cartella viene selezionata ma la prima scrittura fallisce, per evitare un attivazione apparentemente riuscita senza copia.
- Testo del fallback download chiarito: informa che il salvataggio alternativo è stato avviato e che va scelta la destinazione, senza dichiarare prematuramente una copia completata.
- Cache Service Worker aggiornata alla release 2.25.2.

## Verifiche
- Verifica sintattica del codice JavaScript inline tramite script di controllo incluso.
- Test su dispositivo Android fisico non eseguito.

## Note
Il fallback browser non garantisce che il file sia stato effettivamente salvato: l'utente deve completare il dialogo di salvataggio/download.
