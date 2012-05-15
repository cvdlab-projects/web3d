function Polygon(){
    this.sets=new Array();
}

Polygon.prototype.addSet=function(set){
    var result=this.isValidSet(set);
    if (result)
        this.sets.push(set);
    return result;
}

Polygon.prototype.getSet=function(n){
    return this.sets[n];
}

Polygon.prototype.toString=function(){
    return "polyline";
}

Polygon.prototype.isValidSet=function(set){
    var result=true;
    //mettete qui in mezzo tutti i casi in cui il set non va bene

    //in questo caso nessun vincolo particolare sul numero di punti
    if (set.length==0)
        result=false;

    return result;
}

Polygon.prototype.draw=function(ctx){
    $.each(this.sets,function(){
        ctx.beginPath();
        var startPoint=$(this).first();
        ctx.moveTo(startPoint.getX(),startPoint.getY());
        for(var n=1;n<$(this).length;n++){
           var point=$(this)[n];
           ctx.lineTo(point.getX(),point.getY());
        }
        ctx.closePath();
    });
}
