import React from 'react'
import Navbar from '../Navigation/Navbar/Navbar'
import Sidebar from '../Navigation/Sidebar/Sidebar'
import './Dashboard.css'


function Dashboard(props) {
  return (
    <div className='Dashboard'>
        <Navbar />
        <div className="body">
            <Sidebar/>
            <main className="otherBar">
              {props.children}
            </main>
            
        </div>
      
    </div>
  )
}

export default Dashboard
