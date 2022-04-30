function currentDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${day}, ${month} ${date}`;
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${hours}:${minutes}`;
}
currentDate();

function forecastFormatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].main;
  let currentTemperature = document.querySelector("#current-temperature");
  celsiusTemp = response.data.main.temp;
  currentTemperature.innerHTML = Math.round(celsiusTemp);
  let temperatureMaximum = document.querySelector("#temperature-max");
  temperatureMaximum.innerHTML = Math.round(response.data.main.temp_max);
  let temperatureMinimum = document.querySelector("#temperature-min");
  temperatureMinimum.innerHTML = Math.round(response.data.main.temp_min);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecastWeather(response.data.coord);
}

function displayForecastWeather(response) {
  let forecast = response.data.daily;
  let forecastWeather = document.querySelector("#forecast-weather");
  let forecastWeatherHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastWeatherHTML =
        forecastWeatherHTML +
        `<div class="col-2">
                <div class="forecast-day"><strong>${forecastFormatDay(
                  forecastDay.dt
                )}</strong></div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="icon"
                  width="50"
                  id="forecast-icon"
                />
                <div><span>${Math.round(
                  forecastDay.temp.max
                )}</span>º/<span>${Math.round(
          forecastDay.temp.min
        )}</span>º</div>
              </div>`;
    }
  });
  forecastWeatherHTML = forecastWeatherHTML + `</div>`;
  forecastWeather.innerHTML = forecastWeatherHTML;
}

function getForecastWeather(coordinates) {
  let apiKey = "997f30ea63c7989ff9ae71ea98d23fea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecastWeather);
}

function search(city) {
  let apiKey = "997f30ea63c7989ff9ae71ea98d23fea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function submitForm(event) {
  event.preventDefault();
  let submitCity = document.querySelector("#search-city");
  search(submitCity.value);
}

function showTempFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTemperature = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showTempCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemp);
}

search("sevilla");

let celsiusTemp = null;

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", submitForm);

let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", showTempFahrenheit);

let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", showTempCelsius);
