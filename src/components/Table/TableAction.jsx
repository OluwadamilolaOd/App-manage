import React from "react";
import "./Styles/tablesheet.css";
import { useState, useEffect } from "react";

export default function TableAction({headers, url, navigateTo,action,actionEvent }) {

  const [data, setData] = useState([]);
  const [licenseName, setLicenseName] = useState();
  const [licenseTypes, setlicenseTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            let completeData = Object.values(data);
            setData(completeData)
            console.log(completeData)        
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [url]);
  return (
    <div className='tableData'>
      <table>
        <thead>
          <tr>
            {headers.map((header, id) => (
              <th key={id}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((obj) => (
            <tr key={obj.id}>
                <td key={obj.id}>Staas</td>
                <td>{obj.licenseBand}</td>
                <td>{obj.maximumUser}</td>
                <td>{obj.partNumber}</td>
                <td>...</td>
                
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
