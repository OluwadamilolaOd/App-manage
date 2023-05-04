import React from 'react'
import TableAction from '../../components/Table/TableAction'
import { organizationProfileData } from '../../assets/data/organizationProfileData'

const OrganizationProfile = () => {
  return (
    <div>
      <div>Back Arrow</div>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <TableAction actionTable={organizationProfileData}/>
      </div>
    </div>
  )
}

export default OrganizationProfile