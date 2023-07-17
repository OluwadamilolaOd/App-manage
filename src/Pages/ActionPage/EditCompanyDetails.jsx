// import React from 'react'
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify'
// import Banner from '../../Components/Banner'
// import ArrowBack from '../../Components/ArrowBack';

// const EditCompanyDetails = () => {
//     const [companyName, setCompanyName] = useState("");
//     const [emailAddress, setEmailAddress] = useState("");
//     const [location, setLocation] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const navigate = useNavigate();
//     const [error, setError] = useState(false);


//      // react-toastify
//   const notifySuccess = () =>
//   toast.success("User created successfully", {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });
// const notifyError = () =>
//   toast.error("Some error occurred", {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });

// const handleBackArrow = () => {
//   navigate("/organizations");
// };

// // let handleSubmitCompanyDetails = async (event) => {
// //     event.preventDefault();
// //     if (selectedOption.value === "newLicenseType") {
// //       recurring = "";
// //     } else {
// //       recurring = "Recurring License Type";
// //     }
// //     try {
// //       const response = await fetch(url, {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           organizationName: companyName,
// //           email: emailAddress,
// //           phoneNumber: phoneNumber,
// //           address: location,
// //           CreatedBy: graphData.mail,
// //         }),
// //       });
// //           setCompanyName("");
// //           setEmailAddress("");
// //           setPhoneNumber("");
// //           setLocation("");
// //           notifySuccess("");
   
// //     if (
// //       companyName.length == 0 ||
// //       emailAddress.length == 0 ||
// //       location.length == 0 ||
// //       phoneNumber.length == 0
// //     ) {
// //       setError(true);
// //     }
// //     if (
// //       companyName &&
// //       emailAddress &&
// //       location &&
// //       phoneNumber
// //     ) {
// //       console.log(
// //         "Company Name: ",
// //         companyName,
// //         "\nEmail Address: ",
// //         emailAddress, 
// //         "\nLocation: ",
// //         location,
// //         "\nPhone Number: ",
// //         phoneNumber,
// //       );
// //     }
// //      } catch (err) {
// //       notifyError.log(err);
// //     }
// //   };
//   return (
//     <div>
//       <Banner title={"Edit Company Details"} />
//       <form className="add_container">
//         <ArrowBack handleBackArrow={handleBackArrow} />
//         <div className="forminput">
//           <div className="section">
//             <div className="section-form">
//               <label htmlFor="company-name">Company Name:</label>
//               <input
//                 type="text"
//                 id="company-name"
//                 value={companyName}
//                 onChange={(event) => setCompanyName(event.target.value)}
//               />
//               {/* {error && companyName.length <= 0 ? (
//                 <label className="error">This field is required.</label>
//               ) : (
//                 ""
//               )} */}
//             </div>
//             <div  className="section-form">
//               <label htmlFor="email-address">Email Address:</label>
//               <input
//                 type="email"
//                 id="email-address"
//                 value={emailAddress}
//                 onChange={(event) => setEmailAddress(event.target.value)}
//               />
//               {/* {error && emailAddress.length <= 0 ? (
//                 <label className="error">This field is required.</label>
//               ) : (
//                 ""
//               )} */}
//             </div>
//           </div>
//           <div className="section">
//             <div className="section-form">
//               <label htmlFor="location">Location:</label>
//               <input
//                 type="text"
//                 id="location"
//                 value={location}
//                 onChange={(event) => setLocation(event.target.value)}
//               />
//               {/* {error && location.length <= 0 ? (
//                 <label className="error">This field is required.</label>
//               ) : (
//                 ""
//               )} */}
//             </div>
//             <div  className="section-form">
//               <label htmlFor="phone-number">Phone Number:</label>
//               <input
//                 type="tel"
//                 id="phone-number"
//                 value={phoneNumber}
//                 onChange={(event) => setPhoneNumber(event.target.value)}
//               />
//               {/* {error && phoneNumber.length <= 0 ? (
//                 <label className="error">This field is required.</label>
//               ) : (
//                 ""
//               )} */}
//             </div>
//           </div>
//         </div>
//         <div className="btnRight">
//           <button type="submit" >
//             Edit
//           </button>
//         </div>
//       </form>
//       <ToastContainer />
//     </div>
//   )
// }

// export default EditCompanyDetails
