// Sample weather data - in a real implementation, this would come from a server/API
const weatherData = {
    "KPHX": { description: "Clear skies", icon: "sun", risk: "green" },
    "KBXK": { description: "Partly cloudy", icon: "cloud-sun", risk: "yellow" },
    "KPSP": { description: "Thunderstorms", icon: "cloud-bolt", risk: "red" },
    "KLAX": { description: "Light haze", icon: "smog", risk: "green" }
};

// Function to check for severe weather conditions
function checkForSevereWeather(airports) {
    const alertBanner = document.getElementById('alertBanner');
    const alertMessage = document.getElementById('alertMessage');
    
    let severeWeatherFound = false;
    let severeAirport = '';
    let severeWeatherDesc = '';
    
    airports.forEach(airport => {
        const weather = weatherData[airport.code] || { risk: "yellow", description: "Unknown conditions" };
        
        if (weather.risk === 'red') {
            severeWeatherFound = true;
            severeAirport = airport.code;
            severeWeatherDesc = weather.description;
        }
    });
    
    if (severeWeatherFound) {
        alertMessage.textContent = `⚠ Severe Weather Alert: ${severeWeatherDesc} near ${severeAirport} ⚡`;
        alertBanner.style.display = 'flex';
        
        // Flash animation effect
        alertBanner.classList.add('pulsate');
        setTimeout(() => {
            alertBanner.classList.remove('pulsate');
        }, 1000);
    } else {
        alertBanner.style.display = 'none';
    }
}

// Function to update flight summary
function updateFlightSummary(airports) {
    const airportCount = document.getElementById('airportCount');
    const weatherStatus = document.getElementById('weatherStatus');
    const riskAssessment = document.getElementById('riskAssessment');
    
    // Update airport count
    airportCount.textContent = airports.length;
    
    // Calculate weather status and risk assessment
    let dangerCount = 0;
    let warningCount = 0;
    
    airports.forEach(airport => {
        const weather = weatherData[airport.code] || { risk: "yellow" };
        
        if (weather.risk === 'red') {
            dangerCount++;
        } else if (weather.risk === 'yellow') {
            warningCount++;
        }
    });
    
    // Change text and colors based on conditions
    if (dangerCount > 0) {
        weatherStatus.textContent = 'Dangerous';
        riskAssessment.textContent = 'Not Suitable';
        weatherStatus.style.color = 'var(--danger)';
        riskAssessment.style.color = 'var(--danger)';
    } else if (warningCount > 0) {
        weatherStatus.textContent = 'Moderate';
        riskAssessment.textContent = 'Use Caution';
        weatherStatus.style.color = 'var(--warning)';
        riskAssessment.style.color = 'var(--warning)';
    } else {
        weatherStatus.textContent = 'Good';
        riskAssessment.textContent = 'Safe to Fly';
        weatherStatus.style.color = 'var(--success)';
        riskAssessment.style.color = 'var(--success)';
    }
}