import "./Styles/tablesheet.css";
import Loader from "../Loader";
import ReportTableSheetChildren from "./ReportTableSheetChildren";

export default function ReportTableSheet({ headers, data, loading }) {
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
              {data &&  data.map((obj) => (
                <ReportTableSheetChildren obj={obj} key={obj.id} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
