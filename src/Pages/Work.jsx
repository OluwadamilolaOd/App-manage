import React from 'react'
import WorkTable from './WorkTable';

const Work = () =>{
      // Sample data for the table
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  const handleEdit = (id) => {
    // Handle edit action here
    console.log(`Edit action for ID ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete action here
    console.log(`Delete action for ID ${id}`);
  };
  return (
    <div>
      <h1>Table with Action Column</h1>
      <WorkTable data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default Work