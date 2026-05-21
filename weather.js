const cityInput = document.querySelector("#city");
const searchButton = document.querySelector("button");

const temperatureElement = document.querySelector("#temperature");
const conditionElement = document.querySelector("#condition");
const humidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind");

const weatherInfo = document.querySelector(".weather-info");

const weatherIcon = document.querySelector("#weather-icon");

const body = document.querySelector("body");

async function getWeather() {
  const cityName = cityInput.value;

  if (cityName.trim() === "") {
    alert("Please enter a city name");

    return;
  }

  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;

  const geoResponse = await fetch(geoUrl);

  const geoData = await geoResponse.json();

  const latitude = geoData.results[0].latitude;

  const longitude = geoData.results[0].longitude;

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

  const weatherResponse = await fetch(weatherUrl);

  const weatherData = await weatherResponse.json();

  console.log(weatherData);

  const temperature = weatherData.current.temperature_2m;

  const humidity = weatherData.current.relative_humidity_2m;

  const windSpeed = weatherData.current.wind_speed_10m;

  const weatherCode = weatherData.current.weather_code;

  let condition = "";

  if (weatherCode === 0) {
    condition = "Clear";

    weatherIcon.innerText = "☀️";
  } else if (weatherCode === 1 || weatherCode === 2) {
    condition = "Cloudy";

    weatherIcon.innerText = "☁️";
  } else if (weatherCode === 3) {
    condition = "Overcast";

    weatherIcon.innerText = "☁️";
  } else if (weatherCode >= 51 && weatherCode <= 67) {
    condition = "Rain";

    weatherIcon.innerText = "🌧️";
  } else if (weatherCode >= 71 && weatherCode <= 77) {
    condition = "Snow";

    weatherIcon.innerText = "❄️";
  } else if (weatherCode >= 95 && weatherCode <= 99) {
    condition = "Thunderstorm";

    weatherIcon.innerText = "⛈️";
  } else {
    condition = "Unknown";

    weatherIcon.innerText = "🌍";
  }

  weatherInfo.style.display = "block";

  temperatureElement.innerText = `${temperature}°C`;

  conditionElement.innerText = condition;

  humidityElement.innerText = `${humidity}%`;

  windElement.innerText = `${windSpeed} km/h`;

  if (condition.includes("Clear")) {
    body.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
  } else if (condition.includes("Cloud") || condition.includes("Overcast")) {
    body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
  } else if (condition.includes("Rain") || condition.includes("Thunder")) {
    body.style.background = "linear-gradient(135deg, #4b79a1, #283e51)";
  } else if (condition.includes("Snow")) {
    body.style.background = "linear-gradient(135deg, #e6dada, #274046)";
  } else {
    body.style.background = "linear-gradient(135deg, #72EDF2, #5151E5)";
  }
}

searchButton.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});
