/*
 Il plugin Polyline disegna una polilinea sul set di punti definito dall'utente.
 Il set di punti è un oggetto Map dove la chiave è la slice corrente.
 Per ogni slice è possibile inserire più set di punti, cioè definire più polyline sullo stesso livello.
 */
function Polyline(){
    this.name="Polyline";
    this.sets=new Map();
    this.id=plugins.length;
}

/*
 Il metodo addPoint aggiunge un punto al set corrente, definito come l'ultimo utilizzato dall'utente.
 Prima di inserire un punto viene verificata la compatibilità geometrica del nuovo set con il plug-in.
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
 Questo metodo gestisce, solo se necessario, l'azione da intraprendere in caso di movimento del mouse in fase di draw.
 Permette, ad esempio, di specificare l'azione da svolgere in caso si verifichino gli eventi click e mousemove contemporaneamente.
 */
Polyline.prototype.mouseMove=function(x,y){
    return false;
}

/*
 Il metodo removePoint elimina dal set corrente il punto numero n.
 Il parametro n viene fornito dalla cooperazione di vista e controller al click dell'utente
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
 Il metodo getCurSet restituisce il set corrente di punti, cioè l'ultimo set selezionato.
 */
Polyline.prototype.getCurSet=function(){
    if (!this.sets.get(cur_z)){
        this.sets.put(cur_z,new Array());
        this.sets.get(cur_z).push(new Array());
        return this.sets.get(cur_z)[0];
    }

    return this.sets.get(cur_z)[this.sets.get(cur_z).length-1];
}

/*
 Elimina l'ultimo punto inserito.
 */
Polyline.prototype.removeLast=function(){
    this.getCurSet().pop();
}

/*
 Il metodo setCurSet imposta come corrente il set n della slice attuale.
 Il parametro n viene fornito dalla cooperazione di vista e controller al click dell'utente.
 Il set corrente è sempre l'ultimo nella lista dei set della slice corrente.
 */
Polyline.prototype.setCurSet=function(n){
    var tmp=this.sets.get(cur_z)[n];
    this.sets.get(cur_z)[n]=this.sets.get(cur_z)[this.sets.get(cur_z).length-1];
    this.sets.get(cur_z)[this.sets.get(cur_z).length-1]=tmp;
}

/*
 Il metodo endSet permette di specificare quando un disegno è finito.
 */
Polyline.prototype.endSet=function(){
    if (!this.getCurSet() || this.getCurSet().length>0){
        var p=new Array();
        this.sets.get(cur_z).push(p);
    }
}

/*
 Il metodo addSet viene utilizzato per aggiungere set completi, anche provenienti da altri plugin, alla slice z, dopo aver effettuato un controllo di compatibilità.
 */
Polyline.prototype.addSet=function(set,z,force){
    var result=this.isValidSet(set);
    if (result || force){
        if (!this.sets.get(z)){
            this.sets.put(z,new Array());
        }
        this.sets.get(z).push(set);
    }
    return result;
}

/*
 Elimina il set n dalla slice corrente, cioè cancella la figura n.
 Il parametro n viene fornito dalla cooperazione di vista e controller al click dell'utente.
 */
Polyline.prototype.removeSet=function(n){
    this.sets.get(cur_z).remove(n);
}

/*
 Ritorna l'id univoco dell'istanza del plugin all'interno dell'IDE.
 */
Polyline.prototype.getId=function(){
    return this.id;
}

/*
 Elimina il set corrente, ovvero l'ultima figura selezionata.
 */
Polyline.prototype.removeCurSet=function(){
    this.sets.get(cur_z).pop();
}

/*
 Restituisce il set n della slice corrente.
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
    return this.sets;
}

/*
 Restituisce il nome del plugin
 */
Polyline.prototype.toString=function(){
    return this.name;
}

/*
 Verifica se il set di punti fornito dall'utente è compatibile con il disegno da tracciare.
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
 Questa funzione,che restituisce true o false, decide se il plugin mostra o meno i punti tracciati.
 */
Polyline.prototype.drawPoints=function(){
    return true;
}

/*
 Il metodo draw disegna tutte le figure, appartenenti al plugin, della slice corrente.
 Il parametro booleano light, indica se il metodo deve effettuare un disegno completo (!light) o selettivo/incrementale (light==true).
 L'approccio selettivo/incrementale permette un drastico risparmio di risorse ma può essere utilizzato solo nei casi in cui la canvas mantiene dimensioni e posizione costanti.
 */
Polyline.prototype.draw=function(){
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
                this.drawed++;
            }

            ctx.strokeStyle = lineColor;
            ctx.stroke();
        }
    }
}

