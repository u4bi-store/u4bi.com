app.controller('escape-game', EscapeController);

function EscapeController($scope){

  var container;
  var camera, scene, renderer ;
  var geometry, material, mesh;

  var info = {
    isMouseClick : false,
    mouseDownX : 0,
    mouseDownY : 0,
    mouseDownLon : 0,
    mouseDownLat : 0,
    pointerDownX : 0,
    pointerDownY : 0,
    pointerDownLon : 0,
    pointerDownLat : 0,
    lon : 0,
    lat : 0,
    phi : 0,
    theta : 0
  };

  init();
  render();

  function init(){
    container = document.getElementById('escape-container');
    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, (window.innerHeight-70));
    container.appendChild(renderer.domElement);
    
    camera = new THREE.PerspectiveCamera(75, container.offsetWidth/(window.innerHeight-70), 1, 1100);
    camera.target = new THREE.Vector3(0,0,0);
    scene = new THREE.Scene();

    geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    
    var ran = Math.floor(Math.random() * 5);
    console.log(ran);
    var material_data = { map : new THREE.TextureLoader().load('images/escape/area_'+ran+'.jpg')};
    material = new THREE.MeshBasicMaterial(material_data);
    mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    document.addEventListener('mousedown', mouseDown, false);
    document.addEventListener('mousemove', mouseMove,false);
    document.addEventListener('mouseup', mouseUp,false);
    container.addEventListener('wheel', mouseWheel,false);
    window.addEventListener('resize', windowResize,false);
  }

  function windowResize(){
    camera.aspect = container.offsetWidth/(window.innerHeight-70);
    camera.updateProjectionMatrix();

    renderer.setSize(container.offsetWidth, (window.innerHeight-70));
  }

  function mouseWheel(e){
    e.preventDefault();
    camera.fov += e.deltaY * 0.05;
    camera.updateProjectionMatrix();
  }
  function mouseUp(e){
    info.isMouseClick = false;
  }
  function mouseMove(e){
    if(!info.isMouseClick) return;

    info.lon = ( info.pointerDownX - e.clientX ) * 0.1 + info.pointerDownLon;
    info.lat = ( e.clientY - info.pointerDownY ) * 0.1 + info.pointerDownLat;
  }
  function mouseDown(e){
    e.preventDefault();
    info.isMouseClick = true;

    info.pointerDownX = e.clientX;
    info.pointerDownY = e.clientY;

    info.pointerDownLon = info.lon;
    info.pointerDownLat = info.lat;
  }

  function render(){
    requestAnimationFrame(render);

    if(info.isMouseClick === false) info.lon += 0.1;

    
    info.lat = Math.max(-85, Math.min(85, info.lat));
    info.phi = THREE.Math.degToRad(90-info.lat);
    info.theta = THREE.Math.degToRad(info.lon);
    camera.target.x = 500 * Math.sin(info.phi) * Math.cos(info.theta);
    camera.target.y = 500 * Math.cos(info.phi);
    camera.target.z = 500 * Math.sin(info.phi) * Math.sin(info.theta);
    camera.lookAt(camera.target);

    renderer.render(scene, camera);
  }

}