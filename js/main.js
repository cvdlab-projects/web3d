/*
Definizione delle variabili globali comuni a tutto il progetto.
Vengono inizializzati i plugin
 */

var web3d_ide;
var canvas;
var form;
var cur_z=0;        // variabile che indica la slice corrente dell'immagine
var ctx;
var scale;
var backgrounds = new Array();
var n_points=0;
//var points =new Array();
var cur_plugin;
var cur_action;
var linewidth=1;
var selected_point;
var drag=false;
var pointColor="red";
var lineColor="blue";
var paint=false;
var el_contrast;
var el_brightness;
/*
ogni plugin è contenuto nella cartella plugins ed ha un suo file .js
Per caricarli basta aggiungere un nuovo oggetto plugin all'array plugins.
 */
var plugins=new Array();
plugins.push(new Polyline());
plugins.push(new Polygon());
plugins.push(new Freepol());