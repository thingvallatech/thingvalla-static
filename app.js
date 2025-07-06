// RackMap Social Hunting Platform Demo
document.addEventListener('DOMContentLoaded', function() {
    initializeSocialFeed();
    initializeAreaDiscovery();
    initializeInteractions();
    initializeAnimations();
    
    // Social Feed Simulation
    function initializeSocialFeed() {
        const huntCards = document.querySelectorAll('.hunt-card');
        
        // Simulate real-time activity
        setInterval(() => {
            updateLikeCounts();
            simulateNewActivity();
        }, 8000);
        
        // Add interaction handlers
        huntCards.forEach(card => {
            const likeBtn = card.querySelector('.action-btn');
            if (likeBtn && !likeBtn.classList.contains('liked')) {
                likeBtn.addEventListener('click', function() {
                    this.classList.add('liked');
                    const count = this.querySelector('span');
                    const currentCount = parseInt(count.textContent);
                    count.textContent = currentCount + 1;
                    
                    // Visual feedback
                    this.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            }
        });
    }
    
    function updateLikeCounts() {
        const likeBtns = document.querySelectorAll('.action-btn:not(.liked)');
        likeBtns.forEach(btn => {
            if (Math.random() > 0.8) {
                const countEl = btn.querySelector('span');
                if (countEl) {
                    const current = parseInt(countEl.textContent);
                    countEl.textContent = current + Math.floor(Math.random() * 3) + 1;
                    
                    // Subtle animation
                    countEl.style.color = '#0066FF';
                    setTimeout(() => {
                        countEl.style.color = '';
                    }, 1000);
                }
            }
        });
    }
    
    function simulateNewActivity() {
        const activityPins = document.querySelectorAll('.activity-pin .activity-count');
        activityPins.forEach(pin => {
            if (Math.random() > 0.7) {
                const current = parseInt(pin.textContent);
                pin.textContent = current + 1;
                
                // Pulse animation
                const circle = pin.parentElement.querySelector('circle:last-child');
                if (circle) {
                    circle.style.fill = '#00ff88';
                    setTimeout(() => {
                        circle.style.fill = '#0066FF';
                    }, 2000);
                }
            }
        });
    }
    
    // Area Discovery Map
    function initializeAreaDiscovery() {
        const activityPins = document.querySelectorAll('.activity-pin');
        
        activityPins.forEach(pin => {
            pin.addEventListener('click', function() {
                const count = this.querySelector('.activity-count').textContent;
                showAreaDetails(count);
            });
            
            pin.addEventListener('mouseenter', function() {
                this.style.cursor = 'pointer';
                this.style.transform = 'scale(1.1)';
            });
            
            pin.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Update stats periodically
        setInterval(() => {
            updateMapStats();
        }, 12000);
    }
    
    function showAreaDetails(count) {
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            z-index: 1000;
            font-size: 0.9rem;
            text-align: center;
        `;
        tooltip.innerHTML = `
            <strong>${count} hunters active</strong><br>
            <span style="color: #ccc;">Click "Explore Your Area" to see more details</span>
        `;
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip);
            }
        }, 3000);
    }
    
    function updateMapStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach((stat, index) => {
            if (index < 2 && Math.random() > 0.6) {
                const current = parseInt(stat.textContent);
                const change = Math.floor(Math.random() * 5) + 1;
                animateNumber(stat, current + change);
            }
        });
    }
    
    // Interactive Elements
    function initializeInteractions() {
        // Photo sharing demo button
        const shareBtn = document.getElementById('sharePhotoDemo');
        if (shareBtn) {
            shareBtn.addEventListener('click', function() {
                simulatePhotoShare();
            });
        }
        
        // Filter button
        const filterBtn = document.querySelector('.filter-btn');
        if (filterBtn) {
            filterBtn.addEventListener('click', function() {
                this.style.background = 'rgba(255, 255, 255, 0.2)';
                this.textContent = 'Filtering...';
                
                setTimeout(() => {
                    this.style.background = 'rgba(255, 255, 255, 0.1)';
                    this.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                            <path d="M2 4 L14 4 M4 8 L12 8 M6 12 L10 12" stroke="white" stroke-width="2"/>
                        </svg>
                        Filter
                    `;
                }, 2000);
            });
        }
        
        // Tab navigation
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                if (index === 1) {
                    simulateMapView();
                } else if (index === 2) {
                    simulatePhotoShare();
                }
            });
        });
    }
    
    function simulatePhotoShare() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 1rem;
                text-align: center;
                max-width: 400px;
                width: 90%;
            ">
                <h3 style="margin-bottom: 1rem;">Share Your Hunt</h3>
                <div class="upload-area" style="
                    width: 200px;
                    height: 200px;
                    background: #f8f9fa;
                    border: 2px dashed #dee2e6;
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                    cursor: pointer;
                ">
                    Click to upload photo
                </div>
                <input type="text" placeholder="Add location (Unit 2A)" style="
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #dee2e6;
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                ">
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="cancel-btn" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 0.5rem;
                        cursor: pointer;
                    ">Cancel</button>
                    <button class="share-btn" style="
                        background: #0066FF;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 0.5rem;
                        cursor: pointer;
                    ">Share Hunt</button>
                </div>
            </div>
        `;
        
        // Add event listeners
        const uploadArea = modal.querySelector('.upload-area');
        uploadArea.addEventListener('click', function() {
            this.style.background = '#e3f2fd';
            this.innerHTML = '📸 Photo Selected!';
        });
        
        const cancelBtn = modal.querySelector('.cancel-btn');
        cancelBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        const shareBtn = modal.querySelector('.share-btn');
        shareBtn.addEventListener('click', function() {
            this.textContent = 'Sharing...';
            this.disabled = true;
            setTimeout(() => {
                document.body.removeChild(modal);
                showShareSuccess();
            }, 2000);
        });
        
        document.body.appendChild(modal);
    }
    
    function showShareSuccess() {
        const success = document.createElement('div');
        success.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: #28a745;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            z-index: 2000;
            box-shadow: 0 5px 20px rgba(40, 167, 69, 0.3);
            transition: all 0.3s ease;
        `;
        success.textContent = '✅ Hunt shared with your network!';
        
        document.body.appendChild(success);
        
        setTimeout(() => {
            success.style.transform = 'translateX(400px)';
            success.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(success)) {
                    document.body.removeChild(success);
                }
            }, 300);
        }, 3000);
    }
    
    function simulateMapView() {
        const mapContainer = document.querySelector('.discovery-map');
        if (mapContainer) {
            mapContainer.style.transform = 'scale(1.05)';
            setTimeout(() => {
                mapContainer.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    // Animations
    function initializeAnimations() {
        const featureCards = document.querySelectorAll('.feature-card');
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });
        
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            cardObserver.observe(card);
        });
        
        // Hunt cards entrance animation
        const huntCards = document.querySelectorAll('.hunt-card');
        huntCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200 + 1000);
        });
    }
    
    // Utility function for number animation
    function animateNumber(element, target) {
        const current = parseInt(element.textContent);
        const increment = (target - current) / 20;
        let step = 0;
        
        const timer = setInterval(() => {
            step++;
            const value = Math.round(current + (increment * step));
            element.textContent = value;
            
            if (step >= 20) {
                clearInterval(timer);
                element.textContent = target;
            }
        }, 50);
    }
});