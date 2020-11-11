import apiConfig from './apiKey';

const url = 'http://api.openweathermap.org/data/2.5/weather?';
const key = apiConfig.apiKey;

const Weather = {
  getCurrentLocation(lat, lon) {
    return fetch(`${url}${lat}&lon=${lon}&appid=${key}&units=metric`)
      .then(res => res.json())
      .then(data => data);
  },
};

export default Weather;
