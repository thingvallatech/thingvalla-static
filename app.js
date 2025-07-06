// AI Score Reveal Interactive Demo
document.addEventListener('DOMContentLoaded', function() {
    const uploadZone = document.getElementById('uploadZone');
    const scanOverlay = document.getElementById('scanOverlay');
    const scoreReveal = document.getElementById('scoreReveal');
    const ctaSection = document.getElementById('ctaSection');
    
    let isAnimating = false;
    
    function startDemo() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Show scanning overlay
        scanOverlay.classList.add('active');
        
        // After 2 seconds, hide scan and show score
        setTimeout(() => {
            scanOverlay.classList.remove('active');
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
            
            // Reset after 5 seconds
            setTimeout(() => {
                resetDemo();
            }, 5000);
            
        }, 2000);
    }
    
    function animateNumber() {
        const scoreNumber = document.querySelector('.score-number');
        const targetScore = 158;
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
        isAnimating = false;
        
        // Reset score number
        document.querySelector('.score-number').textContent = '158';
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