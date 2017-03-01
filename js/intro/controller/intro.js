app.controller('IntroController', IntroController);

function IntroController($scope){

    var container;
    var camera, scene, renderer;
    var geometry, sprite, material, particles;

    var mouseX = 0, mouseY = 0;
    var windowHalfX;
    var windowHalfY;
    var flag = false;

    init();
    render();

    function init(){
      container = document.getElementById('container');
      
      
      windowHalfX = container.offsetWidth / 2;
      windowHalfY = container.offsetHeight / 2;

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.offsetWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(55, container.offsetWidth/container.offsetHeight, 2, 2000);
      camera.position.z = 1000;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.001);
      geometry = new THREE.Geometry();
      
      addTexture('images/logo.png', 100,100,100,130);
      addTexture('images/logo.png', 100,100,500,130);

      resizeWindow();
      document.addEventListener( 'mousemove', mouseMove, false );
      document.addEventListener( 'touchstart', touchStart, false );
      document.addEventListener( 'touchmove', touchMove, false );
      window.addEventListener( 'resize', resizeWindow, false );
    }

  	function addTexture(path, x,y,z,size){
      sprite = new THREE.TextureLoader().load(path);
      var vertext = new THREE.Vector3();
      vertext.x = x;
      vertext.y = y;
      vertext.z = z;
      geometry.vertices.push(vertext);
      var meterial_data = {size: size,sizeAttenuation: false,map: sprite,alphaTest: 0.5,transparent: true};
      material = new THREE.PointsMaterial(meterial_data);
      material.color.setHSL(1.0, 0.3, 0.7);
      particles = new THREE.Points(geometry, material);
      scene.add(particles);
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
      windowHalfX = container.offsetWidth/2;
      windowHalfY = container.offsetHeight/2;

      camera.aspect = container.offsetWidth/window.innerHeight;

      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth+15, window.innerHeight);
    }

    function render(){
      requestAnimationFrame(render);
      var time = Date.now()*0.00505;

      camera.position.x += (mouseX - camera.position.x)*0.05;
      camera.position.y += ( - mouseY - camera.position.y)*0.05;
      camera.lookAt( scene.position);

      var h=(360*(1.0+time)%360)/360;
      material.color.setHSL(h,0.5,0.5);

      renderer.render(scene, camera);
      var posX = Math.round(camera.position.x);
      var posY = Math.round(camera.position.y);
      
      if( !flag && posX > 100 && posY > 100 && posX < 105 && posY < 105 ){
          location.href="#main";
          flag =true;
          return;
      }
      
    }

}