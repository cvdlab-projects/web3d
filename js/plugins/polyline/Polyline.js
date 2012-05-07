function Polyline(){
    this.sets=new Map();
}

Polyline.prototype.addPoint=function(point){

    var tmp=this.getCurSet();
    tmp.push(point);

    if (this.isValidSet(tmp)){
        points[cur_z].push(point);
        this.getCurSet().push(point);
        drawAll();
        return true;
    }else{
        return false;
    }

}

Polyline.prototype.getCurSet=function(){
    if (!this.sets.get(cur_z)){
        this.sets.put(cur_z,new Array());
        this.sets.get(cur_z).push(new Array());
        return this.sets.get(cur_z)[0];
    }

    return this.sets.get(cur_z)[this.sets.get(cur_z).length-1];
}

Polyline.prototype.removeLast=function(){
    this.getCurSet().pop();
}


Polyline.prototype.setCurSet=function(n){
    var tmp=this.sets.get(cur_z)[n];
    this.sets.get(cur_z)[n]=this.sets.get(cur_z)[this.sets.get(cur_z).length-1];
    this.sets.get(cur_z)[this.sets.get(cur_z).length-1]=tmp;
}

Polyline.prototype.endSet=function(){
    var p=new Array();
    this.sets.get(cur_z).push(p);
}

Polyline.prototype.addSet=function(set){
    var result=this.isValidSet(set);
    if (result)
        this.sets.get(cur_z).push(set);
    return result;
}

Polyline.prototype.removeSet=function(n){
    this.sets.get(cur_z).remove(n);
}

Polyline.prototype.getSet=function(n){
    return this.sets.get(cur_z)[n];
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
    this.getCurSet();
    var cur=this.sets.get(cur_z);
    for (var i=0;i<cur.length;i++){
        var tmp=cur[i];
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
