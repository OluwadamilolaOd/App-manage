import { useState } from 'react'
import './Styles/search.css'
import {MdOutlineSearch} from "react-icons/md"


const Search = ({onChangeHandler}) => {

  return (
    <div className="searchWrapper">
        <input type="text" placeholder="Search for anything..." className="searchInput" onChange = {onChangeHandler} />  
    </div>
  )
}

export default Search


