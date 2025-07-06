// Community Feed Demo
document.addEventListener('DOMContentLoaded', function() {
    const demoButton = document.getElementById('demoButton');
    const huntFeed = document.getElementById('huntFeed');
    const areaActivity = document.getElementById('areaActivity');
    const feedCards = document.querySelectorAll('.feed-card');
    const ctaSection = document.getElementById('ctaSection');
    
    let isAnimating = false;
    
    function startCommunityDemo() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Reset all states
        resetDemo();
        
        // Show area activity first
        setTimeout(() => {
            areaActivity.classList.add('show');
        }, 500);
        
        // Show feed cards one by one
        setTimeout(() => {
            feedCards[0].classList.add('show');
        }, 1000);
        
        setTimeout(() => {
            feedCards[1].classList.add('show');
        }, 1500);
        
        setTimeout(() => {
            feedCards[2].classList.add('show');
        }, 2000);
        
        // Show CTA after all content is visible
        setTimeout(() => {
            showCTA();
        }, 3000);
        
        // Auto reset after showing all content
        setTimeout(() => {
            resetDemo();
            isAnimating = false;
        }, 10000);
    }
    
    function animateFeatures() {
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'all 0.4s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100);
            }, index * 150);
        });
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
    
    function resetDemo() {
        // Reset feed cards
        feedCards.forEach(card => {
            card.classList.remove('show');
        });
        
        // Reset area activity
        areaActivity.classList.remove('show');
    }
    
    // Add hover effects to feed cards
    feedCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('show')) {
                card.style.transform = 'translateY(-5px) scale(1.02)';
                card.style.boxShadow = '0 15px 35px rgba(0, 102, 255, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('show')) {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = 'none';
            }
        });
    });
    
    // Click handler
    demoButton.addEventListener('click', startCommunityDemo);
    
    // Auto-demo every 15 seconds
    let autoTimer = setInterval(() => {
        if (!isAnimating) {
            startCommunityDemo();
        }
    }, 15000);
    
    // Clear auto timer on user interaction
    demoButton.addEventListener('click', () => {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
            if (!isAnimating) {
                startCommunityDemo();
            }
        }, 20000);
    });
    
    // Initial demo after 3 seconds
    setTimeout(() => {
        if (!isAnimating) {
            startCommunityDemo();
        }
    }, 3000);
    
    // Add some dynamic content rotation
    const hunterNames = ['Jake M.', 'Sarah K.', 'Mike R.', 'Alex T.', 'Dana P.', 'Chris L.'];
    const huntUnits = ['Unit 3B2', 'Unit 2K1', 'Unit 1A1', 'Unit 4C3', 'Unit 2A4', 'Unit 3K1'];
    const timeStamps = ['2 hours ago', '5 hours ago', '1 day ago', '3 hours ago', '6 hours ago', '2 days ago'];
    
    // Rotate content every 12 seconds when not animating
    setInterval(() => {
        if (!isAnimating) {
            feedCards.forEach((card, index) => {
                const nameEl = card.querySelector('.hunter-name');
                const locationEl = card.querySelector('.hunt-location');
                
                const randomName = hunterNames[Math.floor(Math.random() * hunterNames.length)];
                const randomUnit = huntUnits[Math.floor(Math.random() * huntUnits.length)];
                const randomTime = timeStamps[Math.floor(Math.random() * timeStamps.length)];
                
                nameEl.textContent = randomName;
                locationEl.textContent = `${randomUnit} • ${randomTime}`;
            });
        }
    }, 12000);
});