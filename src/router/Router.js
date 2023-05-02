import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import License from '../pages/License'
import Organizations from '../pages/Organizations'

const Router = () => {
  return (
      <Routes>
        <Route path='/' 
          element={<Navigate to="home" element={<Home/>}/>}  
        />
        <Route path='home' element={<Home/>} />
        <Route path='license' element={<License/>} />
        <Route path='organizations' element={<Organizations/>} />
      </Routes>
  )
}

export default Router
