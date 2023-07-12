import React from 'react';
import './card.css';

const Card = ({title,value, className}) => {
  return (
      <div className={className}>
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>
  );
};

export default Card;
