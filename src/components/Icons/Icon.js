import React from 'react';

import { SVG } from "./Icon.styles";

// import moment from 'moment';

// Possible weather SVG's

import Cloud from '../../svg/cloudy-day-3.svg'
import Clear from '../../svg/day.svg';
import HeavyRain from '../../svg/rainy-6.svg';

const Icon = ({ currentWeather, currentTime }) => {
 
  // let fulldate = moment(currentTime*1000).format();
  // let formatted = moment(fulldate-25200).format("HH:mm");

  let setCurrent;
  let weather = {
    Rain: HeavyRain,
    Clouds: Cloud,
    Clear: Clear
  }

  setCurrent = weather[currentWeather];

  return (
    <SVG src={setCurrent}/>
  );
}


export default Icon;