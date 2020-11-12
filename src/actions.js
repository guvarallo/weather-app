import { CHANGE_WEATHER_DATA } from './constants';

export const setWeatherData = coordinates => ({
  type: CHANGE_WEATHER_DATA,
  payload: coordinates,
});
