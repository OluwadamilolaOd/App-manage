import React from "react";
import "./Styles/tablesheet.css";
import { useState, useEffect } from "react";
import Loader from "../Loader";

export default function TableAction({ headers, url }) {
  const [data, setData] = useState([]);
  const [openOptions, setOpenOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [licenseName, setLicenseName] = useState();
  const [licenseTypes, setlicenseTypes] = useState([]);

  const edit = () => {
    console.log("Edit License Band");
  };

  const archive = () => {
    console.log("archive License Band");
  };

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
              <tr key={obj.id}>
                <td>{obj.licenseBand}</td>
                <td>{obj.maximumUser}</td>
                <td>{obj.partNumber}</td>
                <td>
                  <div
                    className="actionbtn"
                    onClick={() => setOpenOptions(!openOptions)}
                  >
                    ...
                  </div>
                </td>
                {openOptions && (
                  <div className="action">
                    <div className="edit">
                      <p onClick={edit}>Edit</p>
                    </div>
                    <div className="archive">
                      <p onClick={archive}>Archive</p>
                    </div>
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
