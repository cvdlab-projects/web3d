Introduzione
============
Web 3D Object Definition è un progetto realizzato per il corso di Informatica Biomedica tenuto dal Professor Alberto Paoluzzi, dal Professor Mauro Ceccanti, dall'Ing. Enrico Marino e dall'Ing. Federico Spini nell'A.A. 2011-2012 presso l'Università degli Studi Roma Tre - Dipartimento Informatica e Automazione.

<h3 id="11">Obiettivi</h3>
________________________
L'obiettivo generale di questo progetto è la realizzazione di un ambiente/servizio completamente usufruibile da browser, quindi senza alcun tipo di installazione, per la realizzazione di modelli 2D e 3D a partire da immagini medicali DICOM.

Gli obiettivi specifici di questo progetto sono quelli di permettere:
* la selezione in modo semplice di punti nello spazio di lavoro;
* l'utilizzo di più strumenti di disegno;
* l'installazione in modo semplice di nuovi strumenti di lavoro grazie ad una struttura a plug-in;
* la visualizzazione e manipolazione di DICOM multi slice con gestione del contrasto con soglia, luminosità, zoom e drag;
* l'utilizzo di funzionalità e interfacce fornite dai plug-in a tempo di esecuzione che reagiscono agli eventi dell'utente in modo personalizzato;
* la selezione dei colori tramite color picker;
* la manipolazione delle figure già inserite tramite eliminazione di punti e drag;
* la massima ottimizzazione del consumo delle risorse affinché l'utilizzo dell'ambiente sia il più fluido possibile;
* la realizzazione automatica di strutture 3D a partire dai punti raccolti;
* il salvataggio della sessione di lavoro in formato Json;
* il secupero della sessione di lavoro dal formato Json, con la possibilità di aggiungere modelli alla sessione corrente;

Inoltre, a supporto di questo progetto, è stato realizzato un un servizio di conversione di immagini DICOM in formato immagine comune;

<h3 id="12">Installazione</h3>
_____________________________
Con installazione si intende l'avvio del progetto come servizio, sia in locale che remoto.
Per quanto concerne il semplice utilizzo invece, non essendo necessaria l'installazione, si potrà passare direttamente all'argomento successivo.

**Per installare il servizio**

* Scaricare l'intero progetto e caricarlo su un web server.
* Assicurarsi che `url_dicom` dentro il file `js/main.js` punti all'effettivo servizio di conversione per file DICOM
        ATTENZIONE: su alcuni browser (es. Chrome) viene effettuato un controllo same-origin che in alcuni casi può bloccare, per motivi di sicurezza, il richiamo del metodo getImageData utilizzato per le sole funzioni di constrasto e luminosità. Per evitare tale controllo installare il servizio di conversione immagine e l'ambiente sullo stesso dominio.


**Installazione servizio di conversione immagini DICOM**

* Assicurarsi che il web server supporti php5 (comunque l'eventuale implementazione in altro linguaggio risulta estremamente banale).
* Scaricare sul server, in una locazione a piacere, lo strumento `dicom2` dal sito [http://www.barre.nom.fr/medical/dicom2/](http://www.barre.nom.fr/medical/dicom2/,"dicom2") disponibile sia per windows che per linux, configurando in modo adeguato i pemessi.
* Editare il file `dicom_png.php` ed impostare la posizione di dicom2, di default impostato alla stessa cartella in cui si trova lo script.
* Editare il file `dicom_png.php` ed impostare la posizione della collezione di file DICOM, di default impostato alla stessa cartella in cui si trova lo script.

<h3 id="13">Come iniziare</h3>
_____________________________
Per iniziare ad operare con il nostro ambiente è possibile collegarsi all'indirizzo [http://wbr1.webrobotics.net/infobio/](http://wbr1.webrobotics.net/infobio/?dicom=example.dcm&frames=133,"infobio webrobotics.net").

Nell'url è necessario specificare i seguenti parametri:
* `dicom` - con il nome del file DICOM da manipolare.
* `frames` - per indicare su quanti frames si vuole operare.

**Ora siete operativi!**

Come prima cosa sarà necessario selezionare un'azione, le disponibili sono:
* `draw` - per disegnare con il plug-in corrente.
* `edit` - serve per modificare un disegno già fatto.
* `drag` - serve per traslare tutta l'area di lavoro solamente quando si vuole e non involontariamente durante il draw.
* `delete` - serve per cancellare i punti.

E' disponibile una select box per scegliere uno dei plug-in inizializzati e quindi pronti all'uso. Ogni plug-in permette di disegnare una figura e quindi ha sue caratteristiche di rappresentazione e di gestione dell'input e degli eventi.

E' importante ricordare le seguenti operazioni con il mouse:
* `click` - dipendente dall'azione corrente e dal plug-in scelto, ad esempio in fase di **draw<b/> inserisce un punto o inizia un disegnare un tratto.
* `doppio click` - chiusura di un set durante un'azione di **draw**.
* `scroll` - effettua zoom-in e zoom-out su tutta l'area di lavoro.

Altri strumenti messi a disposizione:
* `Contrast` - varia il constrasto dell'immagine.
* `Threshold` - varia la soglia di contrasto. Agendo sulla soglia e poi sul contrasto si possono schiarire i toni chiari e scurire i toni scuri. La soglia nello specifico identifica la sensibilità di selezione dei toni. Il valore di default, 50, è un ottimo compromesso per una immagine DICOM.
* `Brightness` - varia la luminosità dell'immagine.
* `Colore dei punti` - varia il colore dei punti con un comodo color picker.
* `Colore delle linee` - varia il colore delle linee con un comodo color picker.

<h3 id="14">Autori</h3>
_____________________________
Gli autori di questo progetto sono:
* [Massimo Candela](https://github.com/MaxCam,"Massimo Candela"), mat. 281191
* [Daniele Malta](https://github.com/,""), mat.
* [Elisabetta Melis](https://github.com/,""), mat.
* [Lorena Nacchia](https://github.com/,""), mat.
