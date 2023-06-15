import {useState} from "react";
import Loader from "../../components/Loader";
import OrgPurchasedLicesTableChildren from "./OrgPurchasedLicesTableChildren";

const OrgPurchasedLicsTableSheet = ({ data, headers, loading, deleteItem }) => {

  return (
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
              <OrgPurchasedLicesTableChildren deleteItem = {deleteItem}            
              key={obj.id}
              obj={obj} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrgPurchasedLicsTableSheet;
