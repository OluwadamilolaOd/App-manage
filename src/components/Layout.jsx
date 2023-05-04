import React, {useState} from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Router from '../router/Router'
import Modal from './Modal'

const Layout = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
    {openModal && <Modal setOpenModal={setOpenModal} />}
    <div className='layout'>
      <div>
        <Header />
      </div>
      <div className="main_layout">
        <Sidebar setOpenModal={setOpenModal}/>
        <div className="content">
          <Router/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Layout
