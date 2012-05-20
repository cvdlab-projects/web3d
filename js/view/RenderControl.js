

var renderItem;

function init3D()
{

	$('#web3d-ide-canvas').css("display","none");
	
	
	renderItem = new RenderControl('web3d-ide-container',1024,768,  sliceSize);
    animate();
}

function Release3D()
{
	$('#web3d-ide-canvas').css("display","none");
	renderItem=null;
}

function RenderControl(tagName,width,height, size) {

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
	
	this.renderer = new THREE.WebGLRenderer({
		antialias: false,
		canvas: document.createElement( 'canvas' ),
		clearColor: backgroundColor,
		clearAlpha: 1,
		maxLights: 1,
		stencil: true,
		preserveDrawingBuffer: false
	});
	
    this.renderer.setSize(width, height);
    this.trackball = new THREE.TrackballControls(this.camera, this.renderer.domElement);
	
    
    tag.appendChild(this.renderer.domElement);

	for(i=0;i<3;i++)
	{
		var polylines = plugins[i].getAllSets();
	
		if (polylines != null)
			this.SetShape(polylines, size);
	}	
		
	cx=this.curX/this.totP;
	cy=this.curY/this.totP;
	
	this.trackball.target.set( cx, cy, 0 );

}

RenderControl.prototype.SetShape = function (polylines, size) {
    var i;
	var j;
    for (i = 0; i < polylines.size(); i++) {
		var cur=polylines.get(i);
		if(cur!=null)
		{
			for(j = 0; j < cur.length;j++)
			{
				this.AddStrato(cur[j], i * size, size,i);
			}
		}
    }
	
	
}

RenderControl.prototype.AddStrato = function (points, z, size,level) {

	
	if(points==null || points.length==0)
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

	var solid = new THREE.ExtrudeGeometry(shapes, { amount: size, bevelEnabled: false, 
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
    
    this.trackball.update();
	this.renderer.render(this.scene, this.camera,null,true);
}
