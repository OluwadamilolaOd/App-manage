import React from 'react'
import TableAction from '../../components/Table/TableAction'
import { organizationProfileData } from '../../assets/data/organizationProfileData'
import ArrowBack from '../../components/ArrowBack'

const OrganizationProfile = () => {

  const handleBackArrow = () => {

  }
  
  return (
    <div>
      <ArrowBack handleBackArrow = {handleBackArrow}/>
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