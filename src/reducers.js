const initialState = {
  isPending: false,
  weather: {},
};

const weatherReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FETCH_WEATHER_PENDING':
      return { ...state, isPending: true };
    case 'FETCH_WEATHER_SUCCESS':
      return { ...state, weather: action.payload, isPending: false };
    default:
      return state;
  }
};

export default weatherReducer;
