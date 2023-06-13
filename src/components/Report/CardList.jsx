import React from 'react'
import './card.css';
import Card from './Card'

const CardList = () => {
  return (
    <div className='card-container'>
        <Card title={"Number of Organisations"} value={100} className = {"redBackg"} />
        <Card title={"Number of Licenses"} value={100} className = {"greenBackg"} />
        <Card title={"Number of Licenses due to Expire This Month and Next Month"} value={100} className = {"blueBackg"} />
        <Card title={"Number of Expired Licenses"} value={100} className = {"orangeBackg"} />
        <Card title={"Number of Active License"} value={100} className = {"yellowBackg"} />
        <Card title={"Number of New License"} value={100} className = {"blueBackg"} />
        <Card title={"Number of Renew"} value={100} className = {"greenBackg"} />
        <Card title={"Number of Organisations"} value={100} className = {"blueBackg"} />
        <Card title={"Number of Organisations"} value={100} className = {"orangeBackg"} />
    </div>
  )
}

export default CardList