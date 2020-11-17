import apiConfig from './utils/apiKey';

import {
  FETCH_WEATHER_PENDING,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
} from './constants';

const url = 'http://api.openweathermap.org/data/2.5/weather?';
const key = apiConfig.apiKey;

export const fetchWeather = () => {
  return async dispatch => {
    dispatch({ type: FETCH_WEATHER_PENDING });
    let lat, lon;
    const getPosition = () => {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    const data = await getPosition()
      .then(pos => {
        // Get only 2 decimals for lat and lon, since the longer lon was giving error
        lat = Math.round(pos.coords.latitude * 100) / 100;
        lon = Math.round(pos.coords.longitude * 100) / 100;
        return fetch(`${url}lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
          .then(res => res.json())
          .then(data => data)
          .catch(err => err);
      })
      .catch(err => err);

    if (data.message) {
      dispatch({ type: FETCH_WEATHER_ERROR, payload: data.message });
    }

    dispatch({ type: FETCH_WEATHER_SUCCESS, payload: data });
  };
};
