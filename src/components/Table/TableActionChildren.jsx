import { useState } from "react";
import "./Styles/tablesheet.css";

const TableActionChildren = ({ obj }) => {
  const [openOptions, setOpenOptions] = useState(false);
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
          <div className="action-item">
            <p>Edit</p>
          </div>
          <div className="action-item">
            <p>Archive</p>
          </div>
        </div>
      )}
    </tr>
  );
};

export default TableActionChildren;
