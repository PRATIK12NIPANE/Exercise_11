document.getElementById('fetchWeatherBtn').addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    const API_KEY = '93f26e3c57081a6210de53b8dcfdfea4';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const weatherData = await response.json();

        // Extracting the necessary details
        const cityName = weatherData.name;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const temperature = weatherData.main.temp;
        const feelsLike = weatherData.main.feels_like;
        const tempMin = weatherData.main.temp_min;
        const tempMax = weatherData.main.temp_max;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;

        // Displaying the weather information
        const weatherInfoDiv = document.getElementById('weatherInfo');
        weatherInfoDiv.innerHTML = `
            <div class="card">
                <div class="card-body text-center">
                    <h2 class="card-title">Weather information for ${cityName}:</h2>
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherDescription}" class="weather-icon">
                    <p class="card-text">Description: ${capitalizeFirstLetter(weatherDescription)}</p>
                    <p class="card-text">Temperature: ${(temperature - 273.15).toFixed(2)}°C</p>
                    <p class="card-text">Feels Like: ${(feelsLike - 273.15).toFixed(2)}°C</p>
                    <p class="card-text">Min Temperature: ${(tempMin - 273.15).toFixed(2)}°C</p>
                    <p class="card-text">Max Temperature: ${(tempMax - 273.15).toFixed(2)}°C</p>
                    <p class="card-text">Humidity: ${humidity}%</p>
                    <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('weatherInfo').innerHTML = `<p class="text-danger">Error fetching weather data. Please try again.</p>`;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
