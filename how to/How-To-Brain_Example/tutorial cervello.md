Esempio 3: Modello dell'encefalo
================================

#Acquisizione delle immagini
Le immagini DICOM relative all'encefalo derivano da indagini diagnostiche effettuate mediante tomografia computerizzata TC e risonanza magnetica MR.
Nello sviluppo di questo modello è stato consultato l'archivio online del NEMA, in cui sono accessibili file DICOM sia single che multi slice, all'indirizzo ftp://medical.nema.org/medical/dicom/Multiframe.
Ovviamente, per la realizzazione di un modello 3D è necessario un file DICOM multi slice, che può arrivare a contenere oltre 400 immagini. Ciò si verifica, per esempio, quando viene effettuato un esame medico di altissima qualità, che prevede quindi un campionamento molto fitto dell'organo da analizzare, o quando sono impiegate differenti proiezioni e sequenze di contrasto.
Pertanto, va messa in atto una preselezione delle immagini da caricare, scegliendo le sole utili all'applicazione:
una volta individuata la sequenza di interesse, vengono scartate le immagini prive di contenuto, tipicamente le prime e le ultime.

##Conversione dei file DICOM e caricamento
Il file scelto (GFUNCST) è disponibile al seguente indirizzo ftp://medical.nema.org/medical/dicom/Multiframe/MR/nemamfmr.imagesDG.tar.bz2.
Una volta scaricato, esso è stato convertito nel formato png, come illustrato nella sezione https://github.com/cvdlab-bio/web3d/blob/master/docs/intro.md#installazione.
Del DICOM originario sono state selezionate solo le slice 5-125, specificando nell'url la stringa `&frames=120&start=5`; è possibile cambiare i parametri inserendo dopo *start* la slice di inizio e dopo *frames* il numero di slice da selezionare dopo la prima. 

#Come iniziare: l'ambiente di lavoro
Dopo aver caricato il file, è subito possibile iniziare ad effettuare le prime operazioni. Può essere utile spostare l'immagine al centro della canvas ed ingrandirla, per evidenziare le parti di interesse, eventualmente usufruendo anche dello strumento per la regolazione della luminosità e del contrasto.
Il drag dell'immagine si esegue semplicemente cliccando sul tasto drag e poi trascinandola, mentre lo zoom si effettua mediante scroll del tasto centrale del mouse.

![Figura 1 Ambiente di lavoro](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Brain_Example/How%20To%20Images/figura1.png?raw=true)

#Lo strumento di disegno
Cuore dell'applicazione, lo strumento di disegno è stato pensato per consentire all'utente di effettuare operazioni di
selezione di contorni, nell'ottica di evidenziare particolari regioni del dato biomedico.
Sono fornite tre differenti modalità di disegno:

* polyline
* polygon
* freepol.

Polyline consente di costruire una linea spezzata, i cui punti vengono impressi sulla canvas dal click del mouse.
Analogamente, Polygon permette di generare una figura geometrica che si richiude su se stessa automaticamente, sfruttando le polilinee.
Infine, Freepol costituisce il disegno a mano libera. 

![Figura 2 Polyline](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Brain_Example/How%20To%20Images/figura2.png?raw=true)

![Figura 3 Polygon](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Brain_Example/How%20To%20Images/figura3.png?raw=true)

![Figura 4 Freepol](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Brain_Example/How%20To%20Images/figura4.png?raw=true)

Punti e linee hanno colori diversi per garantire una maggiore visibilità, ed essi possono essere modificati a piacimento
inserendo nell'apposita casella il relativo codice esadecimale.

![Figura 5 Color selection](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Brain_Example/How%20To%20Images/figura5.png?raw=true)

#Iniziamo a disegnare
Eseguiti i passi elencati nelle sezioni precedenti è sufficiente scegliere dal menù a tendina `Select plugin` la tipologia di disegno da effettuare e quindi cliccare sul tasto `draw`. Data la complessità geometrica del profilo dell'encefalo, è consigliabile  di avvalersi del disegno a mano libera freepol.

![Figura 6 Freepol](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Brain_Example/How%20To%20Images/figura6.png?raw=true)

Come si vede nella figura, il profilo è molto accurato e le curve tracciate sono fluide e continue, grazie all'impiego di un numero elevato di punti rispetto alle altre due modalità operative. Si può osservare che tra questi ultimi sono stati eliminati quelli superflui, garantendo il risparmio delle risorse impiegate e preservando la qualità.
Una volta terminato il disegno, è necessario effettuare un doppio click in prossimità dell'ultimo punto tracciato; senza questa operazione, la figura non si riterrà conclusa e un eventuale nuovo punto verrà congiunto all'insieme esistente.

##Editing del disegno
Errare è umano, ed è comprensibile che un disegno a mano libera, specie se effettuato con strumenti non professionali, possa comportare dei risultati indesiderati. Per apportare modifiche alla figura disegnata, sia in fase di creazione che dopo la chiusura del set, è sufficiente selezionarla cliccando su `edit`e selezionare una tra le tre opzioni seguenti:

* spostamento di punti
* cancellazione di punti
* cancellazione del disegno.

Si consiglia di effettuare uno zoom preventivo alle operazioni di cancellazione e spostamento di punti.

###Spostamento di punti
Cliccare sul punto desiderato e spostarlo nella posizione preferita. La linea verrà ricongiunta automaticamente.

###Cancellazione di punti
Cliccare sul tasto `delete`, quindi cliccare sui punti da eliminare. La linea verrà ricongiunta automaticamente.

###Cancellazione della figura
Cliccare su `cancella disegno` e verrà eliminata l'ultima figura inserita.

#Il modello 3d
Le indagini diagnostiche di TC e MR consistono in una scansione progressiva della parte anatomica sotto esame lungo un asse, in modo tale che questa venga 'affettata' in modo più o meno fitto dipendentemente dalla risoluzione spaziale desiderata.
Così si ottengono le slice di cui si è parlato finora; allineando le slice tra loro e presentandole in sequenza è possibile ottenere una figura solida che approssima il volume dell'organo considerato.
Il principio di costruzione del nostro modello 3d è quindi il seguente. Vengono sovrapposte una sull'altra le immagini ottenute dalla selezione dei contorni 2d di tutte le slice del set di dati. Queste sono sottoposte ad estrusione lungo l'asse verticale per la generazione del volume.

##L'ambiente di lavoro
Una volta effettuate le selezioni dei contorni per un certo numero di immagini, si può cliccare sul tasto `Apri 3d`.

![Figura 7 Ambiente 3d](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Brain_Example/How%20To%20Images/figura7.png?raw=true)

Per una maggiore visibilità del modello, si può cambiare il colore di sfondo mediante l'apposito tool.
Inoltre, anche lo spessore delle slice è un parametro modificabile da input, caratteristica molto importante perchè consente di adattare la forma del modello il più possibile all'originale. 
Esistono due modalità di visualzzazione:

* riempimento
* contorno.

Nella modalità riempimento, viene visualizzata la figura 3d come un solido, su cui siano state applicate le texture appartenenti alle singole immagini 2d che lo compongono.
Invece, l'opzione contorno mostra i soli contorni delle slice che costituiscono il modello, fornendo una visione anche dell'interno cavo del volume grazie alla trasparenza. 

##Il risultato finale
Dopo aver collezionato il disegno dei bordi 2d per tutte le 121 slice che compongono il set di dati, è stato generato il modello 3d di cui vengono mostrate alcune proiezioni.












