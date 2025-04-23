```markdown
# ✈️ Flight Weather Dashboard

A web-based dashboard that visualizes real-time weather conditions across a user-defined flight route. Designed to assist pilots, aviation hobbyists, and researchers with quick, accurate insights into flight safety conditions using decoded METAR/TAF weather data.

---

## 🚀 Live Demo

👉 [Try it Live](https://your-live-demo-link.com) ← replace with your deployed link

![UI Screenshot](https://your-screenshot-link.com/dashboard.png) <!-- Replace with a hosted image -->

---

## 🧠 Features

- 🔍 Input flight plans using ICAO airport codes and cruising altitudes
- ☁️ Fetch and decode live METAR/TAF weather data
- 🗺️ Visualize route and weather conditions on an interactive map
- 🚦 Display airport-specific weather risks (VFR/IFR/Severe)
- 🧭 Color-coded dashboard for quick risk assessment
- 📱 Mobile-responsive frontend using Bootstrap

---

## 🧩 Tech Stack

| Layer      | Technologies Used                                     |
|------------|--------------------------------------------------------|
| Frontend   | HTML, CSS, JavaScript, Bootstrap, Leaflet.js          |
| Backend    | Python (Flask)                                        |
| APIs       | NOAA AviationWeather.gov (METAR/TAF), Open-METAR parser |
| Tools      | Git, GitHub, Flask Templates (Jinja2), Eraser.io      |

---

## 📦 Project Structure

```
flight-weather-dashboard/
├── static/              # JS, CSS, images
├── templates/           # HTML (Jinja2)
├── utils/
│   └── weather_utils.py # METAR decoding logic
├── data/                # Optional mock data
├── app.py               # Flask app entry point
├── requirements.txt     # Python dependencies
└── README.md
```

---

## ⚙️ Getting Started

These instructions will help you set up the project locally for development and testing purposes.

### 🛠️ Prerequisites

Make sure you have the following installed:

- Python 3.10 or later
- pip (Python package installer)
- Node.js (optional, if you're customizing frontend bundling)

---

## 🧪 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/flight-weather-dashboard.git
cd flight-weather-dashboard
```

2. Create a virtual environment (recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install the dependencies:

```bash
pip install -r requirements.txt
```

---

## 🚀 Running Locally

Start the Flask development server:

```bash
python app.py
```

Visit: http://localhost:5000 in your browser.

You can now input a sample flight plan like:

```
KJFK,15000,KBOS,12000,CYYZ,10000
```

The dashboard will:
- Fetch METAR data from each airport
- Decode and assess risk levels
- Display it on a table + interactive map

---

## 🧭 Sample Flight Plan Format

```
<ICAO_CODE>,<ALTITUDE>,<ICAO_CODE>,<ALTITUDE>,...
```

Example:

```
KPHX,15000,KBXK,12000,KLAX,11000
```

---

## 🗺️ Risk Level Logic

- 🟢 VFR (Good): Visibility > 6sm, ceiling > 3000 ft
- 🟡 Marginal VFR: Ceiling 1000–3000 ft or visibility 3–5sm
- 🔴 IFR (Poor): Ceiling < 1000 ft or visibility < 3sm
- ⚠️ Red Flag: Severe weather (TS, RA+, etc.)

---

## 📈 Roadmap

- [x] Real-time weather decoding
- [x] Interactive map with route drawing
- [x] Severity analysis with color-coded UI
- [ ] Save and export flight plans
- [ ] Add voice input support for pilots
- [ ] Global airport search autocomplete

---

## 🤝 Contributing

We love contributions! Feel free to:

- Create an issue
- Fork the repo
- Submit a pull request

```bash
git checkout -b my-feature
git commit -m "Add new feature"
git push origin my-feature
```

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---
