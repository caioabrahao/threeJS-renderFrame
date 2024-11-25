// Loading screen handler
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Check if this is a page navigation (not refresh or first visit)
    if (sessionStorage.getItem('hasVisited') && performance.navigation.type !== 1) {
        // Hide loading screen immediately if navigating between pages
        loadingScreen.style.display = 'none';
        return;
    }
    
    const progress = document.querySelector('.progress');
    const loadingMessage = document.querySelector('.loading-message');
    
    // Random loading messages
    const messages = [
        "Calibrating quantum flux capacitors...",
        "Teaching robots to dance...",
        "Downloading more RAM...",
        "Convincing pixels to behave...",
        "Generating random loading message..."
    ];
    
    // Set random message
    loadingMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
    
    let width = 0;
    
    // Loading simulation
    const interval = setInterval(() => {
        width += Math.random() * 30;
        if (width > 100) {
            width = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Set the visited flag in sessionStorage
                    sessionStorage.setItem('hasVisited', 'true');
                }, 500);
            }, 300);
        }
        progress.style.width = width + '%';
    }, 200);
});

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

// Add this to your main.js file
document.addEventListener('DOMContentLoaded', () => {
    const placeholder = document.querySelector('.profile-placeholder');
    
    if (placeholder) {
        placeholder.addEventListener('mousemove', (e) => {
            const rect = placeholder.getBoundingClientRect();
            
            // Calculate mouse position relative to the center of the element
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Increased multiplier from 20 to 35 for more sensitivity
            const xDeg = (y / rect.height) * 35;  // Vertical mouse = X rotation
            const yDeg = -(x / rect.width) * 35;  // Horizontal mouse = Y rotation
            
            // Apply the rotation
            placeholder.style.transform = `rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
        });
        
        // Reset rotation when mouse leaves
        placeholder.addEventListener('mouseleave', () => {
            placeholder.style.transform = 'rotateX(0) rotateY(0)';
        });
    }
}); 