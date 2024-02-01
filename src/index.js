function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  //let timeElement = document.querySelector("#time");
  //let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  //timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

  getForecast(response.data.city);
}


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
let day = days[date.getDay()];

if (minutes < 10) {
    minutes = `0${minutes}`;
  }

if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function searchCity(city) {
  let apiKey = "4503d48fb4e80094968o853a0b6dtf14";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}


function formatDay(timeStamp){
  let date = new Date(timeStamp * 1000);
  let days = ["Sun", "Mon",  "Tue", "Wed", "Thu", "Fri", "Sat"];
 

  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5 ){    
      forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      </div>
      <div class="weather-forecast">
      <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
      </div>
      <div class="weather-forecast">
      <div class="weather-forecast-temp">
      <span class="weather-forecast-temp-max">${Math.round(day.temperature.maximum)}°</span>
      </div>
      <div>
      <span class="weather-forecast-temp-min>${Math.round(day.temperature.minimum)}°</span>
      </div>
      </div>
    `;
  }
  });

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");

