import React, { useState, useEffect } from 'react';

const Home = () => {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://unifiedlicenseapi.azurewebsites.net/api/LicenseType');
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = data.filter((item) =>
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  return (
    <div>
      <h1>Data from API:</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
      />
      {filteredData.map((item, index) => (
        // <p key={index}>{item}</p>
        console.log(item)
      ))}
    </div>
  )
}

export default Home
