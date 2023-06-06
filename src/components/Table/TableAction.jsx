import React from "react";
import "./Styles/tablesheet.css";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import TableActionChildren from "./TableActionChildren";

export default function TableAction({ headers, url }) {
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
            setLoading(!loading);
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
        {loading ? (
          <Loader />
        ) : (
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
                <TableActionChildren key={obj.id} obj={obj} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
