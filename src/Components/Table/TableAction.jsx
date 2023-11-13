import React from "react";
import "./Styles/tablesheet.css";
import Loader from "../Loader";
import TableActionChildren from "./TableActionChildren";

export default function TableAction({ headers, loading, data, deleteItem }) {
  return (
    <>
      <div className="tableData">
        {loading ? (
          <Loader />
        ) : (
          <table className="table-action">
            <thead>
              <tr>
                {headers.map((header, id) => (
                  <th key={id}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((obj) => (
                  <TableActionChildren
                    key={obj.id}
                    obj={obj}
                    deleteItem={deleteItem}
                  />
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
