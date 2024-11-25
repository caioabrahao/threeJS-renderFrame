import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create torus
const geometry = new THREE.TorusGeometry(10, 4, 16, 100);
const material = new THREE.MeshBasicMaterial({ 
    color: 0xff8c00,
    wireframe: true 
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Position camera closer
camera.position.z = 15;

// Position and initial rotations
torus.position.x = -15;
torus.rotation.x = Math.PI / 2; // Keep horizontal orientation
torus.rotation.y = 0; // Initial Y rotation

// Mouse tracking variables
let mouseY = 0;
let targetRotationY = 0;
let currentRotationY = 0;

// Rotation limits
const MAX_ROTATION = 0.3; // Maximum rotation in radians (about 17 degrees)

// Mouse move handler
window.addEventListener('mousemove', (event) => {
    // Convert mouse position to normalized coordinates (-1 to 1)
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Apply rotation limit
    targetRotationY = Math.max(Math.min(mouseY * 0.3, MAX_ROTATION), -MAX_ROTATION);
});

// Animation function
function animate() {
    requestAnimationFrame(animate);

    // Extra smooth Y rotation with easing
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;
    torus.rotation.y = currentRotationY;

    // Continuous Z rotation
    torus.rotation.z += 0.005;

    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Start animation
animate(); 