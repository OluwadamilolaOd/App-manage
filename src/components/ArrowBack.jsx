import React from "react";
import './Styles/arrowback.css'
import BackArrow from '../assets/images/back_arrow_blue.png'


const ArrowBack = (handleBackArrow) => {
  return (
    <div className="arrow" onClick={handleBackArrow}>
      <img src={BackArrow} alt="" />
      Back
    </div>
  );
};

export default ArrowBack;
