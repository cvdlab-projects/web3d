HOW-TO KIDNEYS EXAMPLE
======================

## Step 1 (Caricamento DICOM , Zoom e Centramento nella Canvas)

Prima di iniziare questo esempio, si è caricato il file multislicer DICOM sul server di riferimento all'indirizzo:
http://web3d.dia.uniroma3.it/?dicom=example6.dcm&start=19&frames=47&slicesize=1 

Successivamente, si è iniziato a lavorare sull’oggetto di nostro interesse (nel nostro caso i Reni), aprendo dapprima la slice di partenza, e successivamente ,tramite la funzionalità di zoom (implementata con lo scroll del mouse) si è potuto focalizzare il nostro interesse sull’oggetto su cui volevamo lavorare centrandolo inoltre nella 'canvas' tramite il comando __DRAG__.

![Step 1](https://github.com/cvdlab-bio/web3d/blob/master/How-To-Kidneys-Example/How To Images/Figure 1.PNG "Step 1")

## Step 2 (Scelta del PlugIn)

Una volta centrata e zoommata a piacere la slice di interesse, è stato scelto il __PLUGIN__ che si è deciso di utilizzare dal menu a tendina che si trova sul 'div' alla destra della nostra 'canvas' (nel nostro caso Polyline). 

![Step 2](https://github.com/cvdlab-bio/web3d/blob/master/How-To-Kidneys-Example/How To Images/Figure 2.PNG "Step 2")

## Step 3 (Tracciamento dei punti)

Successivamente, attraverso il comando __DRAW__ si è potuto iniziare a disegnare i punti secondo il PlugIn specificato.

![Step 3](https://github.com/cvdlab-bio/web3d/blob/master/How-To-Kidneys-Example/How To Images/Figure 3.PNG "Step 3")

## Step 4 (Copia dei punti su slice seguente)

Una volta terminata la selezione di punti intorno agli oggetti di interesse, si è deciso di utilizzare il comando __APPLICA A SUCCESSIVA__, che permette di ricopiare lo stesso set di punti anche alla slice seguente.
Spostandoci infatti sulla slice successiva quello che si otterrà sarà non più una slice “vuota”, ma una già modificata alla quale sono stati applicati dei punti.

![Step 4](https://github.com/cvdlab-bio/web3d/blob/master/How-To-Kidneys-Example/How To Images/Figure 4.PNG "Step 4")

## Step 5 (Modifica dei punti)

Una volta eseguito il __passo 1)__ di zoom e riposizionamento dell’immagine in maniera centrata, si è utilizzato il comando __EDIT__ per spostare dei punti in base alla variazione di contorno dell’oggetto di interesse, e il comando __DELETE__ in grado di eliminare quei punti superflui cliccando semplicemente sul punto desiderato.

![Step 5](https://github.com/cvdlab-bio/web3d/blob/master/How-To-Kidneys-Example/How To Images/Figure 5.PNG "Step 5")

## Step 6 (Salvataggio tramite Json)

Terminato ciò, si è continuato ad adottare questo metodo per tutte le slices del nostro DICOM, ottenendo un insieme globale di punti necessari al nostro modello 3D.
Per poter effettuare questo lavoro a più riprese, si è salvato il lavoro facendoci ritornare il Json attraverso il comando __JSON EDITOR__ e copiando il tutto all’interno di un editor di testo.

![Step 6](https://github.com/cvdlab-bio/web3d/blob/master/How-To-Kidneys-Example/How To Images/Figure 6.PNG "Step 6")

## Step 7 (Caricamento tramite Json)

Per riprendere il lavoro in un secondo momento, è bastato semplicemente , una volta caricato il DICOM “vuoto” di partenza, aprire il JSON EDITOR, cancellare il suo contenuto e incollare quello salvato e confermare attraverso il comando __AGGIUNGI__ che si trova in altro a destra nella casella di Json Editor.

__Nota__: Un consiglio che si vuole dare, è quello di salvare il lavoro a blocchi di slices non troppo grandi (20 per volta) in maniera da non caricare troppo il Json.

![Step 7](https://github.com/cvdlab-bio/web3d/blob/master/How-To-Kidneys-Example/How To Images/Figure 7.PNG "Step 7")

## Step 8 (Creazione Modello 3D)

Una volta caricati tutti i punti sul nostro DICOM, quello che ci resta da fare è semplicemente creare il nostro modello 3D attraverso il comando __APRI 3D__.

![Step 8](https://github.com/cvdlab-bio/web3d/blob/master/How-To-Kidneys-Example/How To Images/Figure 8.PNG "Step 8")
