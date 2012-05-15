/*
 Il plugin Polyline disegna una polilinea sul set di punti definito dall'utente.
 Il set di punti è un oggetto Map dove la chiave è la slice corrente.
 Per ogni slice è possibile inserire più set di punti, cioè definire più polyline sullo stesso livello.
 */
function Polyline(){
    this.sets=new Map();
    this.id=plugins.length;
}

/*
 Il metodo addPoint aggiunge un punto al set corrente, definito come l'ultimo utilizzato dall'utente.
 Prima di inserire un punto viene verificata la compatibilità geometrica del nuovo set con questo plugin.
 */
Polyline.prototype.addPoint=function(point){
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
Polyline.prototype.removePoint=function(n){
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
 Il metodo getCurSet restituisce il set corrente di punti, cioè l'ultima polilinea modificata.
 */
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

/*
 Il metodo setCurSet imposta come corrente il set n della slice attuale.
 Il parametro n viene fornito dalla vista al click dell'utente.
 Il set corrente è sempre l'ultimo nella lista.
 */

Polyline.prototype.setCurSet=function(n){
    var tmp=this.sets.get(cur_z)[n];
    this.sets.get(cur_z)[n]=this.sets.get(cur_z)[this.sets.get(cur_z).length-1];
    this.sets.get(cur_z)[this.sets.get(cur_z).length-1]=tmp;
}

/*
 Il metodo endSet permette all'utente di specificare quando un disegno è finito.
 */
Polyline.prototype.endSet=function(){
    if (this.getCurSet().length>0){
        var p=new Array();
        this.sets.get(cur_z).push(p);
    }
}

/*
 Il metodo addSet viene utilizzato per aggiungere set completi, anche provenienti da altri plugin.
 */
Polyline.prototype.addSet=function(set,z){
    this.getCurSet();
    var result=this.isValidSet(set);
    if (result)
        this.sets.get(z).push(set);
    return result;
}

/*
 Elimina il set n dalla slice corrente, cioè cancella la figura n.
 */
Polyline.prototype.removeSet=function(n){
    this.sets.get(cur_z).remove(n);
}

/*
 Ritorna l'id dell'istanza del plugin all'interno dell'IDE.
 */
Polyline.prototype.getId=function(){
    return this.id;
}

/*
 Elimina il set corrente.
 */
Polyline.prototype.removeCurSet=function(){
    this.sets.get(cur_z).pop();
}

/*
 Restituisce il set corrente.
 */
Polyline.prototype.getSet=function(n){
    return this.sets.get(cur_z)[n];
}

/*
 Restituisce tutti i set presenti sulla slice corrente.
 */
Polyline.prototype.getSets=function(){
    return this.sets.get(cur_z);
}

/*
 Restituisce tutti i set presenti di tutte le slice.
 */
Polyline.prototype.getAllSets=function(){
    return this.sets.get;
}

/*
 Restituisce il tipo del plugin
 */
Polyline.prototype.toString=function(){
    return "Polyline";
}
/*
 verifica se il set di punti fornito dall'utente è compatibile con il disegno da tracciare.
 Es: Un quadrato non può avere un set di più di quattro punti.
 */
Polyline.prototype.isValidSet=function(set){
    var result=true;
    //mettete qui in mezzo tutti i casi in cui il set non va bene

    //in questo caso nessun vincolo particolare sul numero di punti
    if (set.length==0)
        result=false;

    return result;
}
/*
 Il metodo addSet viene utilizzato per aggiungere set completi, anche provenienti da altri plugin.
 */
Polyline.prototype.addSet=function(set,z){
    var result=this.isValidSet(set);
    if (result)
        this.sets.get(z).push(set);
    return result;
}


/*
 Il metodo draw disegna tutte le figure appartenenti al plugin nella slice corrente.
 */
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
            ctx.strokeStyle = lineColor;
            ctx.stroke();
        }
    }
}
