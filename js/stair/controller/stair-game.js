app.controller('stair-game', StairController);

function StairController($scope){

    var score=0;

    var container = document.getElementById('stair-container');
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
                if (canJump === true) velocity.y += 350;
                canJump = false;
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

        geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
        geometry.rotateX(- Math.PI / 2);
        material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
        material.color.set(0x34A853);
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        /* 계단 */
        geometry = new THREE.BoxGeometry(20, 1, 20);
        for (var i = 1; i < 100; i ++){
            material = new THREE.MeshPhongMaterial({ specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors });
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = i*30;
            mesh.position.y = i*10;
            mesh.position.z = i*10;
            scene.add( mesh );

            material.color.set(0xEA4335);
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
                velocity.y = Math.max(0, velocity.y);

                score = intersections[0].object.id-7;
                objects[score].material.color.set( 0x0000ff);
                if(score+1 != objects.length)objects[score+1].material.color.set( 0xEA4335);
                if(score-1 != -1)objects[score-1].material.color.set( 0xEA4335);
                // scoreText.innerHTML="현재 상황 : "+score+"계단";
                
                canJump = true;
            }

            controls.getObject().translateX(velocity.x * delta);
            controls.getObject().translateY(velocity.y * delta);
            controls.getObject().translateZ(velocity.z * delta);

            if (controls.getObject().position.y < 10){
                if(score > 37){
                    alert('죽음! 당신의 스코어는 '+score+'입니다.');
                    window.location.replace(window.location.href);
                }
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