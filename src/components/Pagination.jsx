import React, { useState, useContext } from "react";
import { BooksContext } from "../context/BooksContext";


const Pagination = ({ totalPages = 100 }) => {

  const { setPageNum, pageNum } = useContext(BooksContext);

  const [currentPage, setCurrentPage] = useState(pageNum);

  // Determine start and end page numbers to display
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 2);
  
  // Generate page numbers dynamically
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Handlers for navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setPageNum(page)
    }
  };

  return (
    <div aria-label="Page navigation" className="">
      <ul className="pagination">
        {/* First Page Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => goToPage(1)}>
            &laquo;&laquo;
          </button>
        </li>

        {/* Previous Page Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
            &laquo;
          </button>
        </li>

        {/* Dynamically Generated Page Numbers */}
        {pageNumbers.map((page) => (
          <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
            <button className="page-link" onClick={() => goToPage(page)}>
              {page}
            </button>
          </li>
        ))}

        {/* Next Page Button */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
            &raquo;
          </button>
        </li>

        {/* Last Page Button */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => goToPage(totalPages)}>
            &raquo;&raquo;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
