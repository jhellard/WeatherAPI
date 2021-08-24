import React, { useState } from "react";
import "./SCSS/styles.scss";

import Spinner from "./components/Spinner/Spinner";
import Geocode from "react-geocode";
import Weather from "./components/Weather/Weather";
import ReactTooltip from "react-tooltip";

import QuestionMark from "./svg/question.svg";

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
          <div className="main">
            <h1>WeatherAPI Test</h1>
            <ReactTooltip id="global" effect="solid">
              <p>
                Thanks for checking out my WeatherAPI test website! This site is
                built using ReactJS and the OpenWeatherMap API.
              </p>
              <br />
              <p>This site utlilizes key elements of React including:</p>
              <ul>
                <li>State Management</li>
                <li>Route Management</li>
                <li>Data Fetching</li>
                <li>Styled using SCSS/Styled Components</li>
              </ul>
            </ReactTooltip>
            <a className="github" href="https://github.com/jhellard">
              <img
                data-tip
                data-for="global"
                className="question"
                src={QuestionMark}
                alt="question mark"
              />
            </a>
          </div>

          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
              <input
                className="input__text"
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
