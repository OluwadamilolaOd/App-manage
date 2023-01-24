import React from 'react'
import Navbar from '../Navigation/Navbar/Navbar'
import Sidebar from '../Navigation/Sidebar/Sidebar'
import './Dashboard.css'

function Dashboard() {
  return (
    <div className='Dashboard'>
        <Navbar />
        <div className="body">
            <Sidebar/>
            <div className="otherBar">c</div>
        </div>
      
    </div>
  )
}

export default Dashboard
