import React, { useState } from "react";
import "./SCSS/styles.scss";
import 'animate.css';

import Spinner from "./components/Spinner/Spinner";
import Geocode from "react-geocode";
import Weather from "./components/Weather/Weather";
import Tooltip from "./components/Tooltip/Tooltip";

function App() {
  // Grabbing API keys from .env file
  const { REACT_APP_WEATHER_API, REACT_APP_GOOGLE_API } = process.env;

  // API authentification
  const WeatherAPI = REACT_APP_WEATHER_API;
  Geocode.setApiKey(REACT_APP_GOOGLE_API);

  // Setting initial state to avoid the Weather component not having any data prior to the fetch finishing.
  const initialState = {
    current: {
      temp: 0,
      feels_like: 0,
      weather: [
        {
          description: "Loading...",
        },
      ],
    },
  };

  const [APIData, setAPIData] = useState(initialState);
  const [Address, setAddress] = useState("");
  const [waiting, setWaiting] = useState(true);

  const getWeatherData = (lat, lng) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${WeatherAPI}&units=imperial`
    )
      .then((res) => res.json())
      .then((result) => {
        setAPIData(result);
      })
      .then(setWaiting(false));
  };

  const handleAddress = (Address) => {
    Geocode.fromAddress(Address).then(
      (res) => {
        const { lat, lng } = res.results[0].geometry.location;
        getWeatherData(lat, lng);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // This just makes sure the page does not reload on enter.
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddress(Address);
  };

  return waiting ? (
    <div className="wrapper">
      <div className="main animate__animated animate__fadeIn">
        <h1>WeatherAPI Test</h1>
        <Tooltip />
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <input
            className="input__text animate__animated animate__fadeIn"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter an address"
            
          />
        </label>
      </form>
    </div>
  ) : // Waiting for the data to be loaded, this will never be 0 with real data (or very rarely)
  APIData.current.temp === 0 ? (
    <Spinner />
  ) : (
    <Weather APIData={APIData} City={Address} />
  );
}

export default App;
