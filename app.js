// AI Workflow Demo
document.addEventListener('DOMContentLoaded', function() {
    const demoButton = document.getElementById('demoButton');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const scanEffect = document.getElementById('scanEffect');
    const scoreBadge = document.getElementById('scoreBadge');
    const ctaSection = document.getElementById('ctaSection');
    
    let isAnimating = false;
    
    function startWorkflowDemo() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Reset all states
        resetWorkflow();
        
        // Step 1: Upload (already visible, just activate)
        setTimeout(() => {
            step1.classList.add('active');
            step1.querySelector('.step-arrow').classList.add('show');
        }, 200);
        
        // Step 2: AI Processing
        setTimeout(() => {
            step2.classList.add('active');
            scanEffect.classList.add('active');
            step2.querySelector('.step-arrow').classList.add('show');
        }, 1000);
        
        // Step 3: Result with score
        setTimeout(() => {
            scanEffect.classList.remove('active');
            step3.classList.add('active');
            step3.querySelector('.antler-highlight').classList.add('show');
            
            // Show score badge with delay
            setTimeout(() => {
                scoreBadge.classList.add('show');
                animateScoreNumber();
            }, 500);
            
            // Show CTA
            setTimeout(() => {
                showCTA();
            }, 1200);
            
        }, 3000);
        
        // Auto reset after showing result
        setTimeout(() => {
            resetWorkflow();
            isAnimating = false;
        }, 7000);
    }
    
    function animateScoreNumber() {
        const scoreNumber = scoreBadge.querySelector('.score-number');
        const targetScore = 148;
        let currentScore = 0;
        const increment = targetScore / 15;
        
        const timer = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(timer);
            }
            scoreNumber.textContent = Math.floor(currentScore);
        }, 80);
    }
    
    function showCTA() {
        ctaSection.style.opacity = '0';
        ctaSection.style.transform = 'translateY(20px)';
        ctaSection.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            ctaSection.style.opacity = '1';
            ctaSection.style.transform = 'translateY(0)';
        }, 100);
    }
    
    function resetWorkflow() {
        // Reset all steps
        [step1, step2, step3].forEach(step => {
            step.classList.remove('active');
        });
        
        // Reset arrows
        document.querySelectorAll('.step-arrow').forEach(arrow => {
            arrow.classList.remove('show');
        });
        
        // Reset effects
        scanEffect.classList.remove('active');
        scoreBadge.classList.remove('show');
        step3.querySelector('.antler-highlight').classList.remove('show');
        
        // Reset score number
        scoreBadge.querySelector('.score-number').textContent = '148';
    }
    
    // Click handler
    demoButton.addEventListener('click', startWorkflowDemo);
    
    // Auto-demo every 12 seconds
    let autoTimer = setInterval(() => {
        if (!isAnimating) {
            startWorkflowDemo();
        }
    }, 12000);
    
    // Clear auto timer on user interaction
    demoButton.addEventListener('click', () => {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
            if (!isAnimating) {
                startWorkflowDemo();
            }
        }, 15000);
    });
    
    // Initial demo after 3 seconds
    setTimeout(() => {
        if (!isAnimating) {
            startWorkflowDemo();
        }
    }, 3000);
});