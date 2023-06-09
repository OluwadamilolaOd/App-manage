import React from "react";
import "./Styles/tablesheet.css";
import Loader from "../Loader";
import TableActionChildren from "./TableActionChildren";

export default function TableAction({ headers,loading, data, setOpenModal}) {

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
                <TableActionChildren key={obj.id} obj={obj} setOpenModal = {setOpenModal} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
