app.controller('stair-game', StairController);

function StairController($scope){

  var container;
  var camera, scene, renderer ;

   init();
   render();

   function init(){

      container = document.getElementById('stair-container');
      renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(0x2196F3);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.offsetWidth, (window.innerHeight-70));
      container.appendChild(renderer.domElement);

   }

   function render(){
    requestAnimationFrame(render);

   }
}