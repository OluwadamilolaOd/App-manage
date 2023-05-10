import { useState } from 'react';
import './App.css';
import Layout from './components/Layout';
import Modal from './components/Modal';

function App() {
  const [openModal, setOpenModal] = useState(false)
  var title = 'Archive Organization'
  return (
    <div>
    <Layout setOpenModal={setOpenModal} />
    {openModal && <Modal setOpenModal={setOpenModal} />}
    </div>
  );
}

export default App;
