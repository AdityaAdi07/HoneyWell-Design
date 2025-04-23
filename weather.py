from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
import requests
import os

load_dotenv()

API_KEY = os.getenv("API_KEY")
MONGO_URI = os.getenv("MONGO_URI")
BASE_URL = "http://api.openweathermap.org/data/2.5/weather"

# Flask app setup
app = Flask(__name__)
CORS(app, resources={r"/": {"origins": "*"}})

# MongoDB setup
client = MongoClient(MONGO_URI)
db = client["flight_weather"]
collection = db["weather_reports"]

@app.route('/')
def home():
    return "Welcome to the Flight Weather API (with MongoDB + dotenv)"

@app.route('/processFlightPlan', methods=['POST'])
def process_flight_plan():
    flight_plan = request.json.get('flightPlan', '')
    airports = [code.strip() for code in flight_plan.split(',')]
    weather_data = get_weather_data(airports)

    # Save each entry to MongoDB with timestamp
    for entry in weather_data:
        entry["timestamp"] = datetime.utcnow()
        collection.insert_one(entry)

    return jsonify(weather_data)

def get_weather_data(locations):
    weather_info = []
    for loc in locations:
        try:
            response = requests.get(BASE_URL, params={
                "q": loc,
                "appid": API_KEY,
                "units": "metric"
            })
            data = response.json()

            if response.status_code == 200:
                weather = data["weather"][0]["main"]
                risk = "VFR" if weather in ["Clear", "Clouds"] else "IFR"
                weather_info.append({
                    "airport": loc,
                    "weather": weather,
                    "risk": risk
                })
            else:
                weather_info.append({
                    "airport": loc,
                    "weather": "Unavailable",
                    "risk": "Unknown"
                })
        except Exception as e:
            weather_info.append({
                "airport": loc,
                "weather": f"Error: {str(e)}",
                "risk": "Unknown"
            })
    return weather_info

if __name__ == "__main__":
    app.run(debug=True)
