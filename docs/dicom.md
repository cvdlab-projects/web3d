Lo standard DICOM
=================

##Introduzione
Le immagini biomediche sono lo strumento fondamentale per fornire al paziente un servizio accurato e di alta qualità.  Negli anni ‘70 l’industria dell’elettronica introdusse nel mondo commerciale gli apparati per la digitalizzazione dell’immagine e gli ospedali furono in grado di migliorare e incrementare i servizi offerti, mediante l’impiego della più moderna strumentazione per la radiologia, la risonanza magnetica, la diagnostica ad ultrasuoni e la medicina nucleare.

L’immagine risultante veniva salvata in un formato proprietario, dipendente dal tipo di strumentazione usata e dal suo costruttore. L’alto numero di apparecchiature presenti negli ospedali, estremamente eterogenee dal punto di vista della provenienza, rendeva scomodo e talvolta impossibile lo scambio di dati medici, a causa dell’incompatibilità di formato dei file. Emerse quindi la necessità di stabilire uno standard che regolasse non solo le modalità di salvataggio delle informazioni dei pazienti, ma anche le procedure di scambio delle stesse nella rete ospedaliera.

A partire dal 1983, i più grandi esponenti negli Stati Uniti nel settore della radiologia e della produzione di strumentazione, l’American College of Radiology (ACR) e la National Electrical Manufacturers Association (NEMA), si riunirono in un comitato e produssero il primo importante documento che gettava le basi per la comunicazione standardizzata dei dati medici. Il comitato continuò a riunirsi negli anni successivi, apportando modifiche e miglioramenti alla normativa, sotto l’impulso del progresso tecnologico e degli interessi economici e logistici delle aziende manifatturiere e ospedaliere.

![Esempio di rete DICOM](http://www.trophos.org/wp-content/uploads/2011/04/retedicom.png "Esempio di rete DICOM")


##DICOM: oggetti e servizi
Lo standard DICOM definisce un ambiente object oriented, in cui cioè le informazioni e le funzioni che operano su di esse sono raggruppate in categorie facilmente gestibili, definite appunto oggetti: la progettazione object oriented consente di produrre software meno complesso e, soprattutto, più facilmente aggiornabile di quanto non avvenga con approcci più datati, ad esempio di tipo procedurale. 

Una __Application Entity__ è un’applicazione che interagisce con altre su una rete, o tramite memorie di massa removibili, adoperando il protocollo DICOM. In particolare una AE è un __Service Class User__ quando richiede servizi DICOM in un ambiente interconnesso, comportandosi quindi come un client, mentre è un __Service Class Provider__ quando fornisce tali servizi, comportandosi quindi come server.

Inoltre, sono definiti i servizi che possono essere gestiti su rete. Questi sono raggruppati per affinità in __Classi di Servizio__ (Service Classes), e sono in continua espansione, man mano che lo standard evolve. Quando un gruppo particolare di servizi, appartenente alla stessa classe, costituisce un servizio di livello più elevato, viene raccolto dallo standard in un __Meta Servizio__: pertanto specificare che una certa applicazione supporta un determinato meta servizio significa che tale applicazione gestisce un ben preciso gruppo di servizi. 

DICOM descrive gli oggetti che può gestire, e le relazioni che tra questi possono sussistere, mediante un modello Entity Relationship dettagliato nelle sezioni tre e quattro delle specifiche: ad ogni entità del modello è associata la __Information Object Definition__ (IOD) che la descrive, e l’insieme delle IOD costituisce l’Information Model.

![Alt Esempio di un IOD](http://digilander.libero.it/openworks/immagini/fig_1_2.jpg "Esempio di un IOD")

Il protocollo __DIMSE__, DIcom Message Service Element, gestisce la comunicazione tra entità, definendo le operazioni applicabili alle IOD.

##La comunicazione su rete
Tra due applicazioni DICOM viene scambiata informazione definita da IOD, combinata con uno o più servizi. L’elemento fondamentale di scambio è la __SOP Class__, Service Object Pair Class, coppia oggetto-operazione. La SOP associa un oggetto (Patient Root Query/Retrieve Information Model) ad un’azione (FIND, MOVE, GET) e le viene associato un numero identificativo unico. 

![Alt Modello ER del DICOM](http://digilander.libero.it/openworks/immagini/fig_1_1.jpg "Modello ER del DICOM")

Affinché due Application Entities possano interagire tra loro, devono preliminarmente verificare una serie di parametri, tra cui ad esempio quali servizi possono operare sui due sistemi (il che condiziona di conseguenza il tipo di entità che possono essere scambiate) e la sintassi di trasferimento che deve essere adoperata nella comunicazione, cioè come comandi e istanze di oggetti sono codificati durante il trasferimento. Lo scambio di comandi e istanze di oggetti può avvenire solo dopo che sia stata costituita un’associazione. Per questo, DICOM definisce un protocollo che, nel caso dei servizi più comuni, consiste in una richiesta di associazione  da parte del client (SCU), nella quale sono indicati i servizi che il SCU vorrebbe adoperare e le sintassi che comprende; a questa il server (SCP) risponde con un sottoinsieme di servizi validi e con la sintassi che riconosce. Se il sottoinsieme di servizi è vuoto il server ha rifiutato l’associazione, viceversa possono essere effettuate le operazioni richieste.

##Il file DICOM
Un file DICOM può essere visto come un pacchetto, un insieme strutturato di dati che descrivono tutto il procedimento che ha portato alla costruzione dell'immagine stessa. Sostanzialmente un file DICOM consiste di un'intestazione costituita da un insieme di attributi contenenti informazioni di varia natura e da un corpo dati atto a contenere una o più immagini. 

![Alt Struttura di un file DICOM](http://www.leadtools.com/help/leadtools/v175/dh/to/dicom.gif "Struttura di un file DICOM")

L'insieme di attributi che formano l'intestazione possono essere raggruppati in base alla relazione che esiste tra di loro e vanno a formare le IOD. Nel primo gruppo di attributi sono presenti informazioni quali l'anagrafica del paziente (nome, ID, data di nascita, sesso, ecc.); nel secondo gruppo sono presenti le caratteristiche delle diverse metodiche di analisi (modalità) costituenti lo studio diagnostico (data, ora, medico referente, ecc.); nel terzo gruppo, definito serie, vengono raccolti i dati che descrivono le collezioni di immagini provenienti da ogni modalità diagnostica con i relativi parametri di acquisizione (numero della serie, tipo di modalità, ecc.); infine, il quarto gruppo contiene gli attributi descrittivi delle immagini come la dimensione della matrice, la profondità del pixel, l'interpretazione fotometrica ecc. 

###Accesso ai file DICOM
I file DICOM possiedono un elevato contenuto informativo, in quanto raccolgono non solo dati relativi al paziente (anagrafica, esami diagnostici, cartelle cliniche, ecc...) ma anche riguardanti lo scambio degli stessi nella rete ospedaliera.
Inoltre, la presenza di particolari referti, quali immagini radiologiche di TAC, RMN e fluoroscopia, può portare il file  ad avere dimensioni superiori ai 300 MB.
Appare quindi difficoltosa la gestione di una tale mole di dati con una semplice applicazione JavaScript.

Si è scelto a tale scopo di delegare l'apertura dei DICOM ad un programma specifico, sviluppato da Sebastien Barre e liberamente disponibile su web all'indirizzo [www.barre.nom.fr] per Windows e Linux, denominato dicom2.exe.

Tale libreria è stata resa disponibile su internet come servizio generico mediante uno script PHP che le fa da wrapper.
L'input dello script è un intero n, indice delle slice, e l'URL di un file DICOM; l'output è costituito dall'immagine relativa alla slice n richiesta in formato png. 
Al fine di ottimizzare il caricamento delle immagini, viene effettuata una memorizzazione delle stesse in cache.
Inoltre, si effettua parsing dell'input per gestire gli errori e prevenire la code injection.







