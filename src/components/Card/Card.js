import React from 'react';
import Day from '../../svg/day.svg';

const Card = () => {
  return (
    <div className='card__wrapper'>
      <h3 className='card__day'>Monday</h3>
      <img className='card__svg' src={Day} alt='Day' />
      <p className='card__temp'>50°F</p>
      <p className='card__feel'>Feels like 99°F</p>
    </div>
  );
}

export default Card;