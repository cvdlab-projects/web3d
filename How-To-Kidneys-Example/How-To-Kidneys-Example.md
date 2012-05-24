HOW-TO KIDNEYS EXAMPLE
======================

## Step 1

Prima di iniziare questo esempio, si è caricato il file multislicer DICOM sul server di riferimento all'indirizzo:
http://wbr1.webrobotics.net/infobio/?dicom=example6.dcm&start=19&frames=47&slicesize=1 
Successivamente, si è iniziato a lavorare sull’oggetto di nostro interesse (nel nostro caso i Reni), aprendo dapprima la slice di partenza, e successivamente ,tramite la funzionalità di zoom (implementata con lo scroll del mouse) si è potuto focalizzare il nostro interesse sull’oggetto su cui volevamo lavorare centrandolo inoltre nella CANVAS tramite il comando DRAG.
FIGURA 1

## Step 2

Una volta centrata e zoommata a piacere la slice di interesse, è stato scelto il PLUGIN che si è deciso di utilizzare dal menu a tendina che si trova sul DIV alla destra della nostra CANVAS (nel nostro caso Polyline). 
FIGURA 2

## Step 3

Successivamente, attraverso il comando DRAW si è potuto iniziare a disegnare i punti secondo il PlugIn specificato.
FIGURA 3

## Step 4

Una volta terminata la selezione di punti intorno agli oggetti di interesse, si è deciso di utilizzare il comando APPLICA A SUCCESSIVA, che permette di ricopiare lo stesso set di punti anche alla slice seguente.
Spostandoci infatti sulla slice successiva quello che si otterrà sarà non più una slice “vuota”, ma una già modificata alla quale sono stati applicati dei punti.
FIGURA 4

## Step 5

Una volta eseguito il passo 1) di zoom e riposizionamento dell’immagine in maniera centrata, si è utilizzato il comando EDIT per spostare dei punti in base alla variazione di contorno dell’oggetto di interesse, e il comando DELETE in grado di eliminare quei punti superflui cliccando semplicemente sul punto desiderato.
FIGURA 5

## Step 6

Terminato ciò, si è continuato ad adottare questo metodo per tutte le slices del nostro DICOM, ottenendo un insieme globale di punti necessari al nostro modello 3D.
Per poter effettuare questo lavoro a più riprese, si è salvato il lavoro facendoci ritornare il Json attraverso il comando JSON EDITOR e copiando il tutto all’interno di un editor di testo.
FIGURA 6

## Step 7

Per riprendere il lavoro in un secondo momento, è bastato semplicemente , una volta caricato il DICOM “vuoto” di partenza, aprire il JSON EDITOR, cancellare il suo contenuto e incollare quello salvato e confermare attraverso il comando AGGIUNGI che si trova in altro a destra nella casella di Json Editor.
Nota: UN consiglio che si vuole dare, è quello di salvare il lavoro a blocchi di slice non troppo grandi (20 per volta) in maniera da non caricare troppo il Json.
FIGURA 7

## Step 8

Una volta caricati tutti i punti sul nostro DICOM, quello che ci resta da fare è semplicemente creare il nostro modello 3D attraverso il comando APRI 3D.
FIGURA 8
