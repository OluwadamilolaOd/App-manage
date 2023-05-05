import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import License from '../pages/License/License'
import LicenseType from '../pages/License/LicenseType'
import AddLicense from '../pages/License/AddLicense'
import AddLicenseBand from '../pages/License/AddLicenseBand'
import Organizations from '../pages/Organization/Organizations'
import OrganizationProfile from '../pages/Organization/OrganizationProfile'
import EditOrganization from '../pages/Organization/EditOrganization'
import AddOrganization from '../pages/Organization/AddOrganization'

const Router = () => {
  return (
      <Routes>
        <Route path='/' 
          element={<Navigate to="home" element={<Home/>}/>}  
        />
        <Route path='home' element={<Home/>} />
        <Route path='license' element={<License/>} />
        <Route path='licenseType/:id' element = {<LicenseType/>}/>
        <Route path='addNewLicense' element = {<AddLicense/>}/>
        <Route path='addLicenseBand' element = {<AddLicenseBand/>}/>
        <Route path='organizations' element= {<Organizations/>} />
        <Route path='organizationProfile/:id' element = {<OrganizationProfile/>}/>
        <Route path='editorganization' element = {<EditOrganization/>}/>
        <Route path='addorganization' element = {<AddOrganization/>}/>
      </Routes>
  )
}

export default Router
