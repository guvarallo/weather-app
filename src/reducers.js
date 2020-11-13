import {
  FETCH_WEATHER_PENDING,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
} from './constants';

const initialState = {
  isPending: false,
  weather: {},
  error: '',
};

const weatherReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_WEATHER_PENDING:
      return { ...state, isPending: true };
    case FETCH_WEATHER_SUCCESS:
      return { ...state, weather: action.payload, isPending: false };
    case FETCH_WEATHER_ERROR:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};

export default weatherReducer;
