import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Pages/Home'
import License from '../Pages/License/License'
import LicenseType from '../Pages/License/LicenseType'
import AddLicense from '../Pages/ActionPage/AddLicense'
import AddLicenseBand from '../Pages/ActionPage/AddLicenseBand'
import Organizations from '../Pages/Organization/Organizations'
import OrganizationProfile from '../Pages/Organization/OrganizationProfile'
import EditOrganization from '../Pages/ActionPage/EditOrganization'
import AddOrganization from '../Pages/ActionPage/AddOrganization'
import EmailOrganization from '../Pages/ActionPage/EmailOrganization'
import DowngradeLicense from '../Pages/ActionPage/DowngradeLicense'
import UpgradeLicense from '../Pages/ActionPage/UpgradeLicense'
import SuccessModal from '../Components/Modal/SuccessModal'
import EditLicense from '../Pages/ActionPage/EditLicense'
import OrgLicense from '../Pages/ActionPage/OrgLicense'
import LicRenewal from '../Pages/ActionPage/LicRenewal'
import EditCompanyDetails from '../Pages/ActionPage/EditCompanyDetails'

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
        <Route path='organizations/organizationProfile/:id/emailorganization/:id' element= {<EmailOrganization/>} />
        <Route path='organizations/organizationProfile/:id' element = {<OrganizationProfile/>}/>
        <Route path='organizations/editorganization' element = {<EditOrganization/>}/>
        <Route path='organizations/addorganization' element = {<AddOrganization/>}/>
        <Route path='organizations/organizationProfile/:id/downgradelicense/:id' element = {<DowngradeLicense/>}/>
        <Route path='organizations/organizationProfile/:id/upgradelicense/:id' element = {<UpgradeLicense/>}/>
        <Route path='organizations/organizationProfile/:id/Renewal/:id' element = {<LicRenewal/>}/>
        <Route path='license/successmodal' element = {<SuccessModal/>}/>
        <Route path='addorganizationLicense' element = {<OrgLicense/>}/>
        <Route path='editCompanyDetails' element = {<EditCompanyDetails/>}/>

      </Routes>
  )
}

export default Router
