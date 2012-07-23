/*
Definizione delle variabili globali comuni a tutto il progetto.
Vengono inizializzati i plugin
 */

var web3d_ide;
var canvas;
var form;
var ctx;
var scale;
var backgrounds = new Array();
var n_points=0;
var cur_plugin;
var cur_action;
var selected_point;
var drag=false;
var paint=false;
var el_contrast;
var el_brightness;
var frame_start;
var dicom;
var num_frame;

/*
Configurazione modello 3D
*/
var sliceSize;


/*
ogni plugin è contenuto nella cartella plugins ed ha un suo file .js
Per caricarli basta aggiungere un nuovo oggetto plugin all'array plugins.
 */
var plugins=new Array();
plugins.push(new Polyline());
plugins.push(new Polygon());
plugins.push(new Freepol());