import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import License from '../pages/License'
import Organizations from '../pages/Organizations'
import OrganizationProfile from '../components/OrganizationProfile'

const Router = () => {
  return (
      <Routes>
        <Route path='/' 
          element={<Navigate to="home" element={<Home/>}/>}  
        />
        <Route path='home' element={<Home/>} />
        <Route path='license' element={<License/>} />
        <Route path='organizations' element={<Organizations/>} />
        <Route path='organizationProfile' element = {<OrganizationProfile/>}/>
      </Routes>
  )
}

export default Router
