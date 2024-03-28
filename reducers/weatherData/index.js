const COMPLETE_SEARCH_WEATHER = 'COMPLETE_SEARCH_WEATHER'
const NOT_FOUND_SEARCH_WEATHER = 'NOT_FOUND_SEARCH_WEATHER'

const initialState = {
  weather: null,
  notFound: false,
};

const weatherDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE_SEARCH_WEATHER:
      return {
        weather: action.weather,
        notFound: false,
      };
    case NOT_FOUND_SEARCH_WEATHER:
      return {
        weather: null,
        notFound: true,
      };
    default:
      return state;
  }
};

export { weatherDataReducer as default };
