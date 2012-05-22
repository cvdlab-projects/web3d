Package
=======
Per aumentare la legibilità, l'espandibilità e la manutenibilità del codice è stata rispettata una rigida strutturazione del package basata sul pattern MVC.

Di seguito è riportata uno schema dell'organizzazione:

      |-css    /* contiene tutti i fogli di stile*/
      |   |-reset.css
      |   |-style.css
      |-dicom    /* Non è necessario che risieda internamente al package */
      |   |-dicom2
      |   |-dicom_png.php
      |-docs    /* Contiene tutta la documentazione */
      |-js    /* Contiene tutto il sorgente javascript */
      |   |-lib    /* Contiene le librerie utilizzate nel progetto */
      |   |   |-jquery
      |   |   |-jscolor
      |   |   |-map
      |   |   |-json
      |   |   |-three
      |   |-model    /* Contiene il modello */
      |   |   |-object
      |   |       |-Point.js
      |   |       |-Slice.js
      |   |       |-jsonWrap.js
      |   |-plugins    /* Contiene le implementazioni dei plug-in*/
      |   |   |-aplugin
      |   |       |-aplugin.js
      |   |-view    /* Contiene utilità per la gestione della vista */
      |   |   |-userui.js
      |   |-main.js    /* File di inizializzazione del progetto */
      |   |-web3d.js    /* Controller/gestore degli eventi del progetto */
      |-index.htm    /* Un esempio funzionante del nostro progetto all'opera */

##Librerie
Nella cartella `lib` sono presenti tutte le librerie utilizzate. Ogni libreria deve essere contenuta in una sua cartella nella quale verranno inseriti tutti i file a essa necessari.

Le librerie attualmente utilizzate sono:
* `jQuery` - per la manipolazione del DOM e la gestione degli eventi;
* `HashMap` - una semplice implementazione personale delle HashMap in javascript;
* `jscolor` - semplice libreria per la realizzazione di color picker;
* `json` - si occupa della conversione da oggetto javascript a formato json e viceversa;
* `Three` - per la realizzazione del modello 3d.

##Modello
Nella cartella `model` sono presenti tutte le classi che rappresentano gli oggetti del modello dell'intero progetto.

L'approccio di avere un modello completamente separato dalla vista, oltre che rispettare tutte le qualità note del pattern MVC, ci hanno permesso la realizzazione di metodi molto ottimizzati e flessibili.

Nello specifico è possibile effettuare considerevoli variazioni sugli oggetti del modello senza che queste si ripercuotano né sulla canvas né sugli elementi dell'html.

Alcuni oggetti, inoltre, possono implementare cache e recupero lazy di informazioni.


####Di seguito vengono mostrati gli oggetti presenti attualmente nel modello e le loro caratteristiche, verrà tralasciata la descrizione dei metodi getter e setter:
#####Point
E' la classe che descrive l'oggetto punto, l'unità informativa più piccola per le varie rappresentazioni.

Per istanziare un nuovo oggetto punto è sufficiente `new Point(x,y,z)` dove x, y e z sono le sue coordinate.

Poichè il nostro ambiente lavora una slice a volta, la z dovrà corrispondere al numero della slice corrente `cur_z`.

#####Slice
Rappresenta le varie slice della DICOM all'interno del nostro progetto.

In fase di inizializzazione dell'ide verranno individuati, ad opera del metodo `loadGeneralConf()`, tutte le singole slice del file DICOM prescelto e per ognuna di esse verrà istanziato e popolato un oggetto Slice.

Poichè l'immagine di una slice del DICOM può essere pesante, non è possibile:
* caricare realmente tutte le immagini di un DICOM, il quale può arrivare tranquillamente a superare 300 slice;
* caricare la singola slice ad ogni volta che risulta necessario un ridisegno della canvas.

Per risolvere queste due problematiche, l'oggetto Slice implementa un recupero lazy con cache dello stream dell'immagine.

Alla prima reale necessità del contenuto dell'immagine, questa verrà realmente caricata e il suo stream messo in cache per essere recuperato istantaneamente alle richieste successive.

Questo approccio, unito al ridisegno selettivo hanno garantito, rispetto alla prima release, una diminuzione del 70% delle risorse impegnate. Questo dato risulta tangibile all'utente il quale non avverte più i redraw della canvas che rimane pertanto stabile e senza sfarfallii.

#####jsonWrap
Questo oggetto si occupa di salvare temporaneamente ed elaborare l'input proveniente dal json editor. A partire da tale input riesce ad aggiungere figure alla sessione di lavoro corrente.

##Vista
Nella cartella `view` è presente la classe `userui.js` la quale si occupa di offrire una serie di metodi per la manipolazione della canvas e degli oggetti su di essa raffigurati.

Uno degli obiettivi fondamentali di questo progetto, come in precedenza dichiarato, è quello di offrire un ambiente di lavoro intuitivo e flessibile.

Nello specifico la canvas è stata pensata come uno spazio di lavoro infinito, sul quale è possibile fare zoom e drag a piacimento per potersi posizionare su una porzione di lavoro specifica dalla dimensione compatibile con la finestra del browser.


####Fra le funzioni di userui.js abbiamo:

#####Zoom
Lo zoom viene effettuato allo scroll del mouse su tutta la canvas e sugli oggetti su di essa presenti.

Con il puntatore è possibile selezionare il punto sul quale effettuare lo zoom in modo che l'accesso
ad una porzione della canvas sia immediato senza la necessità di continui drag.

Si è prestata particolare cura nel garantire che gli oggetti rappresentati sulla canvas e il dicom di sfondo
fossero caratterizzati da un livello di zoom coerente, preservando le proporzioni e gli allineamenti reciproci.

Inoltre, caratteristica importante di questo metodo è l'invariabilità, a seguito di un'operazione di zoom,
dello spessore delle linee disegnate dai plugin: infatti, dal momento che le linee sono rappresentate sulla canvas,
sarebbero soggette anch'esse alla variazione di dimensioni, rendendo l'interazione meno efficace.


#####Modifica dei punti
Questa operazione è stata effettuate senza l'impiego di elementi HTML.
In un approccio iniziale, si era ipotizzato di associare ad ogni punto di ogni figura rappresentata un elemento div,
con l'obiettivo di aggiornare il disegno sulla canvas a seguito di una variazione della posizione di un elemento div.

Tale operazione avrebbe tuttavia richiesto un notevole impiego di risorse, a causa della possibilità
che nella canvas vi sia un elevato numero di punti.

Inoltre tale approccio risulta abbastanza instabile soprattutto quando si sta lavorando con una
canvas ipoteticamente illimitata, avremmo dovuto gestire i seguenti casi:

1. i div sono attualmente fuori dalla canvas;

2. i div rientrano nella canvas a seguito di un drag.

Poichè tutte le figure sulla canvas sono solo la rappresentazione del modello sottostante, per la
selezione di un punto, si è proceduto con un metodo alternativo. Si considera come punto selezionato
quello la cui posizione, secondo il modello, è in un intorno sufficientemente piccolo all'area dello schermo
cliccata dall'utente. Una volta individuato il punto, si ricerca il plugin corrispondente e viene eseguita
l'operazione richiesta: spostamento, cancellazione o cambio plug-in.


#####Drag della canvas
Con l'operazione di drag è possibile spostarsi all'interno dell'area di lavoro, per evitare involontari
spostamenti della stessa in fase di disegno, abbiamo inserito un comando apposito nell'area degli strumenti.

Per le proprietà della canvas sopra enunciate, risulta necessario il metodo `transformedPoint` che
mantiene l'allineamento tra le coordinate del mouse e l'area di lavoro selezionata al momento sulla canvas:
la posizione del cursorse sull'intera canvas viene calcolata come la posizione del cursore sulla porzione di
canvas più l'offset di spostamento della stessa rispetto alla canvas completa.


#####Contrasto con soglia e luminosità
La modifica del contrasto dell'immagine DICOM di sfondo può essere effettuata manualmente dall'utente.

Può, inoltre, essere impostata una soglia che farà da filtro per il contrasto: agendo sulla soglia e
poi sul contrasto si possono schiarire i toni chiari e scurire i toni scuri. La soglia nello specifico
identifica la sensibilità di selezione dei toni.

Il valore di default, 50, è un ottimo compromesso per una immagine DICOM.

E' possibile inoltre modificare il la luminosità dell'immagine.

Questi sono strumenti molto importanti in quanto nelle immagini biomediche di differenti sezioni anatomiche
anche vicine possono presentare escursioni di contrasto molto elevate, con una grande significatività
diagnostica; quindi, la gestione dei livelli di grigio è fondamentale per un corretto esame visivo dell'immagine
anche al solo fine di volerne ricreare un modello 3d.

####Alcuni dei metodi più importanti di userui.js vengono descritti di seguito:

#####DrawAll()
Il metodo più importante della classe userui.js è `drawAll()` che si occupa di rappresentare tutto il modello sulla canvas.

In realtà tale metodo è un manager di metodi di rappresentazione specifici di ogni plug-in, il suo obiettivo
è quello di selezionare e coordinare cosa deve essere rappresentato sulla canvas; il disegno vero e proprio
viene delegato al singolo plug-in.

Questo approccio è necessario in quanto ogni plug-in ha una sua personale rappresentazione e risposta agli eventi dell'utente.

`drawAll()` può essere invocato da:

1. un medoto di userui.js che si rende conto di una variazione dell'area di lavoro;

2. un metodo di web3d.js che si rende conto una variazione sul modello;

3. un metodo di un plug-in che ritiene opportuno effettuare un ridisegno completo, magari perchè il disegno selettivo non risulta possibile.

Per il metodo `draw()` specifico di ogni plug-in si rimanda alla sezione apposita.

#####clearCanvas()
Questa funzione riporta la canvas alle condizioni iniziali.

#####selectPoint(x,y)
Questa funzione implementa il sistema di selezione di punti basato sul modello senza elementi HTML come descritto in precedenza.

#####brightness(val) e contrast(val)
Queste funzioni gestiscono la luminosità ed il contrasto.

#####applNext()
Applica i disegni presenti sulla slice corrente alla slice successiva.

##Controller
Il controller è composto dai file `main.js` e `web3d.js`.

In main.js è possibile settare i parametri di default e i plugin da istanziare durante la fase di inizializzazione dell'ide.

Il file web3d.js invece gestisce l'interazione con l'utente effettuando le relative modifiche sugli oggetti del modello. Oltre che sul modello può intervenire sulla vista, implementando di fatto il livello di controllo.

####Vengono riportate di seguito le descrizioni di alcuni metodi di web3d.js:

#####getWeb3d()
Questa funzione è la prima ad essere invocata, svolge le seguenti importanti operazioni:

1. individua l'elemento html, avente id `web3d-ide`, nel quale si vuole inserire l'ide;

2. inizializza le variabili globali a cui gli altri oggetti faranno riferimento, tra queste le più importanti sono: `canvas`, `ctx` e `form`;

3. avvia la creazione della tavolozza degli strumenti a destra;

4. avvia la funzione `loadGeneralConf()` per il caricamento dei parametri di configurazione;

5. setta la slice corrente;

6. avvia il gestore degli eventi `eventsManager()`

#####setBackground(i)
Il metodo setBackground consente di impostare come corrente la slice i-esima, richiesta dall'utente tramite l'apposito strumento.

#####getParameterByName(name)
Questo metodo è di supporto alla lettura dei parametri passati nell'url.

#####eventsManager()
intercetta tutti gli eventi di interazione dell'utente effettuando un dispatch alle varie funzioni di gestione.







