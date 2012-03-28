function runJavascript(file){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = file;
    head.appendChild(script);
}