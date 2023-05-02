import React from 'react'
import './Styles/tablesheet.css'

const TableSheet = ({search, headers, data, actions}) => {

  return (
    <div className='tableSheet'>
      <div className="container">
        {/* <div className="search">
            {search}
        </div> */}
        <div className="tableData">
            <table>
                <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                </tr>
                <tr>
                    <td>10001</td>
                    <td>Tom</td>
                    <td>M</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>10002</td>
                    <td>Sally</td>
                    <td>F</td>
                    <td>28</td>
                </tr>
                <tr>
                    <td>10003</td>
                    <td>Emma</td>
                    <td>F</td>
                    <td>24</td>
                </tr>
            </table>

            <div className="footer">
                <div className="nav"></div>
                <div className="nav"></div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TableSheet
