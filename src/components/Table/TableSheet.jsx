import React, { useState, useEffect } from "react";
import "./Styles/tablesheet.css";
import { Link } from "react-router-dom";
import Loader from "../Loader";

export default function TableSheet({ headers, url, navigateTo }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            let completeData = Object.values(data);
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
              <Link to={`${navigateTo}/${obj.id}`}>{obj.licenseName}
              </Link>
              </td>
              <td>
              <Link to={`${navigateTo}/${obj.id}`}>
                {obj.description}
                </Link>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
}
    </div>
  );
}
