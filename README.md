# ✈️ Flight Weather Risk Visualization Dashboard

Website-link https://quiet-capybara-654dee.netlify.app/

**FlightRisk** is a sleek, design-focused application built for pilots and flight planners to assess weather-related risks in real-time using flight plans. It prioritizes **clarity**, **interactivity**, and **a clean UI** by decoding METAR data into simple visuals and risk levels — displayed on both a table and map. The app ensures responsive performance on both mobile and desktop, perfect for designathon showcases.

---

## 📚 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [git-clone](#clone-repository)

---

## ✨ Features

### 1. 🧾 Flight Plan Input
- Users enter a flight plan (e.g., `KPHX,1500,KBXK,12000,...`)
- Real-time processing using Flask backend and weather API
- Automatically decodes and processes METAR/TAF data
- Minimalistic input form with Bootstrap UI

![WhatsApp Image 2025-04-24 at 02 05 46_c274d9f2](https://github.com/user-attachments/assets/12f0e25c-6bcc-4a2c-b8af-9abb83d78c78)

---

### 2. 🌦️ Weather Risk Table
- Displays decoded weather data in a beautiful Bootstrap table
- Shows: Airport, Altitude, Weather Type, Risk Level
- Color-coded rows (Green 🟢, Yellow 🟡, Red 🔴) based on weather severity
![WhatsApp Image 2025-04-24 at 02 05 46_f8f28008](https://github.com/user-attachments/assets/0ee3eab4-96ed-4e96-a833-bc264638ca09)
![Screenshot 2025-04-24 015728](https://github.com/user-attachments/assets/577d146f-b489-4da5-b221-80fdca9da15f)

---

### 3. 🗺️ Flight Path Map Visualization
- Interactive map using **Leaflet.js** or **Google Maps API**
- Route drawn from flight plan with weather icons per stop
- Weather-based color-coded pins and tooltips
![WhatsApp Image 2025-04-24 at 02 05 47_1f4df110](https://github.com/user-attachments/assets/222699d5-39f0-4a6f-abf6-a0b11adee197)
---

### 4. 📊 Risk Indicator Icons
- Intuitive icons for: Clear skies ☀️, Clouds ☁️, Storms 🌩️, Rain 🌧️
- Helps users identify dangerous segments quickly
https://github.com/user-attachments/assets/9f930699-6bfb-4f03-ad8f-72682c8f75f7
---

## 🧑‍💻 Tech Stack

### Frontend:
- HTML5 / CSS3
- Bootstrap 5 (UI/UX + Responsive)
- JavaScript (Fetch API, DOM)
- Leaflet.js (Map rendering)

### Backend:
- Python (Flask)
- Requests (API data fetching)
- METAR data decoder

### Weather Data:
- [aviationweather.gov](https://aviationweather.gov) (or OpenWeatherMap fallback)
- METAR / TAF parsing

---
## File Structure
FlightWeather-RiskDashboard/
├── app.py                  
├── static/
│   └── styles.css         
├── templates/
│   └── index.html         
│   └── metar_decoder.py    
├── screenshots/            
└── .env                    


## 🧰 Installation

### Prerequisites:
- Python 3.8+
- `pip` (Python package manager)

### Install Dependencies:
```bash
pip install flask requests python-dotenv
