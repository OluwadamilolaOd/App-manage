import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ item, onDelete, onEdit }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDelete = () => {
    onDelete(item.id);
  };

  const handleEdit = () => {
    onEdit(item.id);
  };

  return (
    
    <tr onClick={console.log("Helloooooooo")}>
      <th>{item.licenseName}</th>
      <th>{item.licenseName}</th>
      <th>{item.licenseName}</th>
      <button onClick={handleDropdownToggle}>Action</button>
      {showDropdown && (
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </tr>
    
  );
};

export default ListItem;
