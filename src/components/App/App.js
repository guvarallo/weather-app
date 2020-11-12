import React from 'react';
import Container from '@material-ui/core/Container';

import './App.css';
import Weather from '../Weather/Weather';

function App() {
  return (
    <Container maxWidth="lg" style={{ textAlign: 'center' }}>
      <div className="main">
        <h1>Welcome to the Weather App!</h1>
        <h4>Forecast in real time for your location.</h4>
      </div>
      <Weather />
    </Container>
  );
}

export default App;
