app.controller('stair-game', StairController);

function StairController($scope){

    var container = document.getElementById('stair-container');
    var camera, scene, renderer ;

    var geometry, material, mesh;
    var controls;

    var objects = [];
    var raycaster;

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
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
            element.requestPointerLock();
        }, false);
    }


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

        renderer.render(scene, camera);
    }

    function onWindowResize(){
        camera.aspect = container.offsetWidth / container.offsetWidth;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, (window.innerHeight-70));
    }

}