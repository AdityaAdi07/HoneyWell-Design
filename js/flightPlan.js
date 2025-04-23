// Process flight plan and update UI 
function processFlightPlan(flightPlan) {
    // Parse the flight plan
    const elements = flightPlan.split(',');
    const airports = [];
    
    for (let i = 0; i < elements.length; i += 2) {
        if (i + 1 < elements.length) {
            airports.push({
                code: elements[i],
                altitude: elements[i + 1]
            });
        }
    }
    
    // Update the table with animation
    updateWeatherTable(airports);
    
    // Update the progress tracker with animation
    updateProgressTracker(airports);
    
    // Update summary with animation
    updateFlightSummary(airports);
    
    // Check for severe weather
    checkForSevereWeather(airports);
    
    // Update elevation chart with animation
    updateElevationChart(airports);
    
    return airports;
}

function updateWeatherTable(airports) {
    const weatherTable = document.getElementById('weatherTable');
    weatherTable.innerHTML = '';
    
    airports.forEach((airport, index) => {
        const weather = weatherData[airport.code] || { 
            description: "No data available", 
            icon: "question", 
            risk: "yellow" 
        };
        
        const row = document.createElement('tr');
        row.className = 'weather-row';
        row.style.animationDelay = `${index * 0.1}s`;
        
        let riskBadgeClass = '';
        let riskText = '';
        
        switch(weather.risk) {
            case 'green':
                riskBadgeClass = 'badge-success';
                riskText = 'VFR';
                break;
            case 'yellow':
                riskBadgeClass = 'badge-warning';
                riskText = 'MVFR';
                break;
            case 'red':
                riskBadgeClass = 'badge-danger';
                riskText = 'IFR';
                break;
        }
        
        row.innerHTML = `
            <td>
                <div class="airport-cell">
                    <strong>${airport.code}</strong>
                    <span class="airport-details">Click for details</span>
                </div>
            </td>
            <td>
                <div class="altitude-cell">
                    <span class="altitude-value">${airport.altitude}</span>
                    <span class="altitude-unit">ft</span>
                </div>
            </td>
            <td>
                <div class="weather-cell">
                    <i class="fas fa-${weather.icon} weather-icon"></i>
                    <span>${weather.description}</span>
                </div>
            </td>
            <td>
                <span class="badge ${riskBadgeClass} animate-badge">${riskText}</span>
            </td>
        `;
        
        // Add click event for airport details
        row.querySelector('.airport-cell').addEventListener('click', () => {
            showAirportDetails(airport, weather);
        });
        
        weatherTable.appendChild(row);
    });
}

function showAirportDetails(airport, weather) {
    const coords = airportCoordinates[airport.code];
    if (!coords) return;
    
    // Center map on airport
    map.setView([coords.lat, coords.lng], 10, {
        animate: true
    });
    
    // Open popup
    const marker = Array.from(markersLayer.getLayers())
        .find(layer => layer.getLatLng().lat === coords.lat);
    if (marker) marker.openPopup();
}

function updateProgressTracker(airports) {
    const progressTracker = document.getElementById('progressTracker');
    const airportsContainer = document.getElementById('airportsContainer');
    
    progressTracker.innerHTML = '';
    airportsContainer.innerHTML = '';
    
    // Create the progress bar segments with animation
    airports.forEach((airport, index) => {
        const weather = weatherData[airport.code] || { risk: "yellow" };
        
        // For progress bar
        if (index < airports.length - 1) {
            const segment = document.createElement('div');
            segment.className = 'progress-segment';
            segment.style.animationDelay = `${index * 0.2}s`;
            
            let segmentColor;
            switch(weather.risk) {
                case 'green':
                    segmentColor = 'var(--success)';
                    break;
                case 'yellow':
                    segmentColor = 'var(--warning)';
                    break;
                case 'red':
                    segmentColor = 'var(--danger)';
                    break;
            }
            
            segment.style.backgroundColor = segmentColor;
            segment.style.width = `${100 / (airports.length - 1)}%`;
            segment.style.left = `${(index / (airports.length - 1)) * 100}%`;
            
            progressTracker.appendChild(segment);
        }
        
        // For airport indicators with animation
        const airportPoint = document.createElement('div');
        airportPoint.className = 'airport-point';
        airportPoint.style.animationDelay = `${index * 0.2}s`;
        
        const indicator = document.createElement('div');
        indicator.className = 'airport-indicator';
        
        switch(weather.risk) {
            case 'green':
                indicator.style.backgroundColor = 'var(--success)';
                break;
            case 'yellow':
                indicator.style.backgroundColor = 'var(--warning)';
                break;
            case 'red':
                indicator.style.backgroundColor = 'var(--danger)';
                break;
        }
        
        const label = document.createElement('span');
        label.textContent = airport.code;
        
        airportPoint.appendChild(indicator);
        airportPoint.appendChild(label);
        
        // Add tooltip with altitude
        airportPoint.setAttribute('data-tooltip', `${airport.code}: ${airport.altitude} ft`);
        
        // Add click event to center map
        airportPoint.addEventListener('click', () => {
            const coords = airportCoordinates[airport.code];
            if (coords) {
                map.setView([coords.lat, coords.lng], 10, {
                    animate: true
                });
            }
        });
        
        airportsContainer.appendChild(airportPoint);
    });
}

function updateElevationChart(airports) {
    const elevationChart = document.getElementById('elevationChart');
    elevationChart.innerHTML = '';
    
    if (airports.length < 2) return;
    
    const altitudes = airports.map(a => parseInt(a.altitude));
    const maxAltitude = Math.max(...altitudes);
    
    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("preserveAspectRatio", "none");
    
    // Create gradient for path
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "elevation-gradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "0%");
    gradient.setAttribute("y2", "100%");
    
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("style", "stop-color:var(--primary);stop-opacity:0.2");
    
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("style", "stop-color:var(--primary);stop-opacity:0");
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // Create path points
    const points = airports.map((airport, index) => {
        const x = (index / (airports.length - 1)) * 100;
        const y = 100 - ((parseInt(airport.altitude) / maxAltitude) * 80);
        return { x, y, airport };
    });
    
    // Create area path
    const areaPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let pathData = `M ${points[0].x} 100 L ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
        pathData += ` L ${points[i].x} ${points[i].y}`;
    }
    
    pathData += ` L ${points[points.length - 1].x} 100 Z`;
    
    areaPath.setAttribute("d", pathData);
    areaPath.setAttribute("fill", "url(#elevation-gradient)");
    
    // Create line path
    const linePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let lineData = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
        lineData += ` L ${points[i].x} ${points[i].y}`;
    }
    
    linePath.setAttribute("d", lineData);
    linePath.setAttribute("stroke", "var(--primary)");
    linePath.setAttribute("stroke-width", "2");
    linePath.setAttribute("fill", "none");
    
    svg.appendChild(areaPath);
    svg.appendChild(linePath);
    
    // Add points
    points.forEach(point => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);
        circle.setAttribute("r", "4");
        circle.setAttribute("fill", "var(--primary)");
        circle.setAttribute("stroke", "white");
        circle.setAttribute("stroke-width", "2");
        
        // Add hover effect
        circle.addEventListener('mouseover', () => {
            circle.setAttribute("r", "6");
        });
        
        circle.addEventListener('mouseout', () => {
            circle.setAttribute("r", "4");
        });
        
        svg.appendChild(circle);
        
        // Add altitude labels
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", point.x);
        text.setAttribute("y", point.y - 8);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-size", "8");
        text.setAttribute("fill", "var(--neutral-600)");
        text.textContent = `${point.airport.altitude}`;
        
        svg.appendChild(text);
    });
    
    elevationChart.appendChild(svg);
}