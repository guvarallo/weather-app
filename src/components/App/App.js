import React, { useCallback, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import './App.css';
import Weather from '../../utils/WeatherAPI';

function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState({});

  const handleWeatherFetch = useCallback(() => {
    const currentTime = new Date();
    setTime(`${currentTime.getHours()}:${currentTime.getMinutes()}`);

    setLoading(true);
    Weather.getWeatherFromUserLocation(lat, lon)
      .then(data => {
        console.log(data);
        setResult({
          temp: Math.round(data.main.temp),
          feels_like: Math.round(data.main.feels_like),
          name: data.name,
          icon: data.weather[0].icon,
          description: data.weather[0].description,
        });
        setLoading(false);
      })
      .catch(err => {
        setError(
          'Something went wrong, please try again or contact us for further investigation.',
        );
        setLoading(false);
        console.log(err);
      });
  }, [lat, lon]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      // Get only 2 decimals for lat and lon, since the longer lon was giving error
      setLat(Math.round(pos.coords.latitude * 100) / 100);
      setLon(Math.round(pos.coords.longitude * 100) / 100);
      handleWeatherFetch();
    });
  }, [handleWeatherFetch]);

  return (
    <Container maxWidth="lg" style={{ textAlign: 'center' }}>
      <div className="main">
        <h1>Welcome to the Weather App!</h1>
        <h4>
          Please click the button for updated weather information on your
          current location:
        </h4>
      </div>
      {loading && (
        <>
          <h4>Please wait while we get the information</h4>
          <CircularProgress />
        </>
      )}
      {result.name && !loading && (
        <Paper className="paper" elevation={3} style={{ marginTop: '20px' }}>
          <div className="city">
            <h1>{result.name}</h1>
            <p>Local time: {time}</p>
          </div>
          <div>
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/w/${result.icon}.png`}
                alt="weather icon"
              />
              <h3>{result.temp}°C</h3>
            </div>
            <p>
              Feels like: {result.feels_like}°C, {result.description}.
            </p>
            <Button
              variant="contained"
              color="primary"
              onClick={handleWeatherFetch}
            >
              Update Info
            </Button>
          </div>
        </Paper>
      )}
      {error && <p>{error}</p>}
    </Container>
  );
}

export default App;
