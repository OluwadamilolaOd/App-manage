import React, {useState} from 'react'
import './Sidebar.css'
import { HiOutlineLogout } from "react-icons/hi"
import {SidebarData} from "../../../Data/DataSidebar"
import { useNavigate } from 'react-router-dom';


function Sidebar() {

  const [selected, setSelected] = useState(0)
  const navigate = useNavigate();

  const handleData = (index)=> {
    setSelected(index)
    if (index===0) {
        navigate('/', { replace: true });
        console.log('Homepage')
    }
    else if (index===1) {
        navigate('/user', { replace: true });
        console.log('User')
    }
    else {
        navigate('/organizations', { replace: true });
        console.log('Organization')
    }
    console.log(index)
  }
  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   };
  // }, [input]);

  return (
    <div className='sidebar'>
       <div className="menu">
        {SidebarData.map((item, index)=>{
            return(
              <div className={selected===index?'menuItem active': 'menuItem' }
                key={index}
                   onClick={()=> handleData(index)}
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
