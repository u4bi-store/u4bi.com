app.controller('stair-game', StairController);

function StairController($scope){

  var container;
  var camera, scene, renderer ;

  var geometry, material, mesh;
  var controls;

  var raycaster;

   init();
   render();

   function init(){

      container = document.getElementById('stair-container');
      camera = new THREE.PerspectiveCamera(75, container.offsetWidth, (window.innerHeight-70), 1, 1000);
     

      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xffffff, 0, 750);
      controls = new THREE.PointerLockControls(camera);
      scene.add(controls.getObject());


      geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
      geometry.rotateX(- Math.PI / 2);
      material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
      material.color.set(0x34A853);
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      
      renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(0xED399F);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.offsetWidth, (window.innerHeight-70));
      container.appendChild(renderer.domElement);

       window.addEventListener('resize', onWindowResize, false);
   }

   function render(){
    requestAnimationFrame(render);

    renderer.render(scene, camera);
   }

   function onWindowResize(){
      camera.aspect = container.offsetWidth / container.offsetWidth;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, (window.innerHeight-70));
   }

}