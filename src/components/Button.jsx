import React from "react";
import './Styles/button.css'

const Button = ({ className, title }) => {
  return (
    <div className="btnwrapper">
      <button className={className}>{title}</button>
    </div>
  );
};

export default Button;
