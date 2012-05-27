Esempio 3: Modello dell'encefalo
================================

#Acquisizione delle immagini
Le immagini DICOM relative all'encefalo derivano da indagini diagnostiche effettuate mediante tomografia 
computerizzata TC e risonanza magnetica MR.
Nello sviluppo di questo modello � stato consultato l'archivio online del NEMA, in cui sono accessibili 
file DICOM sia single che multi slice, all'indirizzo ftp://medical.nema.org/medical/dicom/Multiframe.
Ovviamente, per la realizzazione di un modello 3D � necessario un file DICOM multi slice, che pu� arrivare 
a contenere oltre 400 immagini. Ci� si verifica, per esempio, quando viene effettuato un esame medico di 
altissima qualit�, che prevede quindi un campionamento molto fitto dell'organo da analizzare, o quando sono 
impiegate differenti proiezioni e sequenze di contrasto.
Pertanto, va messa in atto una preselezione delle immagini da caricare, scegliendo le sole utili all'applicazione:
una volta individuata la sequenza di interesse, vengono scartate le immagini prive di contenuto, tipicamente le 
prime e le ultime.

##Conversione dei file DICOM e caricamento
Il file scelto (GFUNCST) � disponibile al seguente indirizzo ftp://medical.nema.org/medical/dicom/Multiframe/MR/nemamfmr.imagesDG.tar.bz2.
Una volta scaricato, esso � stato convertito nel formato png, come illustrato nella sezione 
https://github.com/cvdlab-bio/web3d/blob/master/docs/intro.md#installazione.
Del DICOM originario sono state selezionate solo le slice 5-120, specificando nell'url la stringa 
`&frames=120&start=5`; � possibile cambiare i parametri inserendo dopo *start* la slice di inizio e dopo *frame* 
la slice finale. 

#Come iniziare: l'ambiente di lavoro
Dopo aver caricato il file, � subito possibile iniziare ad effettuare le prime operazioni. Pu� essere utile 
spostare l'immagine al centro della canvas ed ingrandirla, per evidenziare le parti di interesse, eventualmente 
usufruendo anche dello strumento per la regolazione della luminosit� e del contrasto.
Il drag dell'immagine si esegue semplicemente cliccando sul tasto drag e poi trascinandola, mentre lo zoom si effettua mediante scroll
del tasto centrale del mouse.

[Figura 1_Ambiente di lavoro]: https://github.com/cvdlab-bio/web3d/tree/master/how%20to/How-To-Brain-Example/How%20To%20Images/figura1.png

#Lo strumento di disegno
Cuore dell'applicazione, lo strumento di disegno � stato pensato per consentire all'utente di effettuare operazioni di
selezione di contorni, nell'ottica di evidenziare particolari regioni del dato biomedico.
Sono fornite tre differenti modalit� di disegno:
-polyline
-polygon
-freepol.
Polyline consente di costruire una linea spezzata, i cui punti vengono impressi sulla canvas dal click del mouse.
Analogamente, Polygon permette di generare una figura geometrica che si richiude su se stessa automaticamente, sfruttando le polilinee.
Infine, Freepol costituisce il disegno a mano libera. 

[Figura 2_Polyline]: https://github.com/cvdlab-bio/web3d/tree/master/how%20to/How-To-Brain-Example/How%20To%20Images/figura2.png

[Figura 3_Polygon]: https://github.com/cvdlab-bio/web3d/tree/master/how%20to/How-To-Brain-Example/How%20To%20Images/figura3.png

[Figura 4_Freepol]:https://github.com/cvdlab-bio/web3d/tree/master/how%20to/How-To-Brain-Example/How%20To%20Images/figura4.png

Punti e linee hanno colori diversi per garantire una maggiore visibilit�, ed essi possono essere modificati a piacimento
inserendo nell'apposita casella il relativo codice esadecimale.

[Figura 5_Color selection]:https://github.com/cvdlab-bio/web3d/tree/master/how%20to/How-To-Brain-Example/How%20To%20Images/figura5.png

#Iniziamo a disegnare
Eseguiti i passi elencati nelle sezioni precedenti � sufficiente scegliere dal men� a tendina `Select plugin` la tipologia di disegno da 
effettuare e quindi cliccare sul tasto `draw`. Data la complessit� geometrica del profilo dell'encefalo, � consigliabile di avvalersi
del disegno a mano libera freepol.

[Figura 6_Freepol]:https://github.com/cvdlab-bio/web3d/tree/master/how%20to/How-To-Brain-Example/How%20To%20Images/figura6.png

Come si vede nella figura, il profilo � molto accurato e le curve tracciate sono fluide e continue, grazie all'impiego di un numero elevato
di punti rispetto alle altre due modalit� operative. Si pu� osservare che tra questi ultimi sono stati eliminati quelli superflui,garantendo 
il risparmio delle risorse impiegate e preservando la qualit�.
Una volta terminato il disegno, � necessario effettuare un doppio click in prossimit� dell'ultimo punto tracciato; senza questa operazione, 
la figura non si riterr� conclusa e un eventuale nuovo punto verr� congiunto all'insieme esistente.
##Editing del disegno
Errare � umano, ed � comprensibile che un disegno a mano libera, specie se effettuato con strumenti non professionali, possa comportare dei
risultati indesiderati. Per apportare modifiche alla figura disegnata, sia in fase di creazione che dopo la chiusura del set, � sufficiente 
selezionarla cliccando su `edit`e selezionare una tra le tre opzioni seguenti:
-spostamento di punti
-cancellazione di punti
-cancellazione del disegno.
Si consiglia di effettuare uno zoom preventivo alle operazioni di cancellazione e spostamento di punti.
###Spostamento di punti
Cliccare sul punto desiderato e spostarlo nella posizione preferita. La linea verr� ricongiunta automaticamente.
###Cancellazione di punti
Cliccare sul tasto `delete`, quindi cliccare sui punti da eliminare. La linea verr� ricongiunta automaticamente.
###Cancellazione della figura
Cliccare su `cancella disegno` e verr� eliminata l'ultima figura inserita.







