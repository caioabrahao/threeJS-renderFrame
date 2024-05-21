import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let orange = 0xc77708;

//basic setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth /
    window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#background'),
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);


//scene

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(10, 3, 16, 100),
    new THREE.MeshBasicMaterial({color: orange, wireframe: true}),
);

let displayedShape = new THREE.Mesh();

function spinRandomMesh(){
    let spin = Math.floor(Math.random() * 2);

    if(spin === 0){
        displayedShape = new THREE.Mesh(
            new THREE.TorusGeometry(15, 5, 16, 100),
            new THREE.MeshBasicMaterial({color: orange, wireframe: true}),
        );
    }
    if(spin === 1){
        displayedShape = new THREE.Mesh(
            new THREE.BoxGeometry(20, 20, 20, 50),
            new THREE.MeshBasicMaterial({color: orange, wireframe: true}),
        );
    }else{
        displayedShape = torus;
    }
}

spinRandomMesh();
scene.add(displayedShape);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    displayedShape.rotation.x += 0.005
    displayedShape.rotation.y += 0.0005
    displayedShape.rotation.z += 0.005

    controls.update();
}

animate();