# Vortex Hub 2.25.16

- Poste (buoni postali e conti deposito): tasso annuo lordo anno per anno fino alla scadenza. Le righe "Anno 1, Anno 2…" si generano da data di inizio e scadenza; se lasciate vuote vale il tasso base.
- Poste: il campo "Importo a fine scadenza" si calcola in automatico al netto (12,5% sugli interessi dei buoni, 26% sul conto deposito). Si può correggere a mano; il pulsante Auto ripristina il calcolo. Scelta tra interessi composti e semplici (automatico: composti per i buoni, semplici per il deposito).
- Poste: nella scheda, ogni sezione mostra il netto a scadenza e il totale riporta interessi netti a scadenza; controllo che la scadenza sia dopo l'inizio.
- BTP: calcolo automatico dell'incasso netto a scadenza (cedole residue nette al 12,5% + rimborso al netto dell'imposta sulla plusvalenza), con cedola per anno solare per i BTP step-up. Mostrato nella riga e nel riepilogo.
- Il calendario delle cedole nette usa la cedola dell'anno corrente se indicata.
- Aggiornamento cache e CSP.

## 2.25.15
- Poste: i conti deposito sono separati da buoni e libretti postali, che restano insieme.
- La scheda Poste mostra due sezioni con subtotale; la Panoramica (Composizione), il report, l'export Excel e l'assistente usano le due voci distinte.
- Poste: nuovo campo "Importo a fine scadenza" dopo Scadenza / svincolo, per buoni postali e conti deposito. Se compilato sostituisce il netto stimato nella riga e nelle scadenze in agenda; i libretti lo ignorano.
- Aggiornamento cache e CSP.

## 2.25.15
Separazione conti deposito / buoni e libretti postali.

## Precedente: 2.25.14

- Centro di controllo: controllo non distruttivo per individuare possibili scadenze duplicate (titolo normalizzato).
- Segnalazione prudenziale: mostra i titoli ripetuti e il numero di occorrenze, senza intervenire sui dati.
- Aggiornamento cache e CSP.

## 2.25.14
Verifica assistita di possibili duplicati nell'elenco delle scadenze.
