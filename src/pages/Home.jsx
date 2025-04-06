import React, { useContext, useState } from "react";
import SearchIcon from '../assets/img/search.png'
import { useNavigate } from "react-router-dom";
import { BooksContext } from "../context/BooksContext";


function Home() {

  const navigate = useNavigate()
  const {setSearchItems } = useContext(BooksContext);
  const [searchItem, setSearchItem] = useState('')

  const handleValue = (e) =>{
      e.preventDefault();
      setSearchItem(e.target.value)
  } 

  const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); 
        setSearchItems(searchItem)   
        navigate('/search-book-list')
      }
    };

  const handleSearch = (e) =>{
      e.preventDefault();
      setSearchItems(searchItem)
      navigate('/search-book-list')
  }

  const handleNavigate = () => {
    navigate('/book-list')
  }

  return (
    <div className="home d-flex flex-column justify-content-center align-items-center text-white">
      <div className="container text-center mt-1 p-4">
        <h1 className="fw-bold">Welcome to Book Baazaar! 📚</h1>
        <p className="fw-bolder mt-3">
          "Dive into a world of books where stories come to life. Discover,
          shop, and enjoy the joy of reading—all in one place!"
        </p>
        <button onClick={handleNavigate} className="btn btn-success mt-3 mb-5 fw-bolder w-25">View Books</button>
      </div>
      
        <div className="mt-5 d-flex justify-content-between align-items-center bg-success search-bar rounded-pill" >
          <input type="text" placeholder="Find Your Best One..." className="px-3 rounded-pill" onChange={handleValue} onKeyDown={handleKeyDown}/>
          <img src={SearchIcon} alt="search-icon" className="search-icon rounded-circle" onClick={handleSearch} />
        </div>
    </div>
  );
}

export default Home;
