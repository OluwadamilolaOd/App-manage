import { useState } from 'react';
import './App.css';
import Layout from './components/Layout';
import Modal from './components/Modal/Modal';
import logoutImg from './assets/images/logout_red.png'

function App() {
  const [openModal, setOpenModal] = useState(false)
  var title = 'Archive Organization'
  return (
    <div>
    <Layout setOpenModal={setOpenModal} />
    {openModal && <Modal setOpenModal={setOpenModal} image={logoutImg} btnAction={'Log out'} title={'Log out'} description={'Are you sure you want to Log out?'} />}
    </div>
  );
}

export default App;
