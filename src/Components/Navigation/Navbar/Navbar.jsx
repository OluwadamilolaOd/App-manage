import React from 'react'
import './Navbar.css'
import { RiArrowDropDownLine, RiQuestionnaireLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";

function Navbar() {
  return (
    <div className='navBar'>
      <div className="navWrapper">
        <div className='navContainer'>
          <div className="navIcon">
            <RiQuestionnaireLine className='icon'/>
          </div>
          <div className="navIcon">
            <IoNotificationsOutline  className='icon' />
            <span className="navIconBadge">2</span>
          </div>
          <div className="navIcon"> 
            <p className='txt'>
              Joel Badmus <br /> 
              Ha-Shem Limited <br />
            </p>
          </div>
          <div className="navIcon"> 
            <BsPersonCircle className='icon' />
          </div>
          <div className="navIcon">
            <RiArrowDropDownLine className='icon' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
