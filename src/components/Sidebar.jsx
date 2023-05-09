import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { sideLinks } from '../assets/data/sideLinks'
import './Styles/sidebar.css'

const Sidebar = ({setOpenModal}) => {
  
  return (
    <div className="sidebar">
      <div className="sidebar_content">
        <div className="menu">
          <ul className="sidebar_list">
            {
              sideLinks.map((item,index)=>(
                <li className="sidebar_item" key={index}>
                  <NavLink 
                  to={item.path}
                  className={(sideClass) => 
                    sideClass.isActive ? "sidebar_active sidebar_link" : "sidebar_link"}>
                    <img src={item.icon} alt='' className={item.icon}></img>
                    {item.display}
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="sidebar_bottom">
          <button onClick={()=>{
            setOpenModal(true)
          }}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
