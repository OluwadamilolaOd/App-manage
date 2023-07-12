import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'
import Undraw from '../../img/undraw.png'
import { useState, useContext } from 'react'
import { AuthContext } from '../../Context/Auth/AuthContext'

const LandingPage = () => {

  const [credentials, setCredentials] = useState({
    userName:undefined,
    password:undefined
   });

   const [errorMessage, setErrorMessage] = useState("");

   const [Token, setToken] = useState("")

   const {user, loading, error, dispatch} = useContext(AuthContext);

   const navigate = useNavigate()

   const handleChange = (e) => {
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
 }
      const url = 'https://localhost:7181/Auth/login'

   const handleLogin = async e => {

    e.preventDefault()
    console.log(credentials)
    dispatch({type:"LOGIN_START"})
    try{
        const res = await axios.post(url, credentials );
        dispatch({type:"LOGIN_SUCCESS", payload: res.data});
        navigate('/')
        console.log(res.data)
    }catch (err){
        dispatch({type:"LOGIN_FAILURE", payload:err.response.data.error})
        console.log(err.response.data.error)
        setErrorMessage(err.data)
   }
  }

  return (
    <div className='landingPage'>
        <div className="page">
          <div className="formPage">
            <h1>Software License</h1>
            <label htmlFor="email">Email Address</label>
            <input type="email" placeholder='youremail@gmail.com' id='userName' name='userName' onChange={handleChange} />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='**********' id='password' name='password' onChange={handleChange} />

            {error && <span className='errorMsg'>{error.message}</span>}
            <button onClick={handleLogin}>Login</button> 
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


