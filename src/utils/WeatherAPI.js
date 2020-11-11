import apiConfig from './apiKey';

const url = 'http://api.openweathermap.org/data/2.5/weather?';
const key = apiConfig.apiKey;

const Weather = {
  getWeatherFromUserLocation(lat, lon) {
    return fetch(`${url}lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
      .then(res => res.json())
      .then(data => data);
  },
};

export default Weather;
