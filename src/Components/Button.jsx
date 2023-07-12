import React from "react";
import "./Styles/button.css";
import { MdAddCircleOutline } from "react-icons/md";

const Button = ({ className, title, btnEventHandler }) => {
  return (
    <div onClick={btnEventHandler} className={className}>
        <MdAddCircleOutline className="wrapper-icon" />
        <span >
          {title}
        </span>
    </div>
  );
};

export default Button;
