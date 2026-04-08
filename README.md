# Weather App (No API Key Required)

A simple web‑based weather application that fetches the current weather for a city **without requiring any API keys**.  
It uses:

* **Nominatim** (OpenStreetMap) – free geocoding service to convert a city name to latitude/longitude.
* **Open‑Meteo** – free weather API (no authentication) to get current temperature and wind data.

The app displays the city name, temperature (°C) and wind speed.

## Live Demo

Open `weather-app/index.html` in any modern browser.  
Enter a city name and click **Get Weather** – a new request is made and the result appears below the button.

## How It Works

1. **Geocode** – The city name is sent to Nominatim:
   ```js
   https://nominatim.openstreetmap.org/search?format=json&q={city}
   ```
   The first result provides `lat`, `lon`, and a `display_name`.

2. **Weather** – Those coordinates are passed to Open‑Meteo:
   ```js
   https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true
   ```
   The response contains `temperature` (°C) and `windspeed` (km/h).

3. **Display** – The data is transformed to match the existing `displayWeather` function, which renders:
   ```
   <strong>{city}</strong><br>
   Wind {windspeed} km/h<br>
   Temperature: {temperature}°C<br>
   ```

## Project Structure

```
weather-app/
│
├─ index.html      # Basic HTML layout
├─ style.css       # Simple styling for the card UI
├─ script.js       # JavaScript logic (Nominatim + Open‑Meteo)
└─ README.md       # This file
```

## Setup

No build step or package manager is required.

1. Clone or download the repository.
2. Open `weather-app/index.html` in a browser.
3. Start querying weather for any city.

## Dependencies

* **Browser** – Works in any recent Chrome, Edge, Firefox, or Safari.
* **Network Access** – Must be able to reach `nominatim.openstreetmap.org` and `api.open-meteo.com`.

## License

This project is provided under the MIT License. Feel free to fork, modify, and use it however you like.

---

*Created by Cline – your AI‑assisted developer.*