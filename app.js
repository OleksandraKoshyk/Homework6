function handleSubmit(event) {
  event.preventDefault();
  let cityUser = document.querySelector("#city-input");
  cityUser = cityUser.value;
  search(cityUser);
}
function search(cityUser) {
  let apiKey = "2ae2f19a65e443eebd09dd05cfe0af8a";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityUser}&appid=${apiKey}&units=metric`;
  axios.get(urlApi).then(showTemp);
}
function showCurrent() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2ae2f19a65e443eebd09dd05cfe0af8a";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(urlApi).then(showTemp);
}

function showTemp(response) {
  let tempRound = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  let weather = document.querySelector("#weather");
  let city = document.querySelector("#city");
  temperature.innerHTML = `${tempRound}`;
  weather.innerHTML = response.data.weather[0].main;
  city.innerHTML = response.data.name;
}

function formatData() {
  let now = new Date();
  now.getMinutes(); // 0,1,2, 12
  now.getHours(); //1, 2, 3, 4
  now.getDate(); //1, 2, 3, 4
  now.getDay(); // 0, 1, 2
  now.getMonth(); // 0, 1, 2
  now.getFullYear(); // 2021
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = document.querySelector("#dayInWeek");
  day.innerHTML = days[now.getDay()];
  let hour = document.querySelector("#hour");
  if (now.getHours() < 10) {
    hour.innerHTML = `0${now.getHours()}`;
  }
  hour.innerHTML = `${now.getHours()}`;

  let minute = document.querySelector("#minute");
  minute.innerHTML = `${now.getMinutes()}`;
  if (now.getMinutes() < 10) {
    minute.innerHTML = `0${now.getMinutes()}`;
  }
}
formatData();
search("Zaporizhzhia");
let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", showCurrent);
