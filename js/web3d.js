/*
 Il metodo getWeb3d inizializza l'IDE.
 Ricava gli elementi HTML da popolare.
 Carica i parametri di configurazione.
 Aggiunge i comandi di default all'IDE per l'interazione utente.
 Imposta la slice di partenza.
 Inizializza il gestore degli eventi.
 */

function getWeb3d(){
    web3d_ide=$("#web3d-ide");
    canvas=web3d_ide.find("#web3d-ide-canvas");
    canvas.width = 1024;
    canvas.height = 768;
    form=web3d_ide.find('#form-div');
    ctx= canvas[0].getContext("2d");
    el_contrast=$('#contrast');
    el_brightness=$('#brightness');

    loadGeneralConf();
    form.prepend(getPluginSelect());
    scale = 1;

    setBackground(cur_z);
    eventsManager();
}

/*
 Il metodo getPluginSelect posiziona i pulsanti di input nell'IDE per la selezione del plug-in.
 */
function getPluginSelect(){
    var out='Select plugin: <select id=\"web3d_plugins\">';
    out+='<option value="s">Select..</option>';
    for (var n=0;n<plugins.length;n++) {
        out+='<option value="'+n+'">'+plugins[n].toString()+'</option>';
    }
    out+='</select>';
    return out;
}


/*
 Il metodo setBackground consente di selezionare la slice i richiesta dall'utente.
 Posiziona nella canvas l'immagine DICOM caricata.
 */
function setBackground(i) {
    clearCanvas();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    linewidth=1;
    if (backgrounds[i].getBytecode()){
        ctx.drawImage(backgrounds[i].getBytecode(), 0, 0, backgrounds[i].getWidth(), backgrounds[i].getHeight());
    }else{
        backgrounds[i].setBytecode(new Image());
        backgrounds[i].getBytecode().onload = function(){
            backgrounds[i].setWidth(this.width);
            backgrounds[i].setHeight(this.height);
            ctx.drawImage(backgrounds[i].getBytecode(), 0, 0, backgrounds[i].getWidth(), backgrounds[i].getHeight());
        }
        backgrounds[i].getBytecode().src = backgrounds[i].getImg();
    }
    $('#web3d-comment').val(backgrounds[i].getComment());
}

/*
 Il metodo loadGeneralConf consente di leggere e inizializzare i parametri di configurazione della slice corrente.
 */
function loadGeneralConf(){
    var dicom=getParameterByName('dicom');
    var num=parseInt(getParameterByName('frames'));
    if (!dicom || dicom=="")
        alert('File dicom non selezionato');
    else{
        for (var i=0;i<num;i++){
            var url=url_dicom+"dicom_png.php?file="+dicom+"&frame="+(i+1);
            var slice=new Slice();
            slice.setImg(url);
            backgrounds.push(slice);
        }

    }
    /*
     web3d_ide.find('img').each(function(){
     var slice=new Slice();
     slice.setImg($(this).attr('src'));
     slice.setHeight($(this).attr('width'));
     slice.setWidth($(this).attr('height'));
     backgrounds.push(slice);
     })
     */
}

function getParameterByName(name) {

    var match = RegExp('[?&]' + name + '=([^&]*)')
        .exec(window.location.search);

    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));

}

getWeb3d();
/*
 Il metodo eventsManager gestisce tutti gli eventi di interazione dell'utente per le seguenti operazioni:
 -color picking
 -draw
 -selezione del plugin
 -selezione e cancellazione di punti
 -selezione e modifica di set di punti
 -drag and drop di punti

 */
function eventsManager(){
    $('.actions').live('click',function(){
        cur_action=$(this).val();
        if (cur_action=='drag'||cur_action=='edit')
            canvas.css('cursor', 'pointer');
        else if (cur_action=='draw' && cur_plugin){
            $('#web3d_plugins').val(cur_plugin.getId());
            canvas.css('cursor', 'crosshair');
        }else
            canvas.css('cursor', 'auto');
        drawAll();
    });

    $('#lineColor').live('change',function(){
        lineColor=$(this).val();
        drawAll();
    });

    $('#web3d-comment').live('change',function(){
        backgrounds[cur_z].setComment($(this).val());
    });

    $('#pointColor').live('change',function(){
        pointColor=$(this).val();
        drawAll();
    });

    $('.selectFrame').live('click',function(){
        cur_z=cur_z+parseInt($(this).val());
        $('#curFrame').val(cur_z);
        $('.selectFrame').removeAttr("disabled", "disabled");
        if (cur_z==0)
            $(this).attr("disabled", "disabled");

        if (cur_z==backgrounds.length-1)
            $(this).attr("disabled", "disabled");

        setBackground(cur_z);
        drawAll();
    });
    $('.inpsel').live('click',function(){
        var el=$(this).parent().find('input[type=text]');
        el.val(parseInt(el.val())+parseInt($(this).val()));
    });

    $("#web3d_plugins").live("change",function(){
        if ($(this).val()!='s'){
            var old_plugin=cur_plugin;
            var new_plugin=plugins[$(this).val()];
            cur_plugin=new_plugin;
            $(this).find("option[value=s]").remove();

            if (old_plugin){
                if (cur_action=='draw'){
                    old_plugin.endSet();
                }else if (cur_action=='edit'){
                    var set=old_plugin.getCurSet();
                    old_plugin.removeCurSet();
                    new_plugin.addSet(set,cur_z);
                }
            }
            drawAll();
        }
    });

    canvas.live('mouseup',function(event){
        drag=false;
        paint=false;
    });

    canvas.live('mousemove',function(event){
        if (paint==true && cur_action=='draw' && cur_plugin){
            var p = ctx.transformedPoint(event.offsetX , event.offsetY);
            cur_plugin.mouseMove(p.x,p.y);
        }

        if (drag==true && cur_action=='edit'){
            var p = ctx.transformedPoint(event.offsetX , event.offsetY);
            selected_point.setX(p.x);
            selected_point.setY(p.y);
            drawAll();
        }
    });

// gestione dei tasti del mouse
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
                cur_plugin.removeLast();
                cur_plugin.endSet();
            }
        }
    });
}
/*
 leftClick gestisce tutti gli eventi scatenati dal click sinistro del mouse sulla canvas.
 A seconda dell'azione selezionata potremo inserire selezionare o cancellare punti.
 */
function leftClick(event){
    if (cur_plugin){
        if (cur_action=='draw') {
            paint=true;
            var pt=ctx.transformedPoint(event.offsetX , event.offsetY);
            var inserted=cur_plugin.addPoint(new Point(pt.x,pt.y,cur_z));
            if (!inserted){
                alert("No more points for this tool.");
            }else
                drawAll();
        }
        if (cur_action=='delete') {
            deletePoint(event.offsetX , event.offsetY);
        }
    }
    if (cur_action=='edit') {
        selectPoint(event.offsetX , event.offsetY);
    }
}

function middleClick(event){

}

function rightClick(event){

}

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
