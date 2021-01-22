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

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentDay} ${currentMonth} ${currentDate} ${currentHour}:${currentMinute}`;
}
let now = new Date();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatDate(now);

//search engine with weather info
function displayWeather(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
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
function toFarenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = 35.6;
}

function toCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = 2;
}

let farenheitTemp = document.querySelector("#fahrenheit-link");
farenheitTemp.addEventListener("click", toFarenheit);

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", toCelsius);

searchCity("Miami");
