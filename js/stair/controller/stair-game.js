app.controller('stair-game', StairController);

function StairController($scope){

    var stair=-1;

    var container = document.getElementById('stair-container');
    var stairText = document.getElementById('stairText');
    var comment = document.getElementById('container-content');

    var camera, scene, renderer ;
    var geometry, material, mesh;
    
    var controlsEnabled = false;
    var controls;

    var objects = [];
    var raycaster;

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;

    var prevTime = performance.now();
    var velocity = new THREE.Vector3();

    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    if (havePointerLock){

        var element = document.body;
        var pointerlockchange = function (event){

            if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element){
                controlsEnabled = true;
                controls.enabled = true;
            } else controls.enabled = false;
        };

        // 화면이 잠겨있을 때 반응하는 이벤트리스너
        document.addEventListener('pointerlockchange', pointerlockchange, false);
        document.addEventListener('mozpointerlockchange', pointerlockchange, false);
        document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

        container.addEventListener('click', function (event){
            comment.style.display = 'none';
            // 잠겨진 화면을 해제하도록 요청함
            onWindowResize();
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
            element.requestPointerLock();
        }, false);
    }

    var onKeyDown = function (event){
        switch (event.keyCode){
            case 87: // w
                moveForward = true;
                break;
            case 65: // a
                moveLeft = true; break;
            case 83: // s
                moveBackward = true;
                break;
            case 68: // d
                moveRight = true;
                break;
            case 16: // 스페
                if (canJump === true){
                    velocity.y += 350;
                    canJump = false;
                }
                break;
        }
    };
    var onKeyUp = function (event){
        switch(event.keyCode){
            case 87: // w
                moveForward = false;
                break;
            case 65: // a
                moveLeft = false;
                break;
            case 83: // s
                moveBackward = false;
                break;
            case 68: // d
                moveRight = false;
                break;
        }
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    
    init();
    render();

    function init(){

        camera = new THREE.PerspectiveCamera(75, container.offsetWidth, (window.innerHeight-70), 1, 1000);


        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 0, 750);

        var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
        light.position.set(0.5, 1, 0.75);
        scene.add(light);

        controls = new THREE.PointerLockControls(camera);
        scene.add(controls.getObject());

        raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);

        material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });

        geometry = new THREE.BoxGeometry(20, 1, 20);
        for (var i = 1; i < 150; i ++){
            material = new THREE.MeshPhongMaterial({ specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors });
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = i*30;
            mesh.position.y = i*10;
            mesh.position.z = i*10;
            scene.add( mesh );

            material.color.set(0x6CC683);
            objects.push(mesh);
        }

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xED399F);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.offsetWidth, (window.innerHeight-70));
        container.appendChild(renderer.domElement);

        window.addEventListener('resize', onWindowResize, false);
    }

    function render(){
        requestAnimationFrame(render);

        if (controlsEnabled){
            raycaster.ray.origin.copy(controls.getObject().position);
            raycaster.ray.origin.y -= 10;

            var intersections = raycaster.intersectObjects(objects);

            var isOnObject = intersections.length > 0;

            var time = performance.now();
            var delta = (time - prevTime) / 1000;

            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            velocity.y -= 9.8 * 100.0 * delta;

            if (moveForward) velocity.z -= 400.0 * delta;
            if (moveBackward) velocity.z += 400.0 * delta;

            if (moveLeft) velocity.x -= 400.0 * delta;
            if (moveRight) velocity.x += 400.0 * delta;

            if (isOnObject === true){

                if(stair != intersections[0].object.id-6){
                    var stairSound = new Audio('./audio/game/stair/jump.mp3');
                    stairSound.play();
                }

                velocity.y = Math.max(0, velocity.y);
                stair = intersections[0].object.id-6;
                objects[stair].material.color.set( 0xADFF2F);
                if(stair+1 != objects.length)objects[stair+1].material.color.set(0x6CC683);
                if(stair-1 != -1)objects[stair-1].material.color.set(0x6CC683);
                stairText.innerHTML="현재 상황 : "+(stair+1)+"계단";
                
                canJump = true;
            }

            controls.getObject().translateX(velocity.x * delta);
            controls.getObject().translateY(velocity.y * delta);
            controls.getObject().translateZ(velocity.z * delta);

            if (controls.getObject().position.y < 10){
                if(stair > 10) stairText.innerHTML="당신의 최종 기록은 "+(stair+1)+"계단입니다.";
                velocity.y = 0;
                controls.getObject().position.y = 10;
                canJump = true;
            }

            prevTime = time;

        }

        renderer.render(scene, camera);
    }

    function onWindowResize(){
        camera.aspect = container.offsetWidth / container.offsetWidth;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, (window.innerHeight-70));
    }

}