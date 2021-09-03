import React from "react";

import Cloud from "../../svg/cloudy-day-3.svg";
import Wind from "../../svg/wind.svg";
import BackArrow from "../../svg/back.svg";
import Card from "../Card/Card";
import Icon from './Icon/Icon';

const Weather = ({ APIData, City }) => {
  const titleCase = (sentence) => {
    let arr = sentence.split(" ");
    let result = arr
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
    return result;
  };

  console.log(APIData);

  let nextFiveDays = [];

  const getNextFiveDays = () => {
    const today = new Date();
    let upcomingDays = [];
    for (let i = 1; i < 6; i++) {
      let upcomingDay = new Date(today);
      upcomingDay.setDate(today.getDate() + i);
      upcomingDay.toLocaleDateString();
      upcomingDays.push(upcomingDay);
    }
    nextFiveDays = upcomingDays;
  };

  getNextFiveDays();

  return (
    <div className="weather__wrapper">
      <a className="weather__back_link" href="/">
        <img className="weather__back" src={BackArrow} alt="back arrow" />
      </a>
      <div className="weather__container">
        <p className="weather__time">{Date().slice(0, 24)}</p>
        <h2 className="weather__city">{City}</h2>
        <div className="weather__current_day">
          <Icon currentWeather={APIData.current.weather[0].main}/>
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
