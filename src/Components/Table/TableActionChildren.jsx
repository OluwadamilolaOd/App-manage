import { useState, useEffect } from "react";
import { baseUrl } from "../../Hook/baseurl";
import { useNavigate } from "react-router-dom";
import "./Styles/tablesheet.css";
import Modal from "../Modal/Modal";
import archiveIcon from '../../assets/images/archive_red.png'




const TableActionChildren = ({ obj, deleteItem}) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const url = `${baseUrl}/licenseType/${obj.id}`
  const navigate = useNavigate();
    //get token from local storage and set it to state
    const token =localStorage.getItem("token")
  

  const handleEdit = () => {
    navigate(`EditLicese/${obj.id}`,{state:{data:obj}})
    return 
  }

 const handleArchive = () => {
  deleteItem(obj.id)
  setOpenModal(false)
};

useEffect(()=> {
  const fetchData = async () => {
    try {
      await fetch(url, {
        method: "GET",
        Authorization: `Bearer ${token}`,
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
},[])
 

  return (
    <>
    <tr key={obj.id}>
      <td>{obj.licenseBand}</td>
      <td>{obj.maximumUser}</td>
      <td>{obj.partNumber}</td>
      <td>{obj.status}</td>
      <td className="actionbtn" onClick={() => setOpenOptions(!openOptions)}>
        ...
      </td>
      {openOptions && (
        <div className="action">
          <div className="action-item" onClick={handleEdit}>
            <p>Edit</p>
          </div>
          <div className="action-item" onClick={() => {
                setOpenModal(true);
              }}>
            <p>Archive</p>
          </div>
        </div>
      )}
    </tr>
    {openModal && <Modal 
                    setOpenModal={setOpenModal}
                    header={"Archive License"}
                    image={archiveIcon}
                    btnAction={"Archive"}
                    title= {obj.licenseBand}
                    description={"Are you sure you want to archive?"}
                    handleOnclickEvent={handleArchive}
      />}
    </>
  );
};

export default TableActionChildren;
