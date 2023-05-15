import '../Styles/modal.css'
function Modal({ setOpenModal, image, btnAction, title, description, handleOnclickEvent }) {
  return (
    <div className="modal">
    <div onClick={()=>{setOpenModal(false)}} className="overlay"></div>
    <div className="modal-content">
      <div className='modalTitle'><h2>Archive Organization</h2></div>     
      <div className="logoutmodalwrapper">
      <img className='modalImg' src={image} alt='Error'></img>
      <h4>{title}</h4>  
      <p>
        {description}
      </p>
      </div>
      <div className="modalbtnwrapper">
      <div className="modalButton"><button className="close-modal" onClick={()=>{setOpenModal(false)}}>
        Cancel
      </button>
      </div>
      <div className="modalButton"><button className="close-modal" onClick={handleOnclickEvent}>
        {btnAction}
      </button></div>
      </div>
    </div>
  </div>
  );
}

export default Modal;