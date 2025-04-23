// Airport coordinates (in a real app, these would come from an API)
const airportCoordinates = {
    "KPHX": { lat: 33.4342, lng: -112.0117 },
    "KBXK": { lat: 33.4200, lng: -112.6861 },
    "KPSP": { lat: 33.8297, lng: -116.5067 },
    "KLAX": { lat: 33.9416, lng: -118.4085 },
    "KSFO": { lat: 37.6213, lng: -122.3790 },
    "KLAS": { lat: 36.0840, lng: -115.1537 },
    "KJFK": { lat: 40.6413, lng: -73.7781 },
    "KBOS": { lat: 42.3656, lng: -71.0096 },
    "KPHL": { lat: 39.8721, lng: -75.2411 }
};

let map;
let routeLayer;
let markersLayer;

// Initialize the map
function initMap() {
    if (!map) {
        map = L.map('map').setView([39.8283, -98.5795], 4);
        
        // Add tile layer (use different styles for dark/light mode)
        const lightTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        });
        
        const darkTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            className: 'dark-tiles'
        });
        
        // Add the appropriate tile layer based on current theme
        if (document.body.classList.contains('dark-mode')) {
            darkTiles.addTo(map);
        } else {
            lightTiles.addTo(map);
        }
        
        // Create layers for routes and markers
        routeLayer = L.layerGroup().addTo(map);
        markersLayer = L.layerGroup().addTo(map);
        
        // Handle theme changes
        document.addEventListener('themeChanged', (e) => {
            if (e.detail.isDark) {
                map.removeLayer(lightTiles);
                darkTiles.addTo(map);
            } else {
                map.removeLayer(darkTiles);
                lightTiles.addTo(map);
            }
        });
    }
}

// Update map with flight route
function updateMap(airports) {
    if (!map) return;
    
    // Clear existing layers
    routeLayer.clearLayers();
    markersLayer.clearLayers();
    
    // Create route coordinates
    const routeCoords = airports.map(airport => {
        const coords = airportCoordinates[airport.code];
        if (coords) {
            return [coords.lat, coords.lng];
        }
        return null;
    }).filter(coords => coords !== null);
    
    // Draw route line
    if (routeCoords.length > 1) {
        const routeLine = L.polyline(routeCoords, {
            color: '#0ea5e9',
            weight: 3,
            opacity: 0.8,
            dashArray: '10, 10',
            animate: true
        });
        
        routeLayer.addLayer(routeLine);
    }
    
    // Add markers for each airport
    airports.forEach((airport, index) => {
        const coords = airportCoordinates[airport.code];
        if (!coords) return;
        
        const weather = weatherData[airport.code] || { 
            description: "No data available", 
            icon: "question", 
            risk: "yellow" 
        };
        
        let markerColor;
        switch(weather.risk) {
            case 'green':
                markerColor = '#10b981';
                break;
            case 'yellow':
                markerColor = '#f59e0b';
                break;
            case 'red':
                markerColor = '#ef4444';
                break;
            default:
                markerColor = '#64748b';
        }
        
        const marker = L.circleMarker([coords.lat, coords.lng], {
            radius: 8,
            fillColor: markerColor,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        });
        
        // Add popup with airport info
        marker.bindPopup(`
            <div class="map-popup">
                <h3>${airport.code}</h3>
                <p>Altitude: ${airport.altitude} ft</p>
                <p>Weather: ${weather.description}</p>
                <p>Risk Level: ${weather.risk.toUpperCase()}</p>
            </div>
        `);
        
        // Add hover effect
        marker.on('mouseover', function() {
            this.setRadius(12);
            this.openPopup();
        });
        
        marker.on('mouseout', function() {
            this.setRadius(8);
            this.closePopup();
        });
        
        markersLayer.addLayer(marker);
    });
    
    // Fit map bounds to show all markers
    if (routeCoords.length > 0) {
        map.fitBounds(routeCoords, {
            padding: [50, 50],
            animate: true
        });
    }
}