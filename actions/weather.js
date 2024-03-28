const COMPLETE_SEARCH_WEATHER = 'COMPLETE_SEARCH_WEATHER'
const NOT_FOUND_SEARCH_WEATHER = 'NOT_FOUND_SEARCH_WEATHER'


export const completeSearchWeather = weather => ({
  type: COMPLETE_SEARCH_WEATHER,
  weather,
});

export const notFoundSearchWeather = () => ({
  type: NOT_FOUND_SEARCH_WEATHER,
});


export const fetchWeather = city => (dispatch) => {
  const endpoint = `https://samples.openweathermap.org/data/2.5/forecast?q=${city},us&appid=b6907d289e10d714a6e88b30761fae22`
  // api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=caf2fb27396d37e482cc490be6f1bbd2`
  //  samples.openweathermap.org/data/2.5/forecast&appid=b6907d289e10d714a6e88b30761fae22
  fetch(endpoint)
  .then(response => {
      return response.json();
    }).then(jsonResponse => {
     if (jsonResponse.cod == 200) {
       dispatch(completeSearchWeather(jsonResponse));
     } else {
       dispatch(notFoundSearchWeather())
     }

  }).catch((err) => {
      console.log('err');
  });

};
