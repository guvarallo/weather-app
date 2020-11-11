/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import Weather from '../../utils/WeatherAPI';

function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [result, setResult] = useState({});

  navigator.geolocation.getCurrentPosition(pos => {
    // Get only 2 decimals for lat and lon, since the longer lon was giving error
    setLat(Math.round(pos.coords.latitude * 100) / 100);
    setLon(Math.round(pos.coords.longitude * 100) / 100);
  });

  useEffect(() => {
    Weather.getWeatherFromUserLocation(lat, lon)
      .then(data => {
        console.log(data);
        setResult(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {console.log(result.name)}
      {result.name && (
        <>
          <h1>{result.name}</h1>
          <h3>{result.main.temp}</h3>
          <p>{result.weather[0].description}</p>
        </>
      )}
      {!result.name && <h1>Loading...</h1>}
    </>
  );
}

export default App;
