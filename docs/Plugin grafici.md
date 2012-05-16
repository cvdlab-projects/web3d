Plugin grafici
==============
In questa sezione vengono mostrati i plugin grafici sviluppati per la generazione delle figure.
Ogni plugin è dotato di un id, che consente l'identificazione univoca dell'istanza del plugin.
Nella slice corrente, il set di punti è un oggetto Map, la cui chiave è rappresentata dalla slice stessa.

```js
function Polyline(){
    this.sets=new Map();
    this.id=plugins.length;
}
```

La versione attuale comprende i seguenti plugin:

- Polyline
- Polygon



Polyline
--------
Il plugin Polyline disegna una polilinea in modo dinamico, congiungendo con dei segmenti i punti definiti dall'utente.

Inoltre, è possibile definire sulla stessa slice più set di polilinee, memorizzate in un array.
Il set corrente è sempre l'ultimo nella lista.

I metodi `getCurSet` e `setCurSet` consentono rispettivamente di conoscere il set corrente di punti, cioè l'ultima polilinea modificata, e di impostare come corrente il set n della slice attuale.

Il metodo `addPoint` aggiunge un punto al set attuale; prima dell'inserimento viene verificata la compatibilità geometrica del nuovo set con questo plugin, mediante l'invocazione della funzione `isValidSet`.

Il disegno vero e proprio della polilinea è effettuato dal metodo `draw`, congiungendo i punti mediante segmenti.



