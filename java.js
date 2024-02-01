function yes (){` 

<div class="weather-forecast">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
      <div class="weather-forecast-temp">
      <div>
      <span class="weather-forecast-temp-max">${Math.round(day.temperature.maximum)}°</span>
      </div>
      <div>
      <span class="weather-forecast-temp-min>${Math.round(day.temperature.minimum)}°</span>
      </div>
      </div>
      </div>`
}