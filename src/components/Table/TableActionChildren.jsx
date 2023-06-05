import {useState} from 'react'

const TableActionChildren = ({obj}) => {
    const [openOptions, setOpenOptions] = useState(false);
  return (
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
                      <p>Edit</p>
                    </div>
                    <div className="archive">
                      <p>Archive</p>
                    </div>
                  </div>
                )}
              </tr>
  )
}

export default TableActionChildren