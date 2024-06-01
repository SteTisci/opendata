# OpenData Visite Mensili

Questo progetto visualizza i dati mensili delle visite al sito OpenData del Comune di Milano. Utilizza JavaScript per effettuare richieste HTTP, formattare i dati ricevuti e mostrarli in una pagina web. Inoltre, crea un grafico interattivo utilizzando Chart.js per visualizzare l'andamento delle visite nel tempo.

## Struttura del Progetto

Il progetto è composto dai seguenti file principali:

- `index.html`: Il file HTML che struttura la pagina web.
- `style.css`: Il file CSS che definisce lo stile della pagina.
- `index.js`: Il file JavaScript che gestisce le richieste HTTP, l'elaborazione dei dati e la visualizzazione nella pagina web.

## Funzionalità

### index.html

Questo file contiene la struttura di base della pagina web. Include elementi per la selezione dell'anno e del mese, un pulsante per avviare la ricerca e una sezione per visualizzare i risultati. Include anche un elemento `canvas` per il grafico.

### style.css

Questo file definisce lo stile della pagina web, inclusi gli stili per la disposizione del contenuto, i colori e le interazioni con l'utente.

### index.js

Questo file contiene il codice JavaScript principale per l'applicazione. Le principali funzionalità sono:

1. **fetchData(url)**: Effettua una richiesta HTTP per ottenere i dati JSON dal sito OpenData.
2. **formatData(data)**: Formattra i dati ricevuti, trasformando gli oggetti per un uso più comodo.
3. **insertDataHTML(info)**: Inserisce i dati formattati nella pagina web, filtrando per anno e mese selezionati dall'utente.
4. **createChart(info)**: Crea un grafico interattivo utilizzando Chart.js, basato sui dati ricevuti.
5. **initialize()**: Funzione principale che inizializza l'applicazione, effettua la richiesta dei dati, formatta i dati e imposta gli event listener per le interazioni dell'utente.

## Dipendenze

Il progetto utilizza Chart.js per creare grafici interattivi. Il link alla CDN di Chart.js è incluso direttamente nel file HTML:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
