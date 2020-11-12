import apiConfig from './apiKey';

const url = 'http://api.openweathermap.org/data/2.5/weather?';
const key = apiConfig.apiKey;

const Weather = {
  async getWeatherFromUserLocation() {
    // Due to the async nature of geolocation, we fist need to resolve it as a
    // Promise, and only then make the fetch with the correct lat and lon.
    let lat, lon;
    const getPosition = () => {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    const data = await getPosition().then(pos => {
      // Get only 2 decimals for lat and lon, since the longer lon was giving error
      lat = Math.round(pos.coords.latitude * 100) / 100;
      lon = Math.round(pos.coords.longitude * 100) / 100;
      return fetch(`${url}lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
        .then(res => res.json())
        .then(data => data);
    });

    return data;
  },
};

export default Weather;
