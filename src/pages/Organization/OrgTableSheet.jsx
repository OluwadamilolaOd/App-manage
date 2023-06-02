import React, { useState, useEffect } from "react";
import "../../components/Table/Styles/tablesheet.css";
import Loader from "../../components/Loader";


export default function OrgTableSheet({ headers, url, navigateTo }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            let completeData = Object.values(data);
            console.log(completeData)
            setData(completeData);
            setLoading(!loading)
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <>

    <div className="tableData">
  {loading? <Loader/> : 
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
              
              <td>
                {obj.organizationName}
              </td>
              <td>
                {obj.email}
              </td>
              <td>
                {obj.phoneNumber}
              </td>
              <td>
                {obj.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
}
    </div>
    </>
  );
}
