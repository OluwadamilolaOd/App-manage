import React from "react";
import "./Styles/tablesheet.css";
import { useState } from "react";

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

          {actions => (
            <tr>
              <td>...</td>
            </tr>
          )}

              {/* {actions.length !== 0 && (
                <td style={{ cursor: "pointer" }}>
                  <div>
                    <a >...</a>
                    <div class="dropdown-content">
                      {actions.map((action, idx) => (
                        <link key={idx} onClick={action.handler}>
                          {action.name}
                        </link>
                      ))}
                    </div>
                  </div>
                </td>
              )} */}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
