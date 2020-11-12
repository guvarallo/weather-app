import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import './App.css';
import { fetchWeather } from '../../actions';

function App() {
  const [time, setTime] = useState('');
  const dispatch = useDispatch();
  const { isPending, weather } = useSelector(state => state);

  function handleUpdateInfo() {
    dispatch(fetchWeather());
  }

  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    setTime(`${hours}:${minutes < 10 ? `0${hours}` : minutes}`);
    dispatch(fetchWeather());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" style={{ textAlign: 'center' }}>
      <div className="main">
        <h1>Welcome to the Weather App!</h1>
        <h4>Forecast in real time for your location.</h4>
      </div>
      {isPending && (
        <>
          <h4>Please wait while we get the information</h4>
          <CircularProgress color="secondary" />
        </>
      )}
      {weather.name && !isPending && (
        <Paper className="paper" elevation={3} style={{ marginTop: '20px' }}>
          <div className="city">
            <h1>{weather.name}</h1>
            <p>Local time: {time}</p>
          </div>
          <div>
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="weather icon"
              />
              <h3>
                {Math.round(weather.main.temp)}°C,{' '}
                {weather.weather[0].description}.
              </h3>
            </div>
            <p>Feels like: {Math.round(weather.main.feels_like)}°C.</p>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateInfo}
            >
              Update Info
            </Button>
          </div>
        </Paper>
      )}
      {/* {error && (
        <Alert severity="error" style={{ width: '70%', margin: 'auto' }}>
          {error}
        </Alert>
      )} */}
    </Container>
  );
}

export default App;
