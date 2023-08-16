import {useState, useEffect } from 'react';
import './card.css';
import { baseUrl } from '../../Hook/baseurl';

const Card = ({title,value, className, btnCardHandler}) => {
  return (
      <div className={className} onClick={btnCardHandler}>
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>
  );
};

export default Card;
