IDE
===
La gestione dell'interfaccia utente è affidata a due classi distinte, `userui.js` e `web3d.js`, le quali si occupano 
rispettivamente degli eventi relativi alla canvas e dell'inizializzazione dell'IDE.

Userui
------
Questa classe si occupa di mettere in relazione le azioni selezionate dall'utente con le corrispondenti variazioni
della canvas e degli oggetti su di essa raffigurati.
In particolare, mediante l'uso del mouse, è possibile effettuare sull'immagine lo zoom, il drag e drop, la selezione, la cancellazione e lo spostamento di punti appartenenti a un plugin grafico.

  -Zoom
  
  Lo zoom viene effettuato allo scroll del mouse su tutta la canvas e sugli oggetti su di essa presenti.
  Si è prestata particolare cura nel garantire che questi ultimi fossero caratterizzati da un livello di zoom coerente,
  preservando le proporzioni e gli allineamenti reciprochi.
  Inoltre, caratteristica importante di questo metodo è l'invariabilità dello spessore delle linee dei plugin allo zoom:
  infatti, dal momento che le linee sono equiparate alla canvas, sarebbero soggette anch'esse all'ingrandimento, con
  evidenti problemi di leggibilità della figura.
  Mediante un procedimento di scalamento, si sono modificati i valori dello spessore proporzionalmente al livello di
  zoom.
     
  
