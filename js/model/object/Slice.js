//costruttore Slice
function Slice(){
    this.img=null;
    this.width=0;
    this.height=0;
    this.bytecode;
}

//setter
Slice.prototype.setImg=function(file){
    this.img=file;
}

Slice.prototype.setWidth=function(width){
    this.width=width;
}

Slice.prototype.setHeight=function(height){
    this.height=height;
}

//getter
Slice.prototype.getImg=function(){
    return this.img;
}

Slice.prototype.getWidth=function(){
    return this.width;
}

Slice.prototype.getHeight=function(){
    return this.height;
}

Slice.prototype.getBytecode=function(){
    return this.bytecode;
}

Slice.prototype.setBytecode=function(b){
    this.bytecode=b;
}