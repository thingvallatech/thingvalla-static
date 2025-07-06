// Community Feed Demo
document.addEventListener('DOMContentLoaded', function() {
    const demoButton = document.getElementById('demoButton');
    const huntFeed = document.getElementById('huntFeed');
    const areaActivity = document.getElementById('areaActivity');
    const feedCards = document.querySelectorAll('.feed-card');
    const ctaSection = document.getElementById('ctaSection');
    const interactiveMap = document.getElementById('interactiveMap');
    const activityPopup = document.getElementById('activityPopup');
    
    let isAnimating = false;
    
    function startCommunityDemo() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Reset all states
        resetDemo();
        
        // Show area activity first
        setTimeout(() => {
            areaActivity.classList.add('show');
            startMapInteractions();
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
        
        // Don't auto reset - keep content visible
        setTimeout(() => {
            isAnimating = false;
        }, 4000);
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
        // Only reset if not already showing content
        if (!areaActivity.classList.contains('show')) {
            feedCards.forEach(card => {
                card.classList.remove('show');
            });
            areaActivity.classList.remove('show');
        }
    }
    
    // Advanced Map Interactions
    function startMapInteractions() {
        // Simulate GPS tracking with dynamic coordinates
        animateGPSTracking();
        
        // Interactive popup system
        setupMapClickHandlers();
        
        // Dynamic hotspot intensity based on activity
        simulateActivityData();
        
        // Parallax effect on scroll
        if (typeof window !== 'undefined') {
            setupParallaxEffect();
        }
    }
    
    function animateGPSTracking() {
        const gpsDots = document.querySelectorAll('.gps-dot');
        
        gpsDots.forEach((dot, index) => {
            // Create trail effect
            setInterval(() => {
                createGPSTrail(dot);
            }, 2000 + (index * 500));
            
            // Simulate movement with micro-animations
            simulateGPSMovement(dot, index);
        });
    }
    
    function createGPSTrail(dot) {
        const trail = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const cx = dot.getAttribute('cx');
        const cy = dot.getAttribute('cy');
        
        trail.setAttribute('cx', cx);
        trail.setAttribute('cy', cy);
        trail.setAttribute('r', '3');
        trail.setAttribute('fill', 'none');
        trail.setAttribute('stroke', '#00ff88');
        trail.setAttribute('stroke-width', '1');
        trail.setAttribute('opacity', '0.8');
        trail.style.animation = 'trailExpand 2s ease-out forwards';
        
        dot.parentNode.insertBefore(trail, dot);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 2000);
    }
    
    function simulateGPSMovement(dot, index) {
        const originalCx = parseFloat(dot.getAttribute('cx'));
        const originalCy = parseFloat(dot.getAttribute('cy'));
        let phase = 0;
        
        setInterval(() => {
            phase += 0.1;
            const offsetX = Math.sin(phase + index) * 2;
            const offsetY = Math.cos(phase + index * 0.7) * 1.5;
            
            dot.setAttribute('cx', originalCx + offsetX);
            dot.setAttribute('cy', originalCy + offsetY);
        }, 100);
    }
    
    function setupMapClickHandlers() {
        const hotspots = document.querySelectorAll('.hotspot');
        const popupData = [
            { unit: 'Unit 3B2', user: 'BuckHunter47', activity: 'Trail cam activity', time: '2 hours ago' },
            { unit: 'Unit 2K1', user: 'OutdoorQueen', activity: 'Recent sighting', time: '4 hours ago' },
            { unit: 'Unit 1A1', user: 'TrailWatcher', activity: 'Photo uploaded', time: '6 hours ago' }
        ];
        
        hotspots.forEach((hotspot, index) => {
            // Create invisible clickable area
            const clickArea = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            clickArea.setAttribute('cx', hotspot.getAttribute('cx'));
            clickArea.setAttribute('cy', hotspot.getAttribute('cy'));
            clickArea.setAttribute('r', '20');
            clickArea.setAttribute('fill', 'transparent');
            clickArea.style.cursor = 'pointer';
            clickArea.style.pointerEvents = 'all';
            
            hotspot.parentNode.insertBefore(clickArea, hotspot);
            
            clickArea.addEventListener('click', () => {
                showActivityPopup(popupData[index], hotspot);
            });
            
            // Auto-show popup after delay
            setTimeout(() => {
                if (index === 0) { // Show first popup automatically
                    showActivityPopup(popupData[index], hotspot);
                    
                    setTimeout(() => {
                        hideActivityPopup();
                    }, 3000);
                }
            }, 2000);
        });
    }
    
    function showActivityPopup(data, hotspot) {
        const popup = document.getElementById('activityPopup');
        const cx = parseFloat(hotspot.getAttribute('cx'));
        const cy = parseFloat(hotspot.getAttribute('cy'));
        
        // Update popup content
        popup.querySelector('.unit-name').textContent = data.unit;
        popup.querySelector('.activity-time').textContent = data.time;
        popup.querySelector('.hunter-username').textContent = data.user;
        popup.querySelector('.activity-type').textContent = data.activity;
        
        // Position popup relative to hotspot
        popup.style.left = `${(cx / 300) * 100}%`;
        popup.style.top = `${(cy / 200) * 100}%`;
        
        popup.classList.add('show');
    }
    
    function hideActivityPopup() {
        const popup = document.getElementById('activityPopup');
        popup.classList.remove('show');
    }
    
    function simulateActivityData() {
        const hotspots = document.querySelectorAll('.hotspot');
        
        setInterval(() => {
            hotspots.forEach((hotspot, index) => {
                // Randomly intensify hotspots
                if (Math.random() > 0.7) {
                    hotspot.style.animation = 'hotspotIntense 1s ease-in-out';
                    setTimeout(() => {
                        hotspot.style.animation = `hotspotPulse 3s infinite ease-in-out`;
                        hotspot.style.animationDelay = `${index}s`;
                    }, 1000);
                }
            });
        }, 5000);
    }
    
    function setupParallaxEffect() {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const mapElement = document.querySelector('.interactive-map');
            
            if (mapElement) {
                const rect = mapElement.getBoundingClientRect();
                const inView = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (inView) {
                    const parallaxSpeed = scrolled * 0.1;
                    const radarSweep = document.querySelector('.radar-sweep');
                    
                    if (radarSweep) {
                        radarSweep.style.transform = `rotate(${parallaxSpeed % 360}deg)`;
                    }
                }
            }
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // Add custom CSS animations for trails
    const style = document.createElement('style');
    style.textContent = `
        @keyframes trailExpand {
            0% { r: 3; opacity: 0.8; stroke-width: 1; }
            100% { r: 12; opacity: 0; stroke-width: 0.5; }
        }
        
        @keyframes hotspotIntense {
            0%, 100% { r: 8; opacity: 0.6; }
            50% { r: 25; opacity: 1; }
        }
        
        .interactive-map:hover .radar-sweep {
            animation-duration: 2s !important;
        }
        
        .interactive-map:hover .gps-dot {
            animation-duration: 1s !important;
        }
    `;
    document.head.appendChild(style);
    
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
    
    // Auto-demo only once, then keep content visible
    let hasAutoPlayed = false;
    let autoTimer = setInterval(() => {
        if (!isAnimating && !hasAutoPlayed) {
            startCommunityDemo();
            hasAutoPlayed = true;
            clearInterval(autoTimer);
        }
    }, 15000);
    
    // Manual trigger still works
    demoButton.addEventListener('click', () => {
        if (!isAnimating) {
            startCommunityDemo();
        }
    });
    
    // Initial demo after 3 seconds
    setTimeout(() => {
        if (!isAnimating) {
            startCommunityDemo();
        }
    }, 3000);
    
    // Add some dynamic content rotation
    const hunterNames = ['BuckHunter47', 'OutdoorQueen', 'TrailWatcher', 'WoodsStalker', 'DeerSlayer99', 'FieldMaster', 'CamoKing', 'WildTracker', 'HuntingPro'];
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