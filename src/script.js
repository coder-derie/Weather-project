// date and time

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
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
    "December"
  ];
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  return `${currentDay} ${currentMonth} ${currentDate} ${formatHours(date)}`;
}
let now = new Date();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatDate(now);

//search engine with weather info
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    celsiusTemperature
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#feels-like").innerHTML = `Feels like:${Math.round(
    response.data.main.feels_like
  )}℃`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

}

function formatHours(timestamp){
  let date = new Date(timestamp)
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return ` ${currentHour}:${currentMinute}`;
}
function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 5; index++){
    forecast = response.data.list[index];
    forecastElement.innerHTML += 
  `<div class="col">
    <div class="card border mb-3" style="max-width: 10rem;">
      <div class="card-header">${formatHours(forecast.dt* 1000)}</div>
          <div class="card-body">
            <img src ="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
              <p>${Math.round(forecast.main.temp_max)}℃/${Math.round(forecast.main.temp_min)}℃</p>
        </div>
      </div>
    </div>
  </div>`
  }
  

  
}

function showCity(event) {
  event.preventDefault();
  let showCity = document.querySelector("#city-input").value;
  searchCity(showCity);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "4aebdc826d2f6fe4955b6c3fa809665d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4aebdc826d2f6fe4955b6c3fa809665d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-btn");
currentLocationButton.addEventListener("click", getLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

//bonus
function displayFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  
  celsiusTemp.classList.remove("active");
  farenheitTemp.classList.add("active");
  let farenheitTemperature = (celsiusTemperature * 9)/ 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");

  farenheitTemp.classList.remove("active");
  celsiusTemp.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let farenheitTemp = document.querySelector("#fahrenheit-link");
farenheitTemp.addEventListener("click", displayFarenheit);

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", displayCelsius);

searchCity("Miami");



