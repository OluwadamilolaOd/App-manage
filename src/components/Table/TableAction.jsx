import React from "react";
import "./Styles/tablesheet.css";

export default function TableAction({ actionTable }) {
  const { headers, data, actions } = actionTable;
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
          {data.map((obj, idx) => (
            <tr key={idx}>
              {Object.entries(obj).map(([key, val], idx) => (
                <td key={idx}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
