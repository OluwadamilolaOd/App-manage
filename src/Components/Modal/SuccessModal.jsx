import "../Styles/modal.css";
import success from "../../assets/images/success_green.png";
import { useNavigate } from "react-router-dom";
function SuccessModal({ setOpenModal, description }) {
  const navigate = useNavigate();

  const handleGoBackHome = () => {
    navigate("/");
  };
  return (
    <div className="modal">
      <div
        onClick={() => {
          setOpenModal(false);
        }}
        className="overlay"
      ></div>
      <div className="modal-content">
        <div className="modalwrapper">
          <img className="modalImg" src={success} alt="Success"></img>
          <h4>Success</h4>
          <p></p>
        </div>
        <div className="successModalBtn">
          <button className="" onClick={handleGoBackHome}>
            Go back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
