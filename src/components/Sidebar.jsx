import React from 'react'
import { NavLink } from 'react-router-dom'
import { sideLinks } from '../assets/data/sideLinks'
import './Styles/sidebar.css'

const Sidebar = () => {
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
                    {/* <i className={item.icon}></i> */}
                    {item.display}
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="sidebar_bottom">
          <span>Logout</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
