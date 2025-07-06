// AI Score Reveal Interactive Demo
document.addEventListener('DOMContentLoaded', function() {
    const uploadZone = document.getElementById('uploadZone');
    const scanOverlay = document.getElementById('scanOverlay');
    const scoreReveal = document.getElementById('scoreReveal');
    const ctaSection = document.getElementById('ctaSection');
    const demoImage = document.getElementById('demoImage');
    const processedImage = document.getElementById('processedImage');
    const uploadIcon = uploadZone.querySelector('.upload-icon');
    const uploadText = uploadZone.querySelector('p');
    const uploadSpan = uploadZone.querySelector('span');
    
    let isAnimating = false;
    
    function startDemo() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Hide upload UI and show original image
        uploadIcon.style.opacity = '0';
        uploadText.style.opacity = '0';
        uploadSpan.style.opacity = '0';
        
        setTimeout(() => {
            demoImage.classList.add('show');
            uploadZone.style.border = '3px solid rgba(255, 255, 255, 0.5)';
        }, 300);
        
        // After 1 second, start scanning
        setTimeout(() => {
            scanOverlay.classList.add('active');
        }, 1500);
        
        // After scanning, show processed image with score
        setTimeout(() => {
            scanOverlay.classList.remove('active');
            demoImage.classList.remove('show');
            processedImage.classList.add('show');
            scoreReveal.classList.add('active');
            
            // Animate number counting
            animateNumber();
            
            // Show CTA after score reveal
            setTimeout(() => {
                ctaSection.style.opacity = '0';
                ctaSection.style.transform = 'translateY(20px)';
                ctaSection.style.transition = 'all 0.6s ease-out';
                
                setTimeout(() => {
                    ctaSection.style.opacity = '1';
                    ctaSection.style.transform = 'translateY(0)';
                }, 100);
                
            }, 1000);
            
            // Reset after 6 seconds
            setTimeout(() => {
                resetDemo();
            }, 6000);
            
        }, 4000);
    }
    
    function animateNumber() {
        const scoreNumber = document.querySelector('.score-number');
        const targetScore = 148;
        let currentScore = 0;
        const increment = targetScore / 20;
        
        const timer = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(timer);
            }
            scoreNumber.textContent = Math.floor(currentScore);
        }, 50);
    }
    
    function resetDemo() {
        scoreReveal.classList.remove('active');
        processedImage.classList.remove('show');
        demoImage.classList.remove('show');
        
        // Reset upload UI
        uploadIcon.style.opacity = '0.8';
        uploadText.style.opacity = '1';
        uploadSpan.style.opacity = '0.7';
        uploadZone.style.border = '3px dashed rgba(255, 255, 255, 0.3)';
        
        isAnimating = false;
        
        // Reset score number
        document.querySelector('.score-number').textContent = '148';
    }
    
    // Click handler
    uploadZone.addEventListener('click', startDemo);
    
    // Drag and drop handlers
    uploadZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadZone.style.background = 'rgba(255, 255, 255, 0.2)';
        uploadZone.style.borderColor = 'rgba(255, 255, 255, 0.6)';
    });
    
    uploadZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadZone.style.background = 'rgba(255, 255, 255, 0.1)';
        uploadZone.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });
    
    uploadZone.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadZone.style.background = 'rgba(255, 255, 255, 0.1)';
        uploadZone.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        startDemo();
    });
    
    // Auto-demo every 10 seconds if no interaction
    let autoTimer = setInterval(() => {
        if (!isAnimating) {
            startDemo();
        }
    }, 10000);
    
    // Clear auto timer on user interaction
    uploadZone.addEventListener('click', () => {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
            if (!isAnimating) {
                startDemo();
            }
        }, 15000);
    });
});