import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ 
    color: 0xff8c00,
    wireframe: true 
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Position camera
camera.position.z = 30;

// Animation variables
let targetX = 0;
let currentX = 0;

// Scroll handler
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Start animation immediately on first scroll
    // Complete animation by the time we reach second section
    const progress = Math.min(scrollPosition / windowHeight, 1);
    
    // Move from center (0) to right (20)
    targetX = progress * 20;
});

// Animation function
function animate() {
    requestAnimationFrame(animate);

    // Smooth position transition
    currentX += (targetX - currentX) * 0.1;
    torus.position.x = currentX;

    // Rotate the torus
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

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