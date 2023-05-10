import './Styles/modal.css'
function Modal({ setOpenModal, description }) {
  return (
    <div className="modal">
    <div onClick={()=>{setOpenModal(false)}} className="overlay"></div>
    <div className="modal-content">
      <div className='modalTitle'><h2>Archive Organization</h2></div>     
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        perferendis suscipit officia recusandae, eveniet quaerat assumenda
        id fugit, dignissimos maxime non natus placeat illo iusto!
        Sapiente dolorum id maiores dolores? Illum pariatur possimus
        quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
        placeat tempora vitae enim incidunt porro fuga ea.
      </p>
      <button className="close-modal" onClick={()=>{setOpenModal(false)}}>
        X
      </button>
      <div className="modalButton"><button className="close-modal" onClick={()=>{setOpenModal(false)}}>
        Cancle
      </button></div>
    </div>
  </div>
  );
}

export default Modal;