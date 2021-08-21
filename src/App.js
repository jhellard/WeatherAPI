import React, { useState } from "react";
import "./SCSS/styles.scss";

import Spinner from "./components/Spinner/Spinner";
import Geocode from "react-geocode";
import Weather from "./components/Weather/Weather";

function App() {
  // Grabbing API keys from .env file
  const { REACT_APP_WEATHER_API, REACT_APP_GOOGLE_API } = process.env;

  // API authentification
  const WeatherAPI = REACT_APP_WEATHER_API;
  Geocode.setApiKey(REACT_APP_GOOGLE_API);

  const initialState = {
    current: {
      temp: 0,
      feels_like: 0,
      weather: [
        {
          description: "Placeholder",
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

  return waiting ? (
    <div className="wrapper">
      <form>
        <label>
          <input
            className="input__text"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter an address"
          />
        </label>
        <input
          type="button"
          value="Submit"
          onClick={() => handleAddress(Address)}
        />
      </form>
    </div>
  ) : APIData.current.temp === 0 ? (
    <Spinner />
  ) : (
    <Weather APIData={APIData} City={Address} />
  );
}

export default App;
