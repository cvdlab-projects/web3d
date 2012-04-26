function Polyline(){
    this.sets=new Array();
    this.sets.push(new Array());
    this.cur=this.sets[0];
    this.curId=0;
}

Polyline.prototype.addPoint=function(point){
    var tmp=this.cur;
    tmp.push(point);

    if (this.isValidSet(tmp)){
        points[cur_z].push(point);
        this.cur.push(point);
        drawAll();
        return true;
    }else{
        return false;
    }

}

Polyline.prototype.getCurSet=function(){
    return this.cur;
}

Polyline.prototype.getCurSetId=function(){
    return this.curId;
}

Polyline.prototype.setCurSet=function(n){
    this.curId=n;
    this.cur=this.sets[n];
}

Polyline.prototype.endSet=function(){
    var p=new Array();
    this.sets.push(p);
    this.cur=p;
    this.curId++;
}

Polyline.prototype.addSet=function(set){
    var result=this.isValidSet(set);
    if (result)
        this.sets.push(set);
    return result;
}

Polyline.prototype.removeSet=function(n){
    this.sets.remove(n);
}

Polyline.prototype.getSet=function(n){
    return this.sets[n];
}

Polyline.prototype.toString=function(){
    return "polyline";
}

Polyline.prototype.isValidSet=function(set){
    var result=true;
    //mettete qui in mezzo tutti i casi in cui il set non va bene

    //in questo caso nessun vincolo particolare sul numero di punti
    if (set.length==0)
        result=false;

    return result;
}

Polyline.prototype.draw=function(){
    var out="";
    for (var i=0;i<this.sets.length;i++){
        var tmp=this.sets[i];
        if (tmp.length>0){
            var startPoint=tmp[0];

            ctx.beginPath();
            ctx.moveTo(startPoint.getX(),startPoint.getY());

            for(var n=1;n<tmp.length;n++){
                var point=tmp[n];
                ctx.lineTo(point.getX(),point.getY());
            }
            ctx.strokeStyle = "blue";
            ctx.stroke();
        }
    }
}
