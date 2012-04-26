function Point(x,y,z){
    this.x=x;
    this.y=y;
    this.z=z;
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

Point.prototype.draw=function(){
    ctx.beginPath();
    ctx.arc(this.x,this.y, 3, 0, 2*Math.PI, true);
    ctx.strokeStyle = "red";
    ctx.stroke();
}
