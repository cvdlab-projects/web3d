Plugin grafici
==============
In questa sezione vengono mostrati i plugin grafici sviluppati per la generazione delle figure.
La versione attuale comprende i seguenti plugin:

- Polyline
<<<<<<< HEAD
=======
- Polygon
- Freepol

Polyline e Polygon consentono di disegnare una polilinea in modo dinamico, congiungendo uno ad uno con dei segmenti i punti definiti dall'utente.
A differenza del plugin Polyline, Polygon effettua il disegno di spezzate chiuse.
Invece, Freepol Ã¨ deputato alla costruzione di un tratto continuo "a mano libera".

Qui di seguito verranno illustrati i metodi principali comuni alle classi, parlando indifferentemente di polilinee, poligoni e freepol.
>>>>>>> 03a8fe1ef46e95185a90135fb38b9b1542aa115f



Polyline
--------
Il plugin Polyline disegna una polilinea in modo dinamico, congiungendo con dei segmenti i punti definiti dall'utente.

Nella slice corrente, il set di punti è un oggetto Map, la cui chiave è rappresentata dalla slice stessa.
Inoltre, è possibile definire sulla stessa slice più set di polilinee, memorizzate in un array.
Il set corrente è sempre l'ultimo nella lista.

I metodi 'getCurSet' e 'setCurSet' consentono rispettivamente di conoscere il set corrente di punti, cioè l'ultima polilinea modificata,
e di impostare come corrente il set n della slice attuale.

<<<<<<< HEAD
Il metodo 'addPoint' aggiunge un punto al set attuale; prima dell'inserimento viene verificata la compatibilità geometrica 
del nuovo set con questo plugin, mediante l'invocazione della funzione 'isValidSet'.
=======

>>>>>>> 03a8fe1ef46e95185a90135fb38b9b1542aa115f

Il disegno vero e proprio della polilinea è effettuato dal metodo 'draw', congiungendo i punti mediante segmenti.



