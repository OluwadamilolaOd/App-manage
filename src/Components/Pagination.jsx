import ReactPaginate from "react-paginate";
import "./Styles/pagination.css";

const Pagination = ({ url, setcompleteData }) => {

  //get token from local storage and set it to state
  const token =localStorage.getItem("token")
  
  //Pagination//
  const fetchCurrentPage = async (currentPage) => {
    const res = await fetch(`${url}?pageNumber=${currentPage}`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    );
    const data = await res.json();
    return data;
  };

  const handlePageChange = async (e) => {
    let currentPage = e.selected + 1;
    const dataFromApi = await fetchCurrentPage(currentPage);

    console.log(dataFromApi);
    setcompleteData(dataFromApi);
  };

  return (
    <div>
    <ReactPaginate
      pageCount={4}
      onPageChange={handlePageChange}
      containerClassName="pagination-container"
      pageClassName="pagination-link"
      activeClassName="pagination-active"
      previousClassName="previous"
      nextClassName="next"
      previousLabel={"<"}
      nextLabel={">"}
    />
    </div>
  );
};

export default Pagination;
