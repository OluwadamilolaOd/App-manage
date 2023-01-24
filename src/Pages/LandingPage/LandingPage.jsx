import React from 'react'
import Login from '../../Components/Login/Login'
import LoginImg from '../../Components/LoginImg/LoginImg'
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className='landingPage'>
        <section className="page">
            <Login />
            <LoginImg />
        </section>
        <section className='footerPage'> 
            <h3>© Ha-Shem Limited 2022. All Rights Reserved. Powered by </h3>
        </section>

    </div>
    
  )
}

export default LandingPage


