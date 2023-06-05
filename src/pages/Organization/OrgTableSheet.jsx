import "../../components/Table/Styles/tablesheet.css";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";


export default function OrgTableSheet({ headers, items, loading, }) {

  const navigate = useNavigate();

  // const handleClick = (id) => navigate(`organizationProfile/:${id}`)
  const handleRowDoubleClick = (itemId) => {
    // Navigate to details page using the selected item's ID
    navigate(`organizationProfile/${itemId}`)
  };


  return (
    <>

    <div className="tableData">
  {loading? <Loader/> : 
      <table>
        <thead>
          <tr>
            {headers.map((header, id) => (
              <th key={id}>{header}</th>
            ))}
          </tr>
        </thead>
 <tbody>
          {items.map((obj) => (
            <tr key={obj.id} onClick={() => handleRowDoubleClick(obj.id)}>
              <td>
                {obj.organizationName}
              </td>
              <td>
                {obj.email}
              </td>
              <td>
                {obj.phoneNumber}
              </td>
              <td>
                {obj.address}
              </td>             
            </tr>
          ))}
        </tbody>
      </table>
}
    </div>
    </>
  );
}
