HOW-TO HEART EXAMPLE
======================
Questa sezione è dedicata all’utilizzo dell’editor grafico finalizzato alla realizzazione di modelli 3D a partire da file Dicom opportunamente estratti, convertiti in immagini (nel nostro esempio in formato png) e quindi caricati sul server del dipartimento di Informatica e Automazione dell'Università di Roma3 attraverso cui è possibile accedere all’applicazione.

Per iniziare a lavorare è opportuno utilizzare un Browser compatibile con WebGl e Html5. 

In questo esempio, testeremo l’applicazione con Chrome il cui download è disponibile al seguente link https://www.google.com/chrome/index.html?hl=it#eula.

Una volta aperto un browser compatibile con Html5, è possibile accedere all’editor grafico collegandosi al seguente indirizzo: http://web3d.dia.uniroma3.it/.

Accedendo alla pagina verrà visualizzato il seguente messaggio di alert:   
   
</br>      
![Alert](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine1.png?raw=true "Alert")
</br>

Per poter lavorare sulle immagini Dicom sarà necessario modificare l’url, specificando il nome del file Dicom su cui si intende lavorare e una delle slice di cui il file Dicom si compone.

Si procede quindi come segue:   

</br>     
![Url](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine2.png?raw=true "Url")
</br>  

In questo caso specifico abbiamo aperto il file Dicom caricato precedentemente sul server con nome example8.dcm e visualizzato la prima delle 250 slice (frames = 250) di cui il file è composto.

L’immagine visualizzata è quella dei piedi; per poter lavorare su altre immagini sarà necessario aggiungere sul server il file Dicom relativo e modificare in modo opportuno il nome del dicom all’interno dell’url.

A questo punto è possibile iniziare a lavorare sulle immagini utilizzando l’editor, il cui funzionamento verrà illustrato di seguito.

Per poter lavorare in modo ottimale è possibile effettuare il drag dell’immagine selezionando il tasto Drag sul pannello posto sulla destra.

</br>  
![Drag](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine3.png?raw=true "Drag")
</br>  

In questo modo sarà possibile muovere l’immagine all’interno della Canvas premendo il tasto sinistro del mouse e trascinando l’immagine.

</br>  
![Prima del Drag](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine4.png?raw=true "Prima del Drag")
</br>  
</br>  
![Dopo il Drag](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine5.png?raw=true "Dopo il Drag")
</br>  

E’ inoltre possibile effettuare lo zoom delle immagini mediante lo scroll del tasto centrale del mouse.

Di seguito viene mostrato un ingrandimento e successivamente un ridimensionamento dell’immagine di esempio su cui stiamo lavorando.

</br>  
![Ingrandimento](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine6.png?raw=true "Ingrandimento")
</br>  
</br>  
![Ridimensionamento](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine7.png?raw=true "Ridimensionamento")
</br>  
Poiché le immagini Dicom risultano spesso molto scure, l’editor offre la possibilità di aumentarne o comunque diminuirne la luminosità intervenendo rispettivamente sui tasti +1 e -1 della Brightness una o più volte a seconda della luminosità desiderata.

</br>  
![Brightness](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine8.png?raw=true "Brightness")
</br>  
L’editor offre inoltre la possibilità di intervenire sul contrasto delle immagini. Occorre prima di tutto scegliere un valore di soglia (Threshold che di default è fissato a 50); intervenendo sul +2 del tasto Contrast i colori oltre quella soglia verranno resi più scuri sulla base di quante volte viene selezionato il +2 mentre con il tasto -2 si otterrà il comportamento inverso, ovvero i colori al di sotto di quella soglia verranno resi più chiari.

Portando a 60 il valore del contrasto e lasciando a 50 il valore del Threshold si ottiene il seguente risultato sull’immagine che stiamo considerando.

</br>  
![Threshold](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine9.png?raw=true "Threshold")
</br>  

Ora che l’immagine è stata modificata e resa più leggibile possiamo iniziare a tracciare i punti che ci consentiranno di selezionare la porzione dell’immagine che successivamente potremo visualizzare in 3D.

Sarà comunque possibile intervenire sull’immagine modificando contrasto, luminosità e distanza in qualunque momento senza andare a cancellare il lavoro che è stato fatto in termini di punti tracciati.

Questa versione dell’editor offre la possibilità di disegnare su Canvas utilizzando uno dei tre plugin messi a disposizione dall’applicazione.

Illustriamo ora brevemente i passi che ci consentiranno di disegnare su Canvas.

Prima di tutto selezioniamo tramite menù a tendina il plugin che intendiamo utilizzare. I plugin disponibili sono:

1. Polyline che ad ogni punto tracciato va a creare una linea che lo collega al punto precedentemente tracciato 

2. Polygon che sulla base del numero di punti tracciati ci consente di creare forme geometriche chiuse

3. Freepol che ci consente di tracciare una linea libera

In questo caso utilizzeremo il plugin Polyline che possiamo selezionare come mostrato nell’immagine che segue:

</br>  
![Select Plugin Polyline](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine10.png?raw=true "Select Plugin Polyline")
</br>  
Una volta selezionato il Plugin, cliccando sul tasto Draw potremo iniziare a tracciare i punti su Canvas.
</br>  
![Punti tracciati](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine11.png?raw=true "Punti tracciati")
</br>  
</br>  
![Altri punti tracciati](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine12.png?raw=true "Altri punti tracciati")
</br>  

Per poter chiudere la Polyline è sufficiente fare doppio click sul primo punto selezionato. 

In questo modo sarà possibile tracciare altre Polyline o comunque utilizzare altri Plugin come mostrato di seguito.

</br>  
![Select plugin](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine13.png?raw=true "Select plugin")
</br>  
Quindi premere Draw e poi disegnare, ottenendo un risultato, come quello mostrato nell’immagine che segue.

</br>  
![Draw](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine14.png?raw=true "Draw")
</br>  
Premendo il tasto Edit è possibile visualizzare i punti che abbiamo tracciato (questo nel caso in cui stiamo utilizzando la Polyline o il Plugin Polygon) o disegnati automaticamente dall’applicazione come nel caso della Freepol.

</br>  
![Edit](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine15.png?raw=true "Edit")
</br>  
E’ inoltre possibile in ogni momento rimuovere i punti tracciati selezionando prima il tasto Delete e poi cliccando sul punto che si desidera rimuovere. 

Per farlo bisogna posizionarsi nel centro del punto che si desidera rimuovere.

</br>  
![Delete](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine16.png?raw=true "Delete")
</br>  
E’ inoltre possibile rimuovere l’ultima linea tracciata premendo il tasto Cancella disegno

</br>  
![Cancella disegno](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine16B.png?raw=true "Cancella disegno")
</br>  

Se lo applichiamo all’esempio appena mostrato otteniamo il seguente risultato:

</br>  
![Disegno cancellato](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine17.png?raw=true "Disegno cancellato")
</br>  

E’ poi possibile modificare il colore sia dei punti che delle linee tracciate attraverso le due color box: Points Color e Lines Color.

</br>  
![Color box points](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine18.png?raw=true "Color box points")
</br>  
</br>  
![Color box lines](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine19.png?raw=true "Color box lines")
</br>  
Selezionando, ad esempio, per le linee il colore verde e per i punti il colore giallo otteniamo il seguente effetto:

</br>  
![Color box punti e linee](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine20.png?raw=true "Color box punti e linee")
</br>  
Selezionando invece il tasto “Applica a successiva” i punti tracciati sulla slice corrente saranno applicati anche alla slice successiva.

Le immagini che seguono mostrano un possibile esempio di applicazione:

</br>  
![Applica a successiva](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine21.png?raw=true "Applica a successiva")
</br>  
Dopo aver premuto il tasto “Applica a successiva”, i punti tracciati sulla slice 0 verranno riportati sulla slice 1. 

</br>  
![Applica a successiva su slice 1](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine22.png?raw=true "Applica a successiva su slice 1")
</br>  
Questa funzionalità evita di dover tracciare manualmente i punti più volte nel caso in cui si desidera replicare su più slice i contorni tracciati.

Terminata una sessione di lavoro, è possibile poi mantenere traccia del lavoro effettuato fino a quel momento, in termini di punti tracciati, aprendo il “Json editor”, selezionabile all’interno della pagina.

Selezionando il tasto “Json editor” all’interno della pagina verrà aperta una finestra contenente i punti in formato Json che sono stati tracciati.

</br>  
![Json editor](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine23.png?raw=true "Json editor")
</br>  
Per tenere traccia del modello è possibile salvare i punti in un qualunque file di testo. Nel momento in cui andremo a riaprire l’applicazione all’url relativo al file Dicom di interesse, visualizzando il Json Editor e incollando il contenuto del file di testo al suo interno, selezionando in seguito il tasto Aggiungi vedremo tracciati sulle immagini i punti che avevamo disegnato nelle precedenti sessioni di lavoro.

In questo modo il lavoro effettuato non verrà mai perso e in ogni momento potremo riottenere le linee tracciate sulle varie slice, nel corso del tempo.

Mentre si lavora sulle immagini bidimensionali, in ogni momento sarà possibile visualizzare il risultato in 3D di quanto prodotto, selezionando il tasto Apri 3D.

L’applicazione genererà un oggetto 3D dato dall’estrusione dell’immagine ritagliata tramite Plugin per ciascuna delle slice su cui abbiamo lavorato.

Selezionando i punti, ad esempio, su 3 slice, otterremo in 3D il seguente risultato.

</br>  
![Risultato 3D](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine24.png?raw=true "Risultato 3D")
</br>  
L’applicazione consente inoltre di modificare il colore dello sfondo in ogni momento tramite la Color box e di aumentare o diminuire lo spessore di ogni singola slice andando a modificare il valore contenuto all’interno della text box evidenziata nell’immagine che segue.

</br>  
![Colore Sfondo](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine25.png?raw=true "Colore Sfondo")
</br>  
Il tasto Chiudi 3D consente invece di ritornare alla visualizzazione 2D dell’applicazione.

Per concludere, viene ora mostrato un esempio relativo alla ricostruzione completa in 3D dei due piedi di cui abbiamo visto negli esempi precedenti le slice 2D.

Il risultato che si ottiene tracciando opportunamente i punti su ciascuna delle 250 slice di cui si compone il file è mostrato nelle seguenti immagini.

</br>  
![Piedi 3D](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine26.png?raw=true "Piedi 3D")
</br>  
</br>  
</br>  
![Piedi 3D-2](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine28.png?raw=true "Piedi 3D-2")
</br>  
</br>  
</br>  
![Piedi 3D-3](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine29.png?raw=true "Piedi 3D-3")
</br>  

Al seguente link https://github.com/cvdlab-bio/web3d/tree/master/how%20to/How-To-Foots_Example/Json%20Code è disponibile il file che contiene i punti in formato Json che, ricopiati all’interno dello Json editor, consentiranno di riprodurre l’esempio appena mostrato.

Oltre alla visualizzazione per sezioni l’editor offre la possibilità di visualizzare il contorno 3D dell’oggetto realizzato, selezionando il tasto contorno.

Il risultato che si ottiene, relativamente all’immagine appena mostrata, è il seguente.

</br>  
![Contorno](https://github.com/cvdlab-bio/web3d/blob/master/how%20to/How-To-Foots_Example/How%20To%20Images/Immagine27.png?raw=true "Contorno")
</br>  
Selezionando infine il tasto riempimento sarà possibile ritornare alla visualizzazione 3D dell’oggetto nella sua interezza.
