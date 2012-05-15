/*
Gestisce le variazioni della canvas in seguito ai comandi dell'utente:
-zoom
-drag
-scroll
 */
//var gkhead = new Image;
//var ball   = new Image;
var offset_x=0;
var offset_y=0;
window.onload = function(){
    trackTransforms(ctx);

    var lastX=canvas.width/2, lastY=canvas.height/2;
    var dragStart,dragged;

    canvas.bind('mousedown',function(evt){
        if (cur_action=='drag'){
            document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
            lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
            lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
            dragStart = ctx.transformedPoint(lastX,lastY);
            dragged = false;
        }
    });
/*
Effettua il drag di tutta la canvas all'interno di un div con overflow nascosto. Consente di lavorare su una superficie
molto ampia e scrollabile.
Si preserva l'allineamento tra la posizione del cursore e le coordinate della canvas, grazie al metodo transformedPoint.
 */
    canvas.bind('mousemove',function(evt){
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragged = true;
        if (dragStart){
            var pt = ctx.transformedPoint(lastX,lastY);
            offset_x=pt.x-dragStart.x;
            offset_y=pt.y-dragStart.y;
            ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
            drawAll();
        }
    });
    canvas.bind('mouseup',function(evt){
        dragStart = null;
    });

    //Se esci fuori dalla canvas mentre trascini, il trascinamento finisce
    $(document).bind('mouseup',function(evt){
        dragStart = null;
    });
/*
Zoom
Lo zoom viene effettuato allo scroll del mouse su tutta la canvas e sugli oggetti su di essa presenti.
Viene mantenuto lo stesso livello di zoom fra gli oggetti disegnati, evitando disallineamenti fra questi e l'immagine dicom.
Si è prestata attenzione a non ingrandire lo spessore delle linee e dei punti all'aumentare dello zoom.
 */

    var scaleFactor = 1.1;
    var zoom = function(clicks){
        var pt = ctx.transformedPoint(lastX,lastY);
        ctx.translate(pt.x,pt.y);
        var factor = Math.pow(scaleFactor,clicks);
        linewidth=linewidth/factor;
        ctx.scale(factor,factor);
        ctx.translate(-pt.x,-pt.y);
        drawAll();
    }

    var handleScroll=function(evt) {
        var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
        if (delta) zoom(delta);
        return evt.preventDefault() && false;
    }
    document.getElementById('web3d-ide-canvas').addEventListener('DOMMouseScroll',handleScroll,false);
    document.getElementById('web3d-ide-canvas').addEventListener('mousewheel',handleScroll,false);

};
gkhead.src = 'http://phrogz.net/tmp/gkhead.jpg';
ball.src   = 'http://phrogz.net/tmp/alphaball.png';


// Adds ctx.getTransform() - returns an SVGMatrix
// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
function trackTransforms(ctx){
    var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function(){ return xform; };

    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function(){
        savedTransforms.push(xform.translate(0,0));
        return save.call(ctx);
    };
    var restore = ctx.restore;
    ctx.restore = function(){
        xform = savedTransforms.pop();
        return restore.call(ctx);
    };

    var scale = ctx.scale;
    ctx.scale = function(sx,sy){
        xform = xform.scaleNonUniform(sx,sy);
        return scale.call(ctx,sx,sy);
    };
    var rotate = ctx.rotate;
    ctx.rotate = function(radians){
        xform = xform.rotate(radians*180/Math.PI);
        return rotate.call(ctx,radians);
    };
    var translate = ctx.translate;
    ctx.translate = function(dx,dy){
        xform = xform.translate(dx,dy);
        return translate.call(ctx,dx,dy);
    };
    var transform = ctx.transform;
    ctx.transform = function(a,b,c,d,e,f){
        var m2 = svg.createSVGMatrix();
        m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
        xform = xform.multiply(m2);
        return transform.call(ctx,a,b,c,d,e,f);
    };
    var setTransform = ctx.setTransform;
    ctx.setTransform = function(a,b,c,d,e,f){
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx,a,b,c,d,e,f);
    };
    var pt  = svg.createSVGPoint();
    ctx.transformedPoint = function(x,y){
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
    }
}

/*
Permette di selezionare un oggetto disegnato sulla canvas solo in base alla posizione dichiarata nel modello.
 Si possono effettuare operazioni di drag e drop selezionando con il puntatore del mouse le figure nella canvas,
 senza ricorrere alla rappresentazione con elementi HTML.
 */
function selectPoint(x,y){
    var d=3;
    for (var n=0;n<plugins.length;n++){
        var tmp=plugins[n].getSets();
        for (var i=0;i<tmp.length;i++){
            var tmp2=tmp[i];
            var m=ctx.transformedPoint(x,y);
            for (var z=0;z<tmp2.length;z++){
                var p=tmp2[z];
                if ((m.x>=p.getX()-d && m.x<=p.getX()+d)&&(m.y>=p.getY()-d && m.y<=p.getY()+d)){
                    selected_point=p;
                    plugins[n].setCurSet(i);
                    drag=true;
                }
            }
        }
    }
}
/*
Come il metodo precedente, per l'operazione di cancellazione.
 */
function deletePoint(x,y){
    var d=3;
    for (var n=0;n<plugins.length;n++){
        var tmp=plugins[n].getSets();
        for (var i=0;i<tmp.length;i++){
            var tmp2=tmp[i];
            var m=ctx.transformedPoint(x,y);
            for (var z=0;z<tmp2.length;z++){
                var p=tmp2[z];
                if ((m.x>=p.getX()-d && m.x<=p.getX()+d)&&(m.y>=p.getY()-d && m.y<=p.getY()+d)){
                    plugins[n].setCurSet(i);
                    plugins[n].removePoint(z);
                    drawAll();
                }
            }
        }
    }
}

/*
function selectPoint(x,y){
    var tmp2=points[cur_z];
    for (var z=0;z<tmp2.length;z++){
        var p=tmp2[z];
        var m=ctx.transformedPoint(x,y);
        if ((m.x>=p.getX()-2 && m.x<=p.getX()+2)&&(m.y>=p.getY()-2 && m.y<=p.getY()+2)){
            alert("dentro"+z);
            selected_point=p;
        }
    }

}
    */