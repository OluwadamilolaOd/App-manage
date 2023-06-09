import { useState } from "react";
import { useNavigate } from "react-router-dom";




const TableActionChildren = ({ obj, setOpenModal}) => {
  const [openOptions, setOpenOptions] = useState(false);
  const navigate = useNavigate();
  

  const handleEdit = () => {
    console.log(obj.id)
    navigate(`license/EditLicese/${obj.id}`)
  }

  return (
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
  );
};

export default TableActionChildren;
