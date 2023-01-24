import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className='formPage'>
      <h1>Software License</h1>
        <label for="email">Email Address</label>
        <input type="email" placeholder='youremail@gmail.com' id='email' name='email' />
        <label for="password">Password</label>
        <input type="password" placeholder='**********' id='password' name='password' />
        <button>Login</button>      
    </div>
  )
}

export default Login
