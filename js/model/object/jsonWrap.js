/**
 * Created by JetBrains WebStorm.
 * User: Max
 * Date: 17/05/12
 * Time: 0.51
 * To change this template use File | Settings | File Templates.
 */

function jsonWrap(){
    this.comments=new Array();
    for (var n=0;n<backgrounds.length;n++){
        this.comments.push(backgrounds[n].getComment());
    }
    this.plugins=plugins;
}

//non serve il prototype perchè è una funzione a se, non serve creare l'oggetto.
function jsonParser(string){
    var wrap=JSON.parse(string);
    for (var c=0;c<backgrounds.length;c++){
        var separator="";
        if (backgrounds[c].getComment().length>0)
            separator="\n";
        backgrounds[c].setComment(backgrounds[c].getComment()+separator+wrap.comments[c]);
    }
    $('#web3d-comment').val(backgrounds[cur_z].getComment());
    var obj=wrap.plugins;
    for (var i=0;i<obj.length;i++){
        var tmp=obj[i];
        var sets=new Map();
        var name=tmp.name;

        for (var d=0;d<tmp.sets.keyArray.length;d++){
            sets.put(tmp.sets.keyArray[d],tmp.sets.valArray[d]);
        }
        for (var n=0;n<plugins.length;n++){
            if (plugins[n].toString()==name){
                for (var p=0;p<sets.size();p++){
                    var set1=sets.get(sets.keySet()[p]);
                    if (set1!=null){
                        for (var l=0;l<set1.length;l++){
                            var tmp2=new Array();
                            for (var lh=0;lh<set1[l].length;lh++){
                                tmp2.push(new Point(set1[l][lh].x,set1[l][lh].y,set1[l][lh].z));
                            }
                            plugins[n].addSet(tmp2,sets.keySet()[p]);
                            plugins[n].addSet(new Array(),sets.keySet()[p],true);
                        }
                    }
                }
            }
        }
    }
}

