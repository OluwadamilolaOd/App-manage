import './Styles/modal.css'
function Modal({ setOpenModal, title, description }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalTitle">
          <h1>{title}</h1>
        </div>
        <div className="body">
          <p>{description}</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;