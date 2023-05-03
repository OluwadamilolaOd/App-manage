import React from 'react'
import DataTableAction from '../../components/DataTableAction'
import { organizationProfileData } from '../../assets/data/organizationProfileData'

const OrganizationProfile = () => {
  return (
    <div>
      <div>Back Arrow</div>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <DataTableAction actionTable={organizationProfileData}/>
      </div>
    </div>
  )
}

export default OrganizationProfile