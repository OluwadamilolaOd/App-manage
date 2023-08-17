import "../Styles/modal.css";

function Modal({
  setOpenModal,
  image,
  btnAction,
  title,
  description,
  handleOnclickEvent,
  header,
  imageIcon,
}) {
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
          <p>{description}</p>
        </div>
        <div className="modalbtnwrapper">
          <div className="modalButton">
            <button
              className="close-modal cancel-modal"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancel
            </button>
          </div>
          <div className="modalButton">
            <button className="close-modal action-modal" onClick={handleOnclickEvent}>
              <img className="modalIcon" src={imageIcon} alt="Error"></img>
              {btnAction}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
