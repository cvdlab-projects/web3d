var web3d_ide;
var canvas;
var form;
var plugin;

function getWeb3d(container,plugins){
    web3d_ide=$(container);
    web3d_ide.addClass('web3d-ide');
    web3d_ide.html("<div style=\"width:80%;height:100%;float:left;\">" +
        "<canvas style=\"width:100%;height:100%\"></canvas></div>" +
        "<div id=\"form-div\" style=\"width:20%;height:100%;float:right;\"></div>");

    canvas=web3d_ide.find("div canvas");
    form=web3d_ide.find('#form-div');
    form.html(getPluginSelect(plugins));
    form.find("#web3d_plugins").live("change",changePlugin());
};


function getPluginSelect(plugins){
    var out='<select id=\"web3d_plugins\">';
    out+='<option value="0">Select..</option>';
    for (var n=0;n<plugins.length;n++) {
        out+='<option value="'+plugins[n]+'">'+plugins[n]+'</option>';
    }
    out+='</select>';
    return out;
}

function changePlugin(){
    var element=$("#web3d_plugins");
    //if (element.val()!=0){
        plugin=element.val();
        alert(plugin);
        //element.find("option[value=0]").remove();
    //}
}