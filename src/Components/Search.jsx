import './Styles/search.css'


const Search = ({handleSearch, value, placeholder}) => {

  return (
    <div className="searchWrapper">
        <input type="text" placeholder={placeholder} className="searchInput" onChange = {handleSearch} value={value} />  
    </div>
  )
}

export default Search


