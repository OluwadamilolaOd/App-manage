import "./Styles/tablesheet.css";
import Loader from "../Loader";
import TableSheetChildren from "./TableSheetChildren";

export default function TableSheet({ headers, data, loading }) {
  return (
    <>
      <div className="tableData">
        {loading ? (
          <Loader />
        ) : (
          <table>
            <thead>
              <tr>
                {headers.map((header, id) => (
                  <th key={id}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((obj) => (
                <TableSheetChildren obj={obj} key={obj.id} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
