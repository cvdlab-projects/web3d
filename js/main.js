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

//config
var plugins=new Array();
plugins.push(new Polyline());