import { CHANGE_WEATHER_DATA } from './constants';

const initialState = {
  result: {},
};

export const getWeatherData = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_WEATHER_DATA:
      return Object.assign({}, state, { result: action.payload });
  }
};
