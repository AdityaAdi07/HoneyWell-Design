// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const flightPlanInput = document.getElementById('flightPlan');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const closeAlert = document.getElementById('closeAlert');
    
    // Initialize map
    initMap();
    
    // Close alert event
    closeAlert.addEventListener('click', () => {
        const alertBanner = document.getElementById('alertBanner');
        
        // Add fade out animation
        alertBanner.style.opacity = '0';
        alertBanner.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            alertBanner.style.display = 'none';
            // Reset styles for next time
            alertBanner.style.opacity = '1';
            alertBanner.style.transform = 'translateY(0)';
        }, 300);
    });
    
    // Clear button event
    clearBtn.addEventListener('click', () => {
        flightPlanInput.value = '';
        resultsContainer.style.display = 'none';
        
        // Clear map
        if (routeLayer) routeLayer.clearLayers();
        if (markersLayer) markersLayer.clearLayers();
    });
    
    // Submit button event
    submitBtn.addEventListener('click', () => {
        const flightPlan = flightPlanInput.value.trim();
        
        if (!flightPlan) {
            alert('Please enter a flight plan');
            return;
        }
        
        // Add button loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // Process with slight delay to show animation
        setTimeout(() => {
            const airports = processFlightPlan(flightPlan);
            
            // Update map
            updateMap(airports);
            
            // Show results container with animation
            resultsContainer.style.opacity = '0';
            resultsContainer.style.display = 'grid';
            
            setTimeout(() => {
                resultsContainer.style.transition = 'opacity 0.5s ease';
                resultsContainer.style.opacity = '1';
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-search"></i> <span>Get Weather Information</span>';
                
                // Scroll to results
                resultsContainer.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        }, 600);
    });
    
    // Initialize with a default flight plan
    flightPlanInput.value = "KPHX,1500,KBXK,12000,KPSP,5000,KLAX,1500";
    
    // Add animated placeholder
    setupAnimatedPlaceholder(flightPlanInput);
    
    // Setup responsive adjustments
    setupResponsiveUI();
    
    // Add keyboard shortcut for submit
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && document.activeElement === flightPlanInput) {
            submitBtn.click();
        }
    });
});

// Function to create animated placeholder effect
function setupAnimatedPlaceholder(input) {
    const placeholders = [
        "KPHX,1500,KBXK,12000,KPSP,5000,KLAX,1500",
        "KSFO,2000,KLAX,10000,KLAS,5000",
        "KJFK,1500,KBOS,8000,KPHL,3000"
    ];
    
    let currentIndex = 0;
    
    // Only start animation if input is not focused and has no value
    function updatePlaceholder() {
        if (document.activeElement !== input && !input.value) {
            currentIndex = (currentIndex + 1) % placeholders.length;
            input.setAttribute('placeholder', placeholders[currentIndex]);
        }
    }
    
    setInterval(updatePlaceholder, 3000);
    
    // Reset placeholder on focus
    input.addEventListener('focus', () => {
        input.setAttribute('placeholder', placeholders[0]);
    });
}

// Function to handle responsive UI adjustments
function setupResponsiveUI() {
    const handleResize = () => {
        const width = window.innerWidth;
        const mapContainer = document.querySelector('.map-container');
        
        if (width < 768) {
            if (mapContainer) {
                mapContainer.style.height = '250px';
            }
        } else {
            if (mapContainer) {
                mapContainer.style.height = '400px';
            }
        }
        
        // Update map size when container size changes
        if (map) {
            map.invalidateSize();
        }
    };
    
    // Initial call
    handleResize();
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
}