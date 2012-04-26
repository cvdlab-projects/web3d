var n_points=0;
var points =new Map();
var backgrounds= new Array();


function runJavascript(file){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = file;
    head.appendChild(script);
}


function loadConf(file){
    $.ajax({
        type: "GET",
        url: file,
        dataType: "xml",
        success: xmlParser
    });
}


function xmlParser(xml){
    n_points=$(xml).find('points').text();
    $(xml).find('background').each(function(i,e){
        backgrounds.push(e.text());
    })
}

function getNumberPoints(){
    return n_points;
}

function setPoint(x,y,z){
    p=new Point(x,y,z);
    points.put(p);
    drawPoint(p);
}




/*

 function zoom(x, y, n) {
 scale += n;
 var imageData = ctx.getImageData(0, 0, width, height);
 drawContents();
 }


 function drawContents(){
 var newWidth = width * scale;
 var newHeight = height * scale;

 ctx.save();
 ctx.translate(-((newWidth-width)/2), -((newHeight-height)/2));
 ctx.scale(scale, scale);
 ctx.clearRect(0, 0, width, height);
 ctx.drawImage(copiedCanvas, 0, 0);
 ctx.restore();
 }
 */