import React from 'react'
import Login from '../../Components/Login/Login'
import LoginImg from '../../Components/LoginImg/LoginImg'
import './LandingPage.css'
import Undraw from '../../img/undraw.png'

const LandingPage = () => {
  return (
    <div className='landingPage'>
        <div className="page">
          <div className="formPage">
            <h1>Software License</h1>
            <label for="email">Email Address</label>
            <input type="email" placeholder='youremail@gmail.com' id='email' name='email' />
            <label for="password">Password</label>
            <input type="password" placeholder='**********' id='password' name='password' />
            <button>Login</button> 
          </div>
          <div className="imgPage">
            <img src={Undraw} alt="" />
          </div>
        </div>
        <div className='page'> 
            <h3>© Ha-Shem Limited 2022. All Rights Reserved. Powered by <a href="/">Havis 360</a></h3>
        </div>

    </div>
    
  )
}

export default LandingPage


