// UTC Time functionality
document.addEventListener('DOMContentLoaded', function() {
    const utcTimeDisplay = document.getElementById('utcTime');
    
    function updateUTCTime() {
        const now = new Date();
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        utcTimeDisplay.textContent = `${hours}:${minutes}:${seconds} UTC`;
    }
    
    // Update time every second
    setInterval(updateUTCTime, 1000);
    
    // Initial call to display time immediately
    updateUTCTime();
});