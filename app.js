// RackMap Hunting Unit Visualization Demo
document.addEventListener('DOMContentLoaded', function() {
    initializeRackMapDemo();
    initializeFilterControls();
    initializeHeatMapInteractions();
    initializeAnimations();
    
    // RackMap Interface Demo
    function initializeRackMapDemo() {
        const uploadDemo = document.getElementById('uploadDemo');
        const exploreDemo = document.getElementById('exploreDemo');
        const exploreUnits = document.getElementById('exploreUnits');
        
        if (uploadDemo) {
            uploadDemo.addEventListener('click', simulateUploadFlow);
        }
        
        if (exploreDemo) {
            exploreDemo.addEventListener('click', exploreUnitsDemo);
        }
        
        if (exploreUnits) {
            exploreUnits.addEventListener('click', exploreUnitsDemo);
        }
        
        // Simulate real-time photo updates
        setInterval(() => {
            updatePhotoCounters();
        }, 15000);
    }
    
    // Filter Controls
    function initializeFilterControls() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Simulate filtering
                const filterType = this.textContent;
                showFilterFeedback(filterType);
                updateHeatMapForFilter(filterType);
            });
        });
        
        // User control buttons
        const userBtns = document.querySelectorAll('.user-btn');
        userBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.textContent;
                if (action === 'Upload Image') {
                    simulateUploadFlow();
                } else if (action === 'My Images') {
                    showMyImagesModal();
                } else if (action === 'Logout') {
                    showLogoutConfirm();
                }
            });
        });
    }
    
    // Heat Map Interactions
    function initializeHeatMapInteractions() {
        const heatZones = document.querySelectorAll('.heat-zone');
        const units = document.querySelectorAll('[fill=\"url(#unit-gradient)\"]');
        
        heatZones.forEach(zone => {
            zone.addEventListener('click', function() {
                const photoCount = this.parentElement.querySelector('.photo-count').textContent;
                showUnitDetails(photoCount);
            });
            
            zone.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
                this.style.opacity = '0.8';
            });
            
            zone.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.opacity = '';
            });
        });
        
        // Unit hover effects
        units.forEach(unit => {
            unit.addEventListener('mouseenter', function() {
                this.style.fill = 'rgba(0, 102, 255, 0.2)';
                this.style.cursor = 'pointer';
            });
            
            unit.addEventListener('mouseleave', function() {
                this.style.fill = 'url(#unit-gradient)';
            });
            
            unit.addEventListener('click', function() {
                const unitLabel = this.parentElement.querySelector('.unit-label').textContent;
                showUnitInfo(unitLabel);
            });
        });
    }
    
    // Upload Flow Simulation
    function simulateUploadFlow() {
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
                border-radius: 12px;
                text-align: center;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <h3 style="margin-bottom: 1.5rem; color: #2c3e50;">Upload Hunt Photo</h3>
                
                <div class="upload-steps">
                    <div class="step-item" style="
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        padding: 1rem;
                        background: #f8f9fa;
                        border-radius: 8px;
                        margin-bottom: 1rem;
                    ">
                        <div style="
                            width: 40px;
                            height: 40px;
                            background: #0066FF;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-weight: bold;
                        ">1</div>
                        <div style="text-align: left;">
                            <strong>Select Photo</strong><br>
                            <small style="color: #6c757d;">Choose hunting photo from your device</small>
                        </div>
                    </div>
                    
                    <div class="step-item" style="
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        padding: 1rem;
                        background: #f8f9fa;
                        border-radius: 8px;
                        margin-bottom: 1rem;
                    ">
                        <div style="
                            width: 40px;
                            height: 40px;
                            background: #28a745;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-weight: bold;
                        ">2</div>
                        <div style="text-align: left;">
                            <strong>GPS Auto-Detection</strong><br>
                            <small style="color: #6c757d;">Photo coordinates automatically mapped to hunting unit</small>
                        </div>
                    </div>
                    
                    <div class="step-item" style="
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        padding: 1rem;
                        background: #f8f9fa;
                        border-radius: 8px;
                        margin-bottom: 1.5rem;
                    ">
                        <div style="
                            width: 40px;
                            height: 40px;
                            background: #17a2b8;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-weight: bold;
                        ">3</div>
                        <div style="text-align: left;">
                            <strong>Unit Visualization</strong><br>
                            <small style="color: #6c757d;">Photo appears in heat map for discovered unit</small>
                        </div>
                    </div>
                </div>
                
                <div style="
                    padding: 1rem;
                    background: #e3f2fd;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    border-left: 4px solid #0066FF;
                ">
                    <strong style="color: #0066FF;">Example:</strong><br>
                    <small>Photo taken in Unit 2A will automatically increase the heat map intensity for that unit and update the photo counter.</small>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="close-modal" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                    ">Close</button>
                    <a href="https://rackmap.thingvalla.tech" target="_blank" style="
                        background: #0066FF;
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                        text-decoration: none;
                        display: inline-block;
                    ">Try RackMap</a>
                </div>
            </div>
        `;
        
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => document.body.removeChild(modal));
        
        document.body.appendChild(modal);
    }
    
    // Explore Units Demo
    function exploreUnitsDemo() {
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
                border-radius: 12px;
                text-align: center;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <h3 style="margin-bottom: 1.5rem; color: #2c3e50;">North Dakota Hunting Units</h3>
                
                <div style="
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                ">
                    <div class="unit-card" style="
                        padding: 1rem;
                        background: linear-gradient(135deg, rgba(255, 100, 100, 0.1), rgba(255, 100, 100, 0.05));
                        border-left: 4px solid #ff6464;
                        border-radius: 8px;
                        text-align: center;
                    ">
                        <strong style="color: #2c3e50;">Unit 2H</strong><br>
                        <small style="color: #dc3545; font-weight: 600;">14 photos</small><br>
                        <small style="color: #6c757d;">High Activity</small>
                    </div>
                    
                    <div class="unit-card" style="
                        padding: 1rem;
                        background: linear-gradient(135deg, rgba(255, 150, 100, 0.1), rgba(255, 150, 100, 0.05));
                        border-left: 4px solid #ff9664;
                        border-radius: 8px;
                        text-align: center;
                    ">
                        <strong style="color: #2c3e50;">Unit 2A</strong><br>
                        <small style="color: #fd7e14; font-weight: 600;">7 photos</small><br>
                        <small style="color: #6c757d;">Medium Activity</small>
                    </div>
                    
                    <div class="unit-card" style="
                        padding: 1rem;
                        background: linear-gradient(135deg, rgba(255, 150, 100, 0.1), rgba(255, 150, 100, 0.05));
                        border-left: 4px solid #ff9664;
                        border-radius: 8px;
                        text-align: center;
                    ">
                        <strong style="color: #2c3e50;">Unit 2B</strong><br>
                        <small style="color: #fd7e14; font-weight: 600;">5 photos</small><br>
                        <small style="color: #6c757d;">Medium Activity</small>
                    </div>
                    
                    <div class="unit-card" style="
                        padding: 1rem;
                        background: linear-gradient(135deg, rgba(255, 200, 100, 0.1), rgba(255, 200, 100, 0.05));
                        border-left: 4px solid #ffc864;
                        border-radius: 8px;
                        text-align: center;
                    ">
                        <strong style="color: #2c3e50;">Unit 3B1</strong><br>
                        <small style="color: #e67e22; font-weight: 600;">3 photos</small><br>
                        <small style="color: #6c757d;">Low Activity</small>
                    </div>
                </div>
                
                <div style="
                    padding: 1rem;
                    background: #f8f9fa;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    text-align: left;
                ">
                    <strong style="color: #2c3e50;">Filter Options:</strong><br>
                    <small style="color: #6c757d;">
                        • All Types: Bow, Rifle, Muzzleloader<br>
                        • All Animals: Deer, Elk, Antelope<br>
                        • All Time: This season, Last 30 days, Custom range
                    </small>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="close-modal" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                    ">Close</button>
                    <a href="https://rackmap.thingvalla.tech" target="_blank" style="
                        background: #0066FF;
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                        text-decoration: none;
                        display: inline-block;
                    ">Explore All Units</a>
                </div>
            </div>
        `;
        
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => document.body.removeChild(modal));
        
        document.body.appendChild(modal);
    }
    
    // Helper Functions
    function showFilterFeedback(filterType) {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #0066FF;
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 6px;
            z-index: 1000;
            font-size: 0.9rem;
            box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
        `;
        feedback.textContent = `Filtering by: ${filterType}`;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.transform = 'translateX(400px)';
            feedback.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(feedback)) {
                    document.body.removeChild(feedback);
                }
            }, 300);
        }, 2000);
    }
    
    function updateHeatMapForFilter(filterType) {
        const heatZones = document.querySelectorAll('.heat-zone');
        const photoCounts = document.querySelectorAll('.photo-count');
        
        // Simulate filter changing the data
        if (filterType === 'All Animals') {
            photoCounts.forEach(count => {
                const current = parseInt(count.textContent);
                count.textContent = Math.max(1, current - 2);
            });
        } else if (filterType === 'All Time') {
            photoCounts.forEach(count => {
                const current = parseInt(count.textContent);
                count.textContent = current + 3;
            });
        }
        
        // Animate the change
        heatZones.forEach(zone => {
            zone.style.transform = 'scale(1.1)';
            setTimeout(() => {
                zone.style.transform = 'scale(1)';
            }, 300);
        });
    }
    
    function updatePhotoCounters() {
        const photoCounts = document.querySelectorAll('.photo-count');
        photoCounts.forEach(count => {
            if (Math.random() > 0.7) {
                const current = parseInt(count.textContent);
                count.textContent = current + 1;
                
                // Flash effect
                count.style.fill = '#00ff88';
                setTimeout(() => {
                    count.style.fill = 'white';
                }, 1000);
            }
        });
    }
    
    function showUnitDetails(photoCount) {
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 1000;
            text-align: center;
        `;
        tooltip.innerHTML = `
            <strong>${photoCount} photos in this unit</strong><br>
            <small style="color: #ccc;">Click "Launch RackMap" to see all photos</small>
        `;
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip);
            }
        }, 3000);
    }
    
    function showUnitInfo(unitLabel) {
        const info = document.createElement('div');
        info.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            color: #2c3e50;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 1px solid #e9ecef;
        `;
        info.innerHTML = `
            <strong>Unit ${unitLabel}</strong><br>
            <small style="color: #6c757d;">North Dakota Hunting Unit</small>
        `;
        
        document.body.appendChild(info);
        
        setTimeout(() => {
            if (document.body.contains(info)) {
                document.body.removeChild(info);
            }
        }, 2000);
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
        
        // RackMap demo entrance animation
        const rackMapDemo = document.querySelector('.rackmap-demo');
        if (rackMapDemo) {
            rackMapDemo.style.opacity = '0';
            rackMapDemo.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                rackMapDemo.style.transition = 'all 0.8s ease';
                rackMapDemo.style.opacity = '1';
                rackMapDemo.style.transform = 'translateY(0)';
            }, 500);
        }
    }
});