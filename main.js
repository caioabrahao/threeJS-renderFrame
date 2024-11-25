// Import Three.js elements if needed
// import { scene, camera, renderer, torus } from './three.js';

// Get the hero text element
const heroText = document.querySelector('.hero h1');

// Scroll handler
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroHeight = window.innerHeight;
    
    // Calculate scroll progress (0 to 1)
    const scrollProgress = Math.min(scrollPosition / (heroHeight * 0.8), 1);
    
    // Apply transformations
    const scale = 1 - (scrollProgress * 0.3);
    const opacity = 1 - scrollProgress;
    const blur = scrollProgress * 10;
    const yOffset = scrollProgress * 100;
    const rotation = scrollProgress * 10;
    
    heroText.style.transform = `
        scale(${scale})
        translateY(-${yOffset}px)
        rotateX(${rotation}deg)
    `;
    heroText.style.opacity = opacity;
    heroText.style.filter = `blur(${blur}px)`;
}); 