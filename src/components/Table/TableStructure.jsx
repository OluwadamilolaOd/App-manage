import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import { baseUrl } from '../../Hook/baseurl';
import { Link,useNavigate } from "react-router-dom";

const List = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const url = `${baseUrl}/AppLicense`
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            let completeData = Object.values(data);
            setItems(completeData);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [url]);

  const fetchItems = async () => {
    try {
      const response = await fetch('your_api_endpoint');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDelete = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const handleEdit = (itemId) => {
    // Handle edit logic here
    console.log(`Edit item with id ${itemId}`);
  };

  const handleDropdownToggle = (itemId) => {
    setSelectedItemId(itemId);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (   
          <ListItem
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDropdownToggle={handleDropdownToggle}
            isSelected={selectedItemId === item.id}
          />
        ))}
      </tbody>
    </table>
  );
};

export default List;
