function Point(x,y,z){
    this.x=x;
    this.y=y;
    this.z=z;
    this.id;
    this.element;
}

Point.prototype.getX=function(){
    return this.x;
}

Point.prototype.getY=function(){
    return this.y;
}

Point.prototype.getZ=function(){
    return this.z;
}

Point.prototype.setId=function(id){
    this.id=id;
}

Point.prototype.getId=function(){
    return this.id;
}

Point.prototype.getElement=function(){
    return this.element;
}

Point.prototype.setElement=function(element){
    this.element=element;
}

Point.prototype.draw=function(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,linewidth*2, 0, 2*Math.PI, true);
    ctx.strokeStyle = "red";
    ctx.stroke();
}
