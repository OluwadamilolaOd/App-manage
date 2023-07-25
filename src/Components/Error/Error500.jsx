import React from "react";
import "./error.css";
import { BiError } from "react-icons/bi";


const Error500 = () => {
  return (
    <div >
      <div className="errorSection">
        <div className="error">
          <div className="text-error">
            <BiError className="error-icon" />
            <h1>Sorry! Something went wrong</h1>
            <div className="btn-page">
              <button className="btn" onClick={()=>window.location.reload()}>Try again</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error500