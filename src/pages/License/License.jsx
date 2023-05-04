import React from 'react'
import Banner from '../../components/Banner'
import { useNavigate } from 'react-router-dom'

const License = () => {

  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate("/addNewLicense")
  }
  return (
    <div>
      <Banner title={"Manage License"} isbtn={true} btnClassname={"btnwhite"} btntitle={"Add New License"} btnEventHandler={handleEventClick} />

    </div>
  )
}

export default License
