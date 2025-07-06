// Professional RackMap Interactive Experience
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sophisticated map interactions
    initializeMapVisualization();
    initializeDataUpdates();
    initializeFeedAnimations();
    
    // Map Visualization System
    function initializeMapVisualization() {
        const huntingUnits = document.querySelectorAll('.hunting-unit');
        const unitInfoPanel = document.getElementById('unitInfoPanel');
        
        // Unit data
        const unitData = {
            '1': { name: 'Western Badlands', activity: 65, photos: 28, peak: '6-8 AM', species: 'Mule Deer' },
            '3A': { name: 'Little Missouri', activity: 45, photos: 19, peak: '5-7 AM', species: 'Whitetail' },
            '3B': { name: 'South Badlands', activity: 72, photos: 34, peak: '5-7 AM', species: 'Whitetail' },
            '2A': { name: 'Central Plains', activity: 85, photos: 42, peak: '5-7 AM', species: 'Whitetail' },
            '2B': { name: 'North Central', activity: 58, photos: 31, peak: '6-8 AM', species: 'Whitetail' },
            '2G': { name: 'Red River Valley', activity: 78, photos: 38, peak: '5-8 AM', species: 'Whitetail' }
        };
        
        huntingUnits.forEach(unit => {
            unit.addEventListener('mouseenter', function() {
                const unitId = this.getAttribute('data-unit');
                const data = unitData[unitId];
                
                if (data) {
                    updateUnitInfoPanel(unitId, data);
                }
            });
            
            unit.addEventListener('click', function() {
                const unitId = this.getAttribute('data-unit');
                console.log(`Unit ${unitId} selected for detailed view`);
            });
        });
        
        function updateUnitInfoPanel(unitId, data) {
            unitInfoPanel.querySelector('h4').textContent = `Unit ${unitId} - ${data.name}`;
            unitInfoPanel.querySelector('.activity-fill').style.width = `${data.activity}%`;
            
            const metrics = unitInfoPanel.querySelectorAll('.metric-item .value');
            metrics[0].textContent = data.photos;
            metrics[1].textContent = data.peak;
            metrics[2].textContent = data.species;
            
            unitInfoPanel.style.opacity = '1';
            unitInfoPanel.style.transform = 'translateY(0)';
        }
    }
    
    // Real-time Data Updates
    function initializeDataUpdates() {
        const activeHunters = document.getElementById('activeHunters');
        const photosShared = document.getElementById('photosShared');
        
        // Simulate real-time data updates
        let hunterCount = 247;
        let photoCount = 1842;
        
        setInterval(() => {
            // Random fluctuation in active hunters
            const hunterChange = Math.floor(Math.random() * 10) - 5;
            hunterCount = Math.max(200, Math.min(300, hunterCount + hunterChange));
            
            if (activeHunters) {
                animateNumber(activeHunters, hunterCount);
            }
            
            // Increment photos occasionally
            if (Math.random() > 0.7) {
                photoCount += Math.floor(Math.random() * 3) + 1;
                if (photosShared) {
                    animateNumber(photosShared, photoCount, true);
                }
            }
        }, 5000);
    }
    
    // Number animation helper
    function animateNumber(element, target, formatK = false) {
        const current = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const increment = (target - current) / 20;
        let step = 0;
        
        const timer = setInterval(() => {
            step++;
            const value = Math.round(current + (increment * step));
            
            if (formatK && value > 999) {
                element.textContent = (value / 1000).toFixed(1) + 'K';
            } else {
                element.textContent = value;
            }
            
            if (step >= 20) {
                clearInterval(timer);
                if (formatK && target > 999) {
                    element.textContent = (target / 1000).toFixed(1) + 'K';
                } else {
                    element.textContent = target;
                }
            }
        }, 50);
    }
    
    // Feed Animations
    function initializeFeedAnimations() {
        const feedCards = document.querySelectorAll('.feed-card');
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const feedObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, observerOptions);
        
        feedCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            feedObserver.observe(card);
        });
        
        // Add sophisticated hover effects
        feedCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // CTA Button Enhancement
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Demo Button
    const demoButton = document.getElementById('demoButton');
    if (demoButton) {
        demoButton.addEventListener('click', function() {
            const ctaSection = document.getElementById('ctaSection');
            if (ctaSection) {
                ctaSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    
    // Add professional animations
    const style = document.createElement('style');
    style.textContent = `
        .hunting-unit path {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .pulse-point {
            transform-origin: center;
        }
        
        .data-panel {
            animation: fadeIn 0.8s ease forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .feed-card.visible .deer-silhouette {
            animation: fadeInScale 0.8s ease forwards;
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 0.6;
                transform: scale(1.5);
            }
        }
    `;
    document.head.appendChild(style);
});