/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';

import Weather from '../../utils/WeatherAPI';

function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [error, setError] = useState('');
  const [result, setResult] = useState({});

  navigator.geolocation.getCurrentPosition(pos => {
    // Get only 2 decimals for lat and lon, since the longer lon was giving error
    setLat(Math.round(pos.coords.latitude * 100) / 100);
    setLon(Math.round(pos.coords.longitude * 100) / 100);
  });

  function handleClick() {
    Weather.getWeatherFromUserLocation(lat, lon)
      .then(data => setResult(data))
      .catch(err => {
        setError(
          'Something went wrong, please try again or contact us for further investigation.',
        );
        console.log(err);
      });
  }

  return (
    <>
      <button onClick={handleClick}>Click</button>
      {result.name && (
        <>
          <h1>{result.name}</h1>
          <h3>{result.main.temp}</h3>
          <p>{result.weather[0].description}</p>
        </>
      )}
      {!result.name && !error && <h1>Loading...</h1>}
      {error && <p>{error}</p>}
    </>
  );
}

export default App;
