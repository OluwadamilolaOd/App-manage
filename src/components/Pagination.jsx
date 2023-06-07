import ReactPaginate from "react-paginate"
import "./Styles/pagination.css";

const Pagination = ({url,setcompleteData}) => {

    //Pagination//

  const fetchCurrentPage = async (currentPage) => {
    const res = await fetch(`${url}?pageNumber=${currentPage}`);
    const data = await res.json();
    return data;
};

const handlePageChange= async (e)=>{
    let currentPage = e.selected + 1
   const  dataFromApi = await fetchCurrentPage(currentPage)
    
    console.log(dataFromApi)
    setcompleteData(dataFromApi)
}

  return (
    <ReactPaginate
    pageCount={3}
    onPageChange={handlePageChange}
    containerClassName="pagination-container"
    pageClassName="pagination-link"
    activeClassName="pagination-active"
    previousClassName=""
    nextClassName=""
    />
  )
}

export default Pagination