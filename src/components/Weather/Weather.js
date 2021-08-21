import React from "react";

import Cloud from "../../svg/cloudy-day-3.svg";
import Wind from "../../svg/wind.svg";
import Card from "../Card/Card";

const Weather = ({ APIData, City }) => {
  const logData = () => {
    console.log(APIData);
  };

  const titleCase = (sentence) => {
    let arr = sentence.split(" ");
    let result = arr
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
    return result;
  };

  return (
    <div className="weather__wrapper">
      <div className="weather__container">
        <button onClick={logData}>Log Data</button>
        <p className="weather__time">Aug 18th, 16:05pm</p>
        <h2 className="weather__city">{City}</h2>
        <div className="weather__current_day">
          <img className="weather__main_icon" src={Cloud} alt="cloudy" />
          <div className="weather__temps">
            <h3>{Math.round(APIData.current.temp)}°F</h3>
            <p>
              Feels like {Math.round(APIData.current.feels_like)}°F.{" "}
              {titleCase(APIData.current.weather[0].description)}.
            </p>
          </div>
          <div className="weather__extra">
            <div className="weather__wind">
              <img className="weather__wind_icon" src={Wind} alt="wind" />
              <p>{Math.round(APIData.current.wind_speed) + "m/s"}</p>
            </div>
            <p>Humidity: {APIData.current.humidity}%</p>
            <p>Visibility: {APIData.current.visibility / 1000}km</p>
          </div>
        </div>
        <div className="weather__daily">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Weather;
