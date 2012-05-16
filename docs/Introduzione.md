Introduzione
============

L'applicazione sviluppata ha lo scopo di fornire all'utente un ambiente di facile utilizzo per l'editing di immagini biomediche.
In particolare, è possibile caricare immagini di tipo DICOM ed effettuare su di esse svariate operazioni.

Accesso ai file DICOM
---------------------
I file DICOM possiedono un elevato contenuto informativo, in quanto raccolgono non solo dati relativi al paziente (anagrafica, esami diagnostici, cartelle cliniche, ecc...) ma anche riguardanti lo scambio degli stessi nella rete ospedaliera.
Inoltre, la presenza di particolari referti, quali immagini radiologiche di TAC, RMN e fluoroscopia, può portare il file  ad avere dimensioni superiori ai 300 MB, nonostante un formato di compressione JPEG 2000.
Appare quindi difficoltosa la gestione di una tale mole di dati con una semplice applicazione JavaScript.

Si è scelto a tale scopo di delegare l'apertura dei DICOM ad un programma specifico, sviluppato da Sebastien Barre e liberamente disponibile su web all'indirizzo www.barre.nom.fr per Windows e Linux, denominato dicom2.exe.

Tale libreria è stata resa disponibile su internet come servizio generico mediante uno script PHP che le fa da wrapper.
L'input dello script è un intero n, indice delle slice, e l'URL di un file DICOM; l'output è costituito dall'immagine relativa alla slice n richiesta. 
Al fine di ottimizzare il caricamento delle immagini, viene effettuata una memorizzazione delle stesse in cache.
Inoltre, si effettua parsing dell'input per gestire gli errori e prevenire la code injection.
