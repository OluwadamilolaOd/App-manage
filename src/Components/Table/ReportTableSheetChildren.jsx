const ReportTableSheetChildren = ({ obj }) => {

  return (
    <tr key={obj.id}>
      <td>{obj.organizationName}</td>
      <td>{obj.licenseName}</td>
      <td>{obj.licenseBand}</td>
      <td>{obj.maximumUser}</td>
      <td>{obj.purchasedDate}</td>
      <td>{obj.expirationDate}</td>
    </tr>
  );
};

export default ReportTableSheetChildren;