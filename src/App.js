import React, { useEffect, useState } from 'react';

function App() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const apiKey = '7ac325fd18f5ce43cc1cc62f3e3da84f';
  const [result, setResult] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setLat(pos.coords.latitude);
      setLon(pos.coords.longitude);
    });
  }, []);

  if (lat && lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&unit=metric`,
    )
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  return <h1>Hey!</h1>;
}

export default App;
