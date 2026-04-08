/**
 * Simple Weather App
 * Uses OpenWeatherMap API (requires a free API key).
 * Replace 'YOUR_API_KEY' with your actual key.
 */
const apiKey = '8ec284407fd4106c7f6bb1ed96b8d875'; // <-- Insert your OpenWeatherMap API key here
const apiBase = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherResult = document.getElementById('weatherResult');

function kelvinToCelsius(k) {
    return (k - 273.15).toFixed(1);
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const description = weather[0].description;
    const tempC = kelvinToCelsius(main.temp);
    const humidity = main.humidity;

    weatherResult.innerHTML = `
        <strong>${name}</strong><br>
        ${description}<br>
        Temperature: ${tempC}°C<br>
        Humidity: ${humidity}%`;
}

function fetchWeather(city) {
    if (!city) {
        weatherResult.textContent = 'Please enter a city name.';
        return;
    }

    // Step 1: Geocode city name to get latitude & longitude using Nominatim (no API key)
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
    fetch(geocodeUrl)
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Geocoding failed');
            }
            return resp.json();
        })
        .then(results => {
            if (!results.length) {
                throw new Error('City not found');
            }
            const { lat, lon, display_name } = results[0];

            // Step 2: Get current weather from Open‑Meteo (no API key)
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
            return fetch(weatherUrl).then(r => {
                if (!r.ok) {
                    throw new Error('Weather service failed');
                }
                return r.json().then(data => ({ data, display_name }));
            });
        })
        .then(({ data, display_name }) => {
            // Transform Open‑Meteo response to format expected by displayWeather
            const transformed = {
                name: display_name.split(',')[0], // use the city name part
                main: { temp: data.current_weather.temperature },
                weather: [{ description: `Wind ${data.current_weather.windspeed} km/h` }]
            };
            displayWeather(transformed);
        })
        .catch(err => {
            weatherResult.textContent = err.message;
        });
}

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        weatherResult.textContent = 'Loading...';
        fetchWeather(city);
    }
});