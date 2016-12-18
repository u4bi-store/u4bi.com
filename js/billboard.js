if (!Detector.webgl)Detector.addGetWebGLMessage();
var container;
var camera, scene, renderer;
var geometry, sprite, material, particles;

var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
render();

function init(){
  container = document.getElementById('container');
  renderer = new THREE.WebGLRenderer();
  // renderer.setClearColor( 0xffffff );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth-window.innerWidth/8.5, window.innerHeight);
  container.appendChild(renderer.domElement);
  
  camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 2, 2000);
  camera.position.z = 1000;
  
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.001);
  geometry = new THREE.Geometry();
  sprite = new THREE.TextureLoader().load('images/nev.png');
  
  for(i = 0; i< 10000; i++){
    var vertext = new THREE.Vector3();
    vertext.x = 2000 * Math.random() -1000;
    vertext.y = 2000 * Math.random() -1000;
    vertext.z = 2000 * Math.random() -1000;
    
    geometry.vertices.push(vertext);
  }
  
  var meterial_data = {
    size: 35,
    sizeAttenuation: false,
    map: sprite,
    alphaTest: 0.5,
    transparent: true
  };
  material = new THREE.PointsMaterial(meterial_data);
  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  document.addEventListener( 'mousemove', mouseMove, false );
  document.addEventListener( 'touchstart', touchStart, false );
  document.addEventListener( 'touchmove', touchMove, false );
  window.addEventListener( 'resize', resizeWindow, false );
}

function mouseMove(e){
  mouseX = e.clientX - windowHalfX;
  mouseY = e.clientY - windowHalfY;
}
function touchStart(e){
  if(e.touches.length != 1) return;  
  event.preventDefault();
  mouseX = event.touches[0].pageX - windowHalfX;
  mouseY = event.touches[0].pageY - windowHalfY;

}
function touchMove(e){
  if(e.touches.length != 1) return;  
  event.preventDefault();
  mouseX = event.touches[0].pageX - windowHalfX;
  mouseY = event.touches[0].pageY - windowHalfY;

}
function resizeWindow(){
  windowHalfX = window.innerWidth/2;
  windowHalfY = window.innerHeight/2;
  
  camera.aspect = window.innerWidth/window.innerHeight;
  
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth-window.innerWidth/8.5, window.innerHeight);
}

function render(){
  requestAnimationFrame(render);

  var time = Date.now()*0.00005;
  
  camera.position.x += (mouseX - camera.position.x)*0.05;
  camera.position.y += ( - mouseY - camera.position.y)*0.05;
  particles.position.x +=1;
  camera.lookAt( particles.position);
  renderer.render(scene, camera);
}