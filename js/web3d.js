
var web3d_ide;
var canvas;
var form;
var cur_z=0;        // variabile che indica la slice corrente dell'immagine
var ctx;
var scale;
var backgrounds = new Array();
var n_points=0;
var points =new Array();
var cur_plugin;
var cur_action;

function getWeb3d(){
    web3d_ide=$("#web3d-ide");
    canvas=web3d_ide.find("#web3d-ide-canvas");
    canvas.width = 800;
    canvas.height = 600;
    form=web3d_ide.find('#form-div');
    ctx= canvas[0].getContext("2d");

    loadGeneralConf();
    form.prepend(getPluginSelect());
    scale = 1;
    setBackground(cur_z);

    points.push(new Array());

    eventsManager();
}

function getPluginSelect(){
    var out='<select id=\"web3d_plugins\">';
    out+='<option value="s">Select..</option>';
    for (var n=0;n<plugins.length;n++) {
        out+='<option value="'+n+'">'+plugins[n].toString()+'</option>';
    }
    out+='</select>';
    return out;
}


//  Funzione che mi setta il background della canvas. Ci servirà utile al fine di prendere i vari slice del DICOM
function setBackground(i) {
    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img, 0, 0, backgrounds[i].getWidth(), backgrounds[i].getHeight());
    }
    img.src = backgrounds[i].getImg();
}

//Serve a caricare
function loadGeneralConf(){
    web3d_ide.find('img').each(function(){
        var slice=new Slice();
        slice.setImg($(this).attr('src'));
        slice.setHeight($(this).attr('width'));
        slice.setWidth($(this).attr('height'));
        backgrounds.push(slice);
    })
}

function getNumberPoints(){
    return n_points;
}

getWeb3d();

function getLastPoint(){
    var cur_set=cur_plugin.getCurSet();
    return cur_set[cur_set.length-1];
}


function eventsManager(){
    $('.actions').live('click',function(){
        cur_action=$(this).val();
    });

    $("#web3d_plugins").live("change",function(){
        if ($(this).val()!='s'){
            cur_plugin=plugins[$(this).val()];
            $(this).find("option[value=s]").remove();
        }
    });

    canvas.live('mousedown', function(event) {
        switch (event.which) {
            case 1:
                leftClick(event);
                break;
            case 2:
                middleClick(event);
                break;
            case 3:
                rightClick(event);
                break;
            default:
                alert('You have a strange mouse');
        }
    });

    canvas.live('dblclick', function(event) {
        if (cur_plugin){
            if (cur_action=='draw') {
                if (!cur_plugin.addPoint(new Point(event.offsetX , event.offsetY,cur_z))){
                    alert("No more points for this tool.");
                }else{
                    cur_plugin.endSet();
                }
            }
        }
    });
}

function leftClick(event){
    if (cur_plugin){
        if (cur_action=='draw') {
            if (!cur_plugin.addPoint(new Point(event.offsetX , event.offsetY,cur_z))){
                alert("No more points for this tool.");
            }
        }
    }
}

function rightClick(event){

}

function middleClick(event){

}

function drawAll(){
    ctx.clearRect(0, 0, canvas.width,canvas.height);
    for (var n=0;n<plugins.length;n++){
        plugins[n].draw();
    }
    for (var n=0;n<points[cur_z].length;n++){
        points[cur_z][n].draw();
    }
}

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};


