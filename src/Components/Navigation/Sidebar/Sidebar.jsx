import React, {useState} from 'react'
import './Sidebar.css'
import { HiOutlineLogout } from "react-icons/hi";
import {SidebarData} from "../../Data/DataSidebar"


function Sidebar() {

  const [selected, setSelected] = useState(0)

  return (
    <div className='sidebar'>
       <div className="menu">
        {SidebarData.map((item, index)=>{
            return(
              <div className={selected===index?'menuItem active': 'menuItem' }
                key={index}
                onClick={() => setSelected(index)}
              >
                  <item.icon  className='icon'/>
                  <span>
                    {item.heading}
                  </span>
              </div>
            )
          })}

        <div className="menuItem">
          <div>
            <HiOutlineLogout />
          </div>
            <span>Log Out</span>
        </div>
       </div>
    </div>
  )
}

export default Sidebar
