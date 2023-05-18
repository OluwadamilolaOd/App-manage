import React, { useState } from 'react'
import './Styles/tablesheet.css'
import { Link } from 'react-router-dom';


export default function  TableSheet({sheetTable}) {
  const {headers, data} = sheetTable;

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
                <td key={idx}>
                    {/* <Link to={`/organizationProfile/${idx}`}>{val}</Link> */}
                    <Link to={`/licenseType/${idx}`}>{val}</Link>
                </td>
              ))}
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

