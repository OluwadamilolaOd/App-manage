import React, { useState } from 'react'
import DownloadModal from './DownloadModal'
import { useLocation } from 'react-router';

const DownloadLicense = () => {

  const [openDownloadModal, setOpenDownloadModal] = useState(true)
  const locations = useLocation();
  const data = locations.state.data;


  return (
  <>
    {openDownloadModal && <DownloadModal setOpenModal = {setOpenDownloadModal} data = {data} />}
  </>
  )
}

export default DownloadLicense