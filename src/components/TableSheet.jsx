import React, { useState } from 'react'
import './Styles/tablesheet.css'
import { Link } from 'react-router-dom';


export default function  TableSheet({sheetTable}) {
  const {headers, data} = sheetTable;

  //Pagination
  // const [currentPage, setCurrentPage] = useState(1)
  // const recordsPerPage = 5;
  // const lastIndex = currentPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = data.slice(firstIndex,lastIndex)
  // const npage = Math.ceil(data.length / recordsPerPage)
  // const numbers = [...Array(npage + 1).keys()].slice(1)

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
                <Link to={`/organizationProfile/${idx}`}>
                  <td key={idx}>{val}</td>
                </Link>
              ))}
            </tr>
          ))}

        </tbody>
      </table>
      {/* <nav>
        <ul className='pagination'>
          <li className='page-item'>
            <a href="#" className='page-link' onClick={prePage}>Prev</a>
          </li>
          {
            numbers.map((n, i) => (
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                <a href="" className="page-item" 
                onClick={()=> changeCPage(n)}>
                  {n}
                </a>
              </li>
            ))
          }
          <li className='page-item'>
            <a href="#" className='page-link' onClick={nextPage}>Prev</a>
          </li>
        </ul>
      </nav> */}
    </div>
  )

  function prePage() {

  }
  function changeCPage(id) {
    
  }
  function nextPage() {
    
  }
}

