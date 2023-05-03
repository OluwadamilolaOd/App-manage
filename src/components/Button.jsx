import React from "react";
import './Styles/button.css'

const Button = ({ className, title, btnEventHandler }) => {
  return (
    <div className="btnwrapper">
      <button onClick={btnEventHandler} className={className}>{title}</button>
    </div>
  );
};

export default Button;
