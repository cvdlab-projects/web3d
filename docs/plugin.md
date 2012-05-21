Plug-in
=======
I plug-in permettono di aggiungere in modo semplice nuovi strumenti di disegno.

##Caricare un plug-in
L'aggiunta di un plug-in può essere riassunta nei seguenti passi:

1. inserire la cartella contenente tutti i file Javascript del plug-in dentro la cartella `plugins`, come illustrato nella sezione package.

2. aggiungere l'inport del file javascript contenente l'implementazione del plug-in nell'header di `index.htm`.

3. aggiungere in `main.js` l'istanza del plug-in alla lista dei plug-in disponibili, ad esempio nel caso di Polyline:

        plugins.push(new Polyline()); /* sarà di fatto un singleton */

##Struttura di un plug-in
Una classe plug-in deve almeno implementare i seguenti metodi:

####addPoint(point)
Il metodo addPoint aggiunge un punto al set corrente, definito come l'ultimo utilizzato dall'utente.

Prima di inserire un punto viene verificata la compatibilità geometrica del nuovo set con il plug-in.

####mouseMove(x,y)
Questo metodo gestisce, solo se necessario, l'azione da intraprendere in caso di movimento del mouse in fase di draw.

Permette, ad esempio, di specificare l'azione da svolgere in caso si verifichino gli eventi `click` e `mousemove` contemporaneamente.

####removePoint(n)
Il metodo removePoint elimina dal set corrente il punto numero `n`.
Il parametro `n` viene fornito dalla cooperazione di vista e controller al click dell'utente.

####getCurSet()
Il metodo getCurSet restituisce il set corrente di punti, cioè l'ultimo set selezionato.

####removeLast()
Elimina l'ultimo punto inserito.

####setCurSet()
Il metodo setCurSet imposta come corrente il set `n` della slice attuale.

Il parametro `n` viene fornito dalla cooperazione di vista e controller al click dell'utente.

Il set corrente è sempre l'ultimo nella lista dei set della slice corrente.

####endSet()
Il metodo endSet permette di specificare quando un disegno è finito.

####addSet(set,z)
Il metodo addSet viene utilizzato per aggiungere set completi, anche provenienti da altri plugin, alla slice `z`, dopo aver effettuato un controllo di compatibilità.

####removeSet
Elimina il set `n` dalla slice corrente, cioè cancella la figura `n`.

Il parametro `n` viene fornito dalla cooperazione di vista e controller al click dell'utente.

####removeCurSet()
Elimina il set corrente, ovvero l'ultima figura selezionata.

####getId()
Ritorna l'id univoco dell'istanza del plugin all'interno dell'IDE.

#### getSet(n)
Restituisce il set `n` della slice corrente.

####getSets
Restituisce tutti i set presenti sulla slice corrente.

####getAllSets()
Restituisce tutti i set presenti, qualsiasi sia la slice.

####toString()
Restituisce il nome del plug-in.

####isValidSet(set)
Verifica se il set di punti fornito dall'utente è compatibile con il disegno da tracciare.

Es: Un quadrato non può avere un set di più di quattro punti.

####drawPoints()
Questa funzione,che restituisce true o false, decide se il plugin mostra o meno i punti tracciati.

####draw(light)
Il metodo draw disegna tutte le figure, appartenenti al plugin, della slice corrente.

Il parametro booleano `light`, indica se il metodo deve effettuare un disegno completo `(!light)` o selettivo/incrementale `(light==true)`.

L'approccio selettivo/incrementale permette un drastico risparmio di risorse ma può essere utilizzato solo nei casi in cui la canvas mantiene dimensioni e posizione costanti.