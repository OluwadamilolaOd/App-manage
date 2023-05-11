import React from "react";
import "./Styles/tablesheet.css";
import { useState } from "react";

export default function TableAction({ actionTable }) {
  //pagination
  //const [currentPage, setCurrentPage] = useState(1)
  //const recordsPerPage = 5;
  //const lastIndex = currentPage * recordsPerPage;
  //const firstIndex = lastIndex - recordsPerPage;
  // const data = Data.slice(firstIndex, lastIndex);
  // const npage = Math.ceil(Data.length / recordsPerPage)
  //const number = [...Array(npage + 1).keys()].slice(1)

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
      {/* <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {
            numbers.map((n, i) => (
              <li className={`page-item $ {currentPage === n ? 'active' : ''}`} key={i}>
                <a href="" className="page-item" onClick={changeCPage}>{n}</a>
              </li>
            ))
          }
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav> */}
    </div>
  );
}
