import React, { useState } from 'react';

const MyComponent = () => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState({
    field1: '',
    field2: '',
    field3: '',
    // Add more fields as needed  "attachment": "string"
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleJsonDataChange = (event) => {
    const { name, value } = event.target;
    setJsonData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('jsonData', JSON.stringify(jsonData));

      const response = await fetch('https://example.com/api/endpoint', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="file">Select a file:</label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>
      <div>
        <label htmlFor="field1">Field 1:</label>
        <input type="text" id="field1" name="field1" value={jsonData.field1} onChange={handleJsonDataChange} />
      </div>
      <div>
        <label htmlFor="field2">Field 2:</label>
        <input type="text" id="field2" name="field2" value={jsonData.field2} onChange={handleJsonDataChange} />
      </div>
      <div>
        <label htmlFor="field3">Field 3:</label>
        <input type="text" id="field3" name="field3" value={jsonData.field3} onChange={handleJsonDataChange} />
      </div>
      {/* Add more fields as needed */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyComponent;
