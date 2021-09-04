import React from "react";

import IconSm from '../Icons/IconSm';

const Card = ({ day, data: APIData }) => {
  // Day we receive is a shortened version, below just makes it a full day.
  let days = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  let currentDay = day.toString().slice(0, 3);
  currentDay = days[currentDay];

  return (
    <div className="card__wrapper">
      <h3 className="card__day">{currentDay}</h3>
      <IconSm currentWeather={APIData.weather[0].main} currentTime={APIData.dt}/>
      <p className="card__temp">High: {Math.round(APIData.temp.max)}</p>
      <p className="card__temp">Low: {Math.round(APIData.temp.min)}</p>
    </div>
  );
};

export default Card;
