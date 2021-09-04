import React from 'react';

import { SVG } from "./IconSm.styles";

// Possible weather SVG's

import Cloud from '../../svg/cloudy-day-3.svg'
import Clear from '../../svg/day.svg';
import HeavyRain from '../../svg/rainy-6.svg';

const Icon = ({ currentWeather }) => {

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