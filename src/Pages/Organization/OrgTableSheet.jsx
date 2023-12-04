import "../../Components/Table/Styles/tablesheet.css";
import Loader from "../../Components/Loader";
import { useNavigate } from "react-router-dom";

export default function OrgTableSheet({ headers, items, loading }) {
  const navigate = useNavigate();

  // const handleClick = (id) => navigate(`organizationProfile/:${id}`)
  const handleRowDoubleClick = (itemId) =>
    navigate(`organizationProfile/${itemId}`);

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
              {items.map((obj) => (
                <tr key={obj.id} onClick={() => handleRowDoubleClick(obj.id)}>
                  <td>{obj.organizationName}</td>
                  <td>{obj.email}</td>
                  <td>{obj.phoneNumber}</td>
                  <td>{obj.address}</td>
                  <td className="txt-align">{obj.porductCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
