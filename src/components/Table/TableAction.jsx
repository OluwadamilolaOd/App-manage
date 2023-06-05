import React from "react";
import "./Styles/tablesheet.css";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import TableActionChildren from "./TableActionChildren";

export default function TableAction({ headers, url }) {
  const [data, setData] = useState([]);
  const [openOptions, setOpenOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [licenseName, setLicenseName] = useState();
  const [licenseTypes, setlicenseTypes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const edit = () => {
    console.log("Edit License Band");
  };

  const archive = () => {
    console.log("archive License Band");
  };


  // const handleSearch = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const filtered = data.filter((item) => {
  //   if (searchQuery === ""){
  //     return item
  //   } else if (item.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
  //   ) {
  //     return item
  //   }
  // }   
  // );

  // setFilteredData(filtered);
  // console.log(filtered)



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
          {/* <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
      /> */}
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
              <TableActionChildren key={obj.id} obj={obj}/>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
}
