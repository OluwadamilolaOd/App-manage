import React from "react";
import "./Styles/tablesheet.css";
import { useState, useEffect } from "react";

export default function TableAction({
  headers,
  url,
  navigateTo,
  action,
  actionEvent,
}) {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.licenseTypes);
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
      </table>
    </div>
  );
}
