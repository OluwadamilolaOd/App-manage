import React, { useState, useEffect } from "react";
import "./Styles/tablesheet.css";
import { Link } from "react-router-dom";

export default function TableSheet({ headers, url, navigateTo }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            let completeData = Object.values(data);
            setData(completeData);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div className="tableData">
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
              {Object.entries(obj)
                .filter(([key]) => key !== "id")
                .map((val) => (
                  <td key={obj.id}>
                    <Link to={`${navigateTo}/${obj.id}`}>{val[1]}</Link>
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
