import React, { useContext, useState } from "react";
import { BooksContext } from "../context/BooksContext";
import BooksCard from '../components/BooksCard'
import SearchIcon from '../assets/img/search.png'


function SearchBooksList() {
    const { searchBooks, setSearchItems } = useContext(BooksContext);
    const [searchItem, setSearchItem] = useState('')

    const handleValue = (e) =>{
        e.preventDefault();
        setSearchItem(e.target.value)
    } 

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            setSearchItems(searchItem)        
        }
      };

    const handleSearch = (e) =>{
        e.preventDefault();
        setSearchItems(searchItem)
    }

  return (
    <div className='booklist'>
      <div className="container my-2">
        <div className="d-flex flex-row-reverse p-2">
          <div className="d-flex justify-content-center align-items-center bg-success nav-search-bar rounded-pill" >
              <input type="text" placeholder="Find Your Best One..." className="px-3 rounded-pill" value={searchItem} onChange={handleValue} onKeyDown={handleKeyDown} />
              <img src={SearchIcon} alt="search-icon" className="search-icon rounded-circle" onClick={handleSearch} />
            </div>
        </div>
        <div>
            <BooksCard books={searchBooks}/>
        </div>
      </div>
    </div>
  )
}

export default SearchBooksList