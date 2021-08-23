import React, { useState } from "react";

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

  const [nextFiveDays, setNextFiveDays] = useState([]);

  const getNextFiveDays = () => {
    const today = new Date();
    let upcomingDays = [];
    for (let i = 1; i < 6; i++) {
      let upcomingDay = new Date(today);
      upcomingDay.setDate(today.getDate() + i);
      upcomingDay.toLocaleDateString();
      upcomingDays.push(upcomingDay);
    }
    setNextFiveDays(upcomingDays);
  };

  return (
    <div className="weather__wrapper">
      <div className="weather__container">
        <button onClick={logData}>Log Data</button>
        {<button onClick={getNextFiveDays}>Get Next Five Days</button>}
        <p className="weather__time">{Date().slice(0, 24)}</p>
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
            <p>Dew Point: {Math.round(APIData.current.dew_point)}°F</p>
          </div>
        </div>
        <div className="weather__daily">
          {nextFiveDays.map((day, i) => (
            <Card day={day} key={day} data={APIData.daily[i + 1]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
