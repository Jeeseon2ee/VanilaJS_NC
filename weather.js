const weather = document.querySelector('.weather');

const API_KEY = "f60a9f3e5fb1ba4a357f5bfef3f27501";
const COORDS = "coords";

async function getWeather (lat, lon) {
  const postResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  const post = await postResponse.json();
  const temperature = post.main.temp;
  const place = post.name;
  weather.innerText = `${temperature}'c in ${place}`
}

//fetch - then 쓰는 것 보다 async await가 요즘엔 더 선호되는 방식!
//전자보다 더 효율적이고 간단하기도 하다.

function saveCoords () {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleSuccess (position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
      latitude,
      longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleError () {
    console.log('Can not read your location.')
}

function askCoords () {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function loadedCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  };
}

function init() {
  loadedCoords();
};

init();