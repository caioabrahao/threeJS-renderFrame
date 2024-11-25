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

// Drag interaction variables
let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;
let rotationSpeed = { x: 0, y: 0 };

// Raycaster for drag detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Mouse event handlers
window.addEventListener('mousedown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(torus);
    
    if (intersects.length > 0) {
        isDragging = true;
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }
});

window.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const deltaX = event.clientX - previousMouseX;
        const deltaY = event.clientY - previousMouseY;
        
        rotationSpeed.x = deltaY * 0.005;
        rotationSpeed.y = deltaX * 0.005;
        
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

// Scroll handler
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    if (scrollPosition < windowHeight) {
        // First section to second section (center to right)
        const progress = Math.min(scrollPosition / windowHeight, 1);
        targetX = progress * 20;
    } else if (scrollPosition < windowHeight * 2) {
        // Stay at right position during second section
        targetX = 20;
    } else {
        // Move to left for cards section and stay there for the rest
        targetX = -20;
    }
});

// Animation function
function animate() {
    requestAnimationFrame(animate);

    // Smooth position transition
    currentX += (targetX - currentX) * 0.1;
    torus.position.x = currentX;

    if (isDragging) {
        // Apply drag rotation
        torus.rotation.x += rotationSpeed.x;
        torus.rotation.y += rotationSpeed.y;
    } else {
        // Regular rotation when not dragging
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;
        
        // Gradually slow down any existing rotation speed
        rotationSpeed.x *= 0.95;
        rotationSpeed.y *= 0.95;
    }

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