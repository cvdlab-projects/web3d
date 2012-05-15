/*
 Il plugin Polygon disegna una poligono sul set di punti definito dall'utente.
 Il set di punti è un oggetto Map dove la chiave è la slice corrente.
 Per ogni slice è possibile inserire più set di punti, cioè definire più Polygon sullo stesso livello.
 */
function Polygon(){
    this.sets=new Map();
    this.id=plugins.length;
}

/*
 Ritorna l'id dell'istanza del plugin all'interno dell'IDE.
 */
Polygon.prototype.getId=function(){
    return this.id;
}


/*
 Il metodo addPoint aggiunge un punto al set corrente, definito come l'ultimo utilizzato dall'utente.
 Prima di inserire un punto viene verificata la compatibilità geometrica del nuovo set con questo plugin.
 */
Polygon.prototype.addPoint=function(point){

    this.getCurSet().push(point);

    if (this.isValidSet(this.getCurSet())){
        return true;
    }else{
        this.getCurSet().pop();
        return false;
    }

}

/*
 Il metodo removePoint elimina dal set corrente il punto selezionato dall'utente.
 */
Polygon.prototype.removePoint=function(n){
//se il punto è un estremo
    if (n==this.getCurSet().length){
        this.removeLast();
    }else{
        //se il punto è in una posizione qualsiasi del set di punti, si elimina il punto e si ricongiunge la linea
        var tmp1=this.getCurSet().slice(0,n);
        var tmp2=this.getCurSet().slice(n+1);
        this.sets.get(cur_z)[this.sets.get(cur_z).length-1]=tmp1.concat(tmp2);
    }
}

/*
 Il metodo getCurSet restituisce il set corrente di punti, cioè l'ultima poligono modificata.
 */
Polygon.prototype.getCurSet=function(){
    if (!this.sets.get(cur_z)){
        this.sets.put(cur_z,new Array());
        this.sets.get(cur_z).push(new Array());
        return this.sets.get(cur_z)[0];
    }

    return this.sets.get(cur_z)[this.sets.get(cur_z).length-1];
}

Polygon.prototype.removeLast=function(){
    this.getCurSet().pop();
}

/*
 Il metodo setCurSet imposta come corrente il set n della slice attuale.
 Il parametro n viene fornito dalla vista al click dell'utente.
 Il set corrente è sempre l'ultimo nella lista.
 */

Polygon.prototype.setCurSet=function(n){
    var tmp=this.sets.get(cur_z)[n];
    this.sets.get(cur_z)[n]=this.sets.get(cur_z)[this.sets.get(cur_z).length-1];
    this.sets.get(cur_z)[this.sets.get(cur_z).length-1]=tmp;
}

/*
 Il metodo endSet permette all'utente di specificare quando un disegno è finito.
 */
Polygon.prototype.endSet=function(){
    var p=new Array();
    this.sets.get(cur_z).push(p);
}

/*
 Il metodo addSet viene utilizzato per aggiungere set completi, anche provenienti da altri plugin.
 */
Polygon.prototype.addSet=function(set,z){
    var result=this.isValidSet(set);
    if (result)
        this.sets.get(z).push(set);
    return result;
}

/*
 Elimina il set corrente.
 */
Polygon.prototype.removeCurSet=function(){
    this.sets.get(cur_z).pop();
}

/*
 Elimina il set corrente.
 */
Polyline.prototype.removeCurSet=function(){
    this.sets.get(cur_z).pop();
}

/*
 Elimina il set n dalla slice corrente, cioè cancella la figura n.
 */
Polygon.prototype.removeSet=function(n){
    this.sets.get(cur_z).remove(n);
}

/*
 Restituisce il set corrente.
 */
Polygon.prototype.getSet=function(n){
    return this.sets.get(cur_z)[n];
}

/*
 Restituisce tutti i set presenti sulla slice corrente.
 */
Polygon.prototype.getSets=function(){
    return this.sets.get(cur_z);
}

/*
 Restituisce tutti i set presenti di tutte le slice.
 */
Polygon.prototype.getAllSets=function(){
    return this.sets.get;
}

/*
 Restituisce il tipo del plugin
 */
Polygon.prototype.toString=function(){
    return "Polygon";
}
/*
 verifica se il set di punti fornito dall'utente è compatibile con il disegno da tracciare.
 Es: Un quadrato non può avere un set di più di quattro punti.
 */
Polygon.prototype.isValidSet=function(set){
    var result=true;
    //mettete qui in mezzo tutti i casi in cui il set non va bene

    //in questo caso nessun vincolo particolare sul numero di punti
    if (set.length==0)
        result=false;

    return result;
}

/*
 Il metodo draw disegna tutte le figure appartenenti al plugin nella slice corrente.
 */
Polygon.prototype.draw=function(){
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
            ctx.strokeStyle = lineColor;
            ctx.closePath();
            ctx.stroke();
        }
    }
}
