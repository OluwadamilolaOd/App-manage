import './Styles/search.css'


const Search = ({handleSearch, value}) => {

  return (
    <div className="searchWrapper">
        <input type="text" placeholder="Search for anything..." className="searchInput" onChange = {handleSearch} value={value} />  
    </div>
  )
}

export default Search


