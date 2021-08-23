import React from "react";
import Day from "../../svg/day.svg";

const Card = ({ day, data }) => {
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
      <img className="card__svg" src={Day} alt="Day" />
      <p className="card__temp">High: {Math.round(data.temp.max)}</p>
      <p className="card__temp">Low: {Math.round(data.temp.min)}</p>
    </div>
  );
};

export default Card;
