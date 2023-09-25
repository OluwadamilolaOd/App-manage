import "../Styles/modal.css";
function DowngradeModal({ setOpenModal, image, title, description, header }) {
  return (
    <div className="modal">
      <div
        onClick={() => {
          setOpenModal(false);
        }}
        className="overlay"
      ></div>
      <div className="modal-content">
        <div className="modalTitle">
          <h2>{header}</h2>
        </div>
        <div className="logoutmodalwrapper">
          <img className="modalImg" src={image} alt="Error"></img>
          <h4>{title}</h4>
          <p>
            {description}
          </p>
        </div>
        <div className="modalbtnwrapper">
          <div className="modalButton">
            <button
              className="close-modal"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DowngradeModal;
