var is3d=false;
var renderItem;
var checked=false;

function mousewheel( event )
{
    renderItem.camera.translateZ( event.wheelDeltaY);
}

function ChangeMode(mode){
    checked=mode;
    init3D();
    init3D();
}

function init3D()
{
    if (is3d)
    {
        release3D();
        $('.form-3d').hide();
        $('.form-2d').show();
    }
    else{
        is3d=true;
        $('.form-3d').show();
        $('.form-2d').hide();
        $('#web3d-ide-canvas').css("display","none");
        $('#web3d-3d-button').val("Chiudi 3D");
        renderItem = new RenderControl('web3d-ide-container',1024,768);
        animate();
    }
}

function release3D()
{
    $('#web3d-ide-canvas').css("display","inline");
    $('#web3d-3d-button').val("Apri 3D");
    is3d=false;
    renderItem=null;
    $('#canvas3D').remove();
}

function RenderControl(tagName,width,height) {

    this.camera;
    this.scene;
    this.renderer;
    this.curX=0;
    this.curY=0;
    this.totP=0;

    var trackball;
    var tag=document.getElementById(tagName);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, width / height, 1, 10000);

    var light = new THREE.PointLight( 0xFFFFFF );
    light.position.set( 1000, 0, 1000 );
    this.scene.add( light );

    this.camera.position.z = 500;
    this.camera.position.y = 0;
    this.camera.position.x = 0;
    this.scene.add(this.camera);

    backgroundColor=$('#backgroundColor').val();

    this.renderer = new THREE.WebGLRenderer({
        antialias: false,
        canvas: document.createElement( 'canvas' ),
        clearColor: '0x' + backgroundColor,
        clearAlpha: 1,
        maxLights: 1,
        stencil: true,
        preserveDrawingBuffer: false
    });

    this.renderer.domElement.setAttribute("id", "canvas3D");

    this.renderer.setSize(width, height);
    this.trackball = new THREE.TrackballControls(this.camera, this.renderer.domElement);


    tag.appendChild(this.renderer.domElement);

    for(i=0;i<3;i++)
    {
        var polylines = plugins[i].getAllSets();

        if (polylines != null)
            this.SetShape(polylines);
    }

    cx=this.curX/this.totP;
    cy=this.curY/this.totP;

    this.trackball.target.set( cx, cy, 0 );
    this.renderer.domElement.addEventListener('DOMMouseScroll', mousewheel, false);
    this.renderer.domElement.addEventListener('mousewheel', mousewheel, false);

}

RenderControl.prototype.SetShape = function (polylines) {
    var i;
    var j;
    for (i = 0; i < polylines.size(); i++) {
        var cur=polylines.get(i);
        if(cur!=null)
        {
            for(j = 0; j < cur.length;j++)
            {
                if (checked)
                    this.AddLayer(cur[j], i * sliceSize);
                else
                    this.AddStrato(cur[j], i * sliceSize,i);

            }
        }
    }


}

RenderControl.prototype.AddLayer=function(points,z)
{
    if(points==null || points.length<3)
        return;


    var path = new THREE.Geometry();

    var i;
    for(i=0;i<points.length-1;i++)
    {
        var v1 = new THREE.Vector3(points[i].getX(),points[i].getY(),0);
        var v2 = new THREE.Vector3(points[i+1].getX(),points[i+1].getY(),0);
        var v4 = new THREE.Vector3(points[i].getX(),points[i].getY(),sliceSize);
        var v3 = new THREE.Vector3(points[i+1].getX(),points[i+1].getY(),sliceSize);

        path.vertices.push(v1);
        path.vertices.push(v2);
        path.vertices.push(v3);
        path.vertices.push(v4);

        path.faces.push( new THREE.Face4( i*4+0, i*4+1, i*4+2,i*4+3 ) );
    }

    i=points.length-1;
    var v1 = new THREE.Vector3(points[i].getX(),points[i].getY(),0);
    var v2 = new THREE.Vector3(points[0].getX(),points[0].getY(),0);
    var v4 = new THREE.Vector3(points[i].getX(),points[i].getY(),sliceSize);
    var v3 = new THREE.Vector3(points[0].getX(),points[0].getY(),sliceSize);

    path.vertices.push(v1);
    path.vertices.push(v2);
    path.vertices.push(v3);
    path.vertices.push(v4);

    path.faces.push( new THREE.Face4( i*4+0, i*4+1, i*4+2,i*4+3 ) );


    for(i=0;i<points.length;i++)
    {
        this.curX+=points[i].getX();
        this.curY+=points[i].getY();
        this.totP++;
    }

    var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    path.computeFaceNormals();


    var mesh = new THREE.Mesh( path, material );
    mesh.position.z = z;
    mesh.doubleSided=true;
    this.scene.add(mesh);

}

RenderControl.prototype.AddStrato = function (points, z,level) {
    if(points==null || points.length<3)
        return;

    var texture = THREE.ImageUtils.loadTexture(backgrounds[level].getImg());

    var wx = backgrounds[level].getWidth();
    var wy = backgrounds[level].getHeight();


    var material = new THREE.MeshBasicMaterial({map: texture});
    material.map.needsUpdate = true;

    var path = new THREE.Path();


    path.moveTo(points[0].getX(), points[0].getY());
    var i;
    for (i = 1; i < points.length; i++) {

        path.lineTo(points[i].getX(), points[i].getY());

    }
    path.lineTo(points[0].getX(), points[0].getY());


    for(i=0;i<points.length;i++)
    {
        this.curX+=points[i].getX();
        this.curY+=points[i].getY();
        this.totP++;
    }
    var shapes = path.toShapes();

    var solid = new THREE.ExtrudeGeometry(shapes, { amount: sliceSize, bevelEnabled: false,
        extrudeMaterial: 0,
        material: 1
    });

    for(i=0;i<solid.faces.length;i++)
    {
        var v1 = solid.vertices[solid.faces[i].a];
        var v2 = solid.vertices[solid.faces[i].b];
        var v3 = solid.vertices[solid.faces[i].c];
        solid.faceVertexUvs[0][i][0]=	new THREE.UV(v1.x/wx,v1.y/wy);
        solid.faceVertexUvs[0][i][1]=	new THREE.UV(v2.x/wx,v2.y/wy);
        solid.faceVertexUvs[0][i][2]=	new THREE.UV(v3.x/wx,v3.y/wy);
    }



    solid.computeCentroids();
    solid.computeFaceNormals();
    solid.computeVertexNormals();

    var mesh = new THREE.Mesh(solid, material);
    mesh.position.z = z;
    this.scene.add(mesh);



}




function animate() {

    requestAnimationFrame(this.animate);
    renderItem.render();
}

RenderControl.prototype.render = function () {
    this.renderer.setClearColorHex('0x' + backgroundColor, 1);
    this.trackball.update();
    this.renderer.render(this.scene, this.camera,null,true);
}