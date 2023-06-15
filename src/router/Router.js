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
import EmailOrganization from '../pages/Organization/EmailOrganization'
import DowngradeLicense from '../pages/License/DowngradeLicense'
import UpgradeLicense from '../pages/License/UpgradeLicense'
import SuccessModal from '../components/Modal/SuccessModal'
import EditLicense from '../pages/License/EditLicense'
import OrgLicense from '../pages/Organization/OrgLicense'

const Router = () => {
  return (
      <Routes>
        <Route path='/' 
          element={<Navigate to="home" element={<Home/>}/>}  
        />
        <Route path='home' element={<Home/>} />
        <Route path='license' element={<License/>} />
        <Route path='license/licenseType/:id' element = {<LicenseType/>}/>
        <Route path='license/licenseType/:id/license/EditLicese/:id' element = {<EditLicense/>}/>
        <Route path='license/addNewLicense' element = {<AddLicense/>}/>
        <Route path='license/addLicenseBand' element = {<AddLicenseBand/>}/>
        <Route path='organizations' element= {<Organizations/>} />
        <Route path='emailorganization' element= {<EmailOrganization/>} />
        <Route path='organizations/organizationProfile/:id' element = {<OrganizationProfile/>}/>
        <Route path='organizations/editorganization' element = {<EditOrganization/>}/>
        <Route path='organizations/addorganization' element = {<AddOrganization/>}/>
        <Route path='organizations/downgradelicense' element = {<DowngradeLicense/>}/>
        <Route path='organizations/organizationProfile/:id/upgradelicense/:id' element = {<UpgradeLicense/>}/>
        <Route path='license/successmodal' element = {<SuccessModal/>}/>
        <Route path='addorganizationLicense' element = {<OrgLicense/>}/>
      </Routes>
  )
}

export default Router
