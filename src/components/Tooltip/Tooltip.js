import React from "react";
import ReactTooltip from "react-tooltip";

import QuestionMark from "../../svg/question.svg";


const Tooltip = () => {
  return (
    <>
      <ReactTooltip id="global" effect="solid">
        <p>
          Thanks for checking out my WeatherAPI test website! This site is built
          using ReactJS and the OpenWeatherMap API.
        </p>
        <br />
        <p>This site utlilizes key elements of React including:</p>
        <ul>
          <li>State Management</li>
          <li>Route Management</li>
          <li>Data Fetching</li>
          <li>Styled using SCSS/Styled Components</li>
        </ul>
        <p>Click to learn more...</p>
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
    </>
  );
};

export default Tooltip;
