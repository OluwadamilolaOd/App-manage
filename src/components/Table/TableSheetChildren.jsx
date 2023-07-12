import React from "react";
import { useNavigate } from "react-router-dom";

const TableSheetChildren = ({ obj }) => {

    const navigate = useNavigate();

    const handleNavigate = (itemId) => navigate(`licenseType/${itemId}`)
  return (
    <tr key={obj.id} onClick={() => handleNavigate(obj.id)}>
      <td>{obj.licenseName}</td>
      <td>{obj.description}</td>
    </tr>
  );
};

export default TableSheetChildren;
