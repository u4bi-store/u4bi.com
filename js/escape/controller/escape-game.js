app.controller('escape-game', EscapeController);

function EscapeController($scope){

  var container;
  var camera, scene, renderer ;
  var geometry, material, mesh;

  var info = {
    isMouseClick : false,
    mouseDownX : 0,
    mouseDownY : 0,
    mouseDownLon : 0, /* 경도*/
    mouseDownLat : 0, /* 위도*/
    pointerDownX : 0,
    pointerDownY : 0,
    pointerDownLon : 0,
    pointerDownLat : 0,
    lon : 0,
    lat : 0,
    phi : 0, /* 파이*/
    theta : 0 /* 세타*/
  };

  init();
  render();

  function init(){
    container = document.getElementById('escape-container'); /* 돔에 접근함*/
    renderer = new THREE.CanvasRenderer(); /* 웹GL을 지원하는 렌더러 생성*/
    renderer.setPixelRatio(window.devicePixelRatio); /* 현재 디스플레이 픽셀 반영함*/
    renderer.setSize(container.offsetWidth, (window.innerHeight-70)); /* 렌더링할 공간임 컨테이너란 id를 가진 di=v의 높이와 너비를 설정함*/
    container.appendChild(renderer.domElement); /* 컨테이너에 렌더러란 돔을 주입함*/

    camera = new THREE.PerspectiveCamera(75, container.offsetWidth/(window.innerHeight-70), 1, 1100); /* 카메라 셋업함*/
    camera.target = new THREE.Vector3(0,0,0); /* 3d 벡터 주입 (x y z)*/
    scene = new THREE.Scene(); /* 씬에 카메라 구성을 집어넣음*/

    geometry = new THREE.SphereGeometry(500, 60, 40); /* 구체형의 기하체를 만듬*/
    geometry.scale(-1, 1, 1); /*  기하체의 스케일값 조정*/
    
    var ran = Math.floor(Math.random() * 5);
    console.log(ran);
    var material_data = { map : new THREE.TextureLoader().load('images/escape/area_'+ran+'.jpg')}; /* 객체로 이미지 데이터 정보 정의*/
    material = new THREE.MeshBasicMaterial(material_data); /* 물체에 입힐 위의 이미지를 material에 로드함 */
    mesh = new THREE.Mesh(geometry, material); /* mesh에 geometry와 meterial란 객체를 주입하여 적용함*/

    scene.add(mesh); /* 씬에 mesh 객체를 넣어줌*/

    document.addEventListener('mousedown', mouseDown, false); /* 마우스 누를 때 호출*/
    document.addEventListener('mousemove', mouseMove,false); /* 마우스 움직일 때 호출*/
    document.addEventListener('mouseup', mouseUp,false); /* 마우스 땔 때 호출*/
    container.addEventListener('wheel', mouseWheel,false); /* 마우스 휠 활성화시 호출*/
    window.addEventListener('resize', windowResize,false); /* 화면의 사이즈가 조정될 때 호출*/
  }

  function windowResize(){ /* 사이즈가 줄여질 떄 마다 카메라의  종횡비와 사이즈가 줄어듬*/
    camera.aspect = container.offsetWidth/(window.innerHeight-70); /* 종횡비 설정*/
    camera.updateProjectionMatrix(); /* 랜딩되는 요소들 리사이징 업뎃함*/

    renderer.setSize(container.offsetWidth, (window.innerHeight-70)); /* 사이즈 조정*/
  }

  function mouseWheel(e){ /* 스크롤 돌릴때 카메라의 시점이 확대 되었다 축소되었다 함*/
    e.preventDefault();
    camera.fov += e.deltaY * 0.05; /* 스크롤이 일어난 축적값에 따른 카메라 수직된 시점의 거리 조정*/
    camera.updateProjectionMatrix(); /* 랜딩되는 요소들 리사이징 업뎃함*/
  }
  function mouseUp(e){ /* 마우스를 누른 상태에서 때었을 때 멈춰있던 화면의 시점이 돌아감*/
    info.isMouseClick = false; /* 마우스 클릭 유무의 판별 변수값 마우스를 누르고 있지 않다.*/
  }
  function mouseMove(e){ /* 마우스를 움직일때인데 if조건에 의해 마우스를 누른 상태에서만 호출하게 됨.*/
    if(!info.isMouseClick) return; /* 마우스를 누른 상태가 아니라면 리턴*/

    info.lon = ( info.pointerDownX - e.clientX ) * 0.1 + info.pointerDownLon;
    info.lat = ( e.clientY - info.pointerDownY ) * 0.1 + info.pointerDownLat;
    /* 첫 마우스 클릭시 onPointer변수에 누른시점의 x y값이 저장되는데
       그 저장된 점에서 현재 마우스를 움직이고 있는 값을 뺀 후 벡터값을 조정함*/
  }
  function mouseDown(e){
    e.preventDefault(); /* 핸들러내 기본동작을 중지하는 함수임*/
    info.isMouseClick = true; /* 마우스 클릭 유무의 판별 변수값 마우스를 누르고 있다.*/

    info.pointerDownX = e.clientX;  /* 마우스를 눌렀을 때 해당 위치의 x점과 y점이 포인터에 저장됨*/
    info.pointerDownY = e.clientY; /* 마우스 무브를 위함*/

    info.pointerDownLon = info.lon; /* 경도 포인터에 담음*/
    info.pointerDownLat = info.lat; /* 위도 포인터에 담음 마우스 무브점을 위함*/
  }

  function render(){ /* 말 그대로 루프가 도는 렌더임 랜딩되는 요소들 모아놓음 정리*/
    requestAnimationFrame(render);
    /* 위 함수는 우리가 브라우저 탭을 이동하거나 할때 프레임을 정지시켜준다함 브라우저가 받는 부담과 배터리를 아껴줌*/

    if(info.isMouseClick === false) info.lon += 0.1; /* 만약 마우스를 누르고 있지 않을 시 경도를 조정함*/

    /* 벡터조정 삼각함수*/
    info.lat = Math.max(-85, Math.min(85, info.lat)); /* 경도조정*/
    info.phi = THREE.Math.degToRad(90-info.lat); /* 파이점 */
    info.theta = THREE.Math.degToRad(info.lon); /* 세타값*/
    camera.target.x = 500 * Math.sin(info.phi) * Math.cos(info.theta); /* 카메라가 바라보는 시점의 xyz 값을 조정*/
    camera.target.y = 500 * Math.cos(info.phi); /*코사인값 반환*/
    camera.target.z = 500 * Math.sin(info.phi) * Math.sin(info.theta); /*사인값 반환*/
    camera.lookAt(camera.target); /* 카메라가 카메라의 벡터점을 바라보게*/

    renderer.render(scene, camera); /* 컨테이너안에 입혀진 렌더러란 돔 내부의 씬과 카메라를 렌딩시킴*/
  }

}