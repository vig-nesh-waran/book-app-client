import React, { useState, useContext, useEffect } from 'react'
import BookCover from '../assets/img/bookcover.jpg'
import { AiFillStar } from "react-icons/ai"; 
import { BooksContext } from "../context/BooksContext";
import SkeletonLoader from './SkeletonLoader';


export const StarRating = ({ rating }) => {
  const maxStars = 5;

  return (
    <div>
      {[...Array(maxStars)].map((_, index) => (
        <AiFillStar
          key={index}
          size={20} 
          color={index < rating ? "green" : "#ddd"} 
          style={{ marginRight: 4 }}
        />
      ))}
    </div>
  );
};


function BooksCard({books}) {

  const { cart, addToCart, removeFromCart } = useContext(BooksContext);
  const [loading, setLoading] = useState(true)

  const amount = 560.70

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
  }, []);
   

  // Ensure cart is an array
  const cartBookIds = new Set(cart?.map((item) => item.bookId) || []);


  return (
    <div className="row container">
      {loading
        ? Array(6).fill(0).map((_, index) => (
            <div key={index} className="col-md-3 mb-5 mt-5">
              <SkeletonLoader />
            </div>
          ))
        : books?.items?.map((book) => {
          const bookId = book.id;
          const isInCart = cartBookIds.has(bookId);
            return (
              <div key={book.id} className="col-md-3  mb-5 mt-5">
                <div className="card card-center p-3 d-flex justify-content-evenly align-items-center" style={{ height: "32rem" }}>
                  <img
                    src={book.volumeInfo?.imageLinks?.thumbnail || BookCover}
                    className="card-img-top rounded book-img"
                    alt={book.volumeInfo?.title}
                  />
                  <div className="card-body fw-bold">
                    <h5 className="card-title fs-6">{book.volumeInfo?.title}</h5>
                    <div className="card-text">
                      Author: {book.volumeInfo?.authors?.[0] || "Unknown Author"}
                    </div>
                    <div className="card-text d-flex flex-row align-items-center justify-content-between">
                      <span>
                        <StarRating rating={book.volumeInfo?.averageRating || 0} />
                      </span>
                      <span>&#8377; {book.saleInfo?.listPrice?.amount || amount }</span>
                    </div>
                  </div>
                  <button
                    className={`btn ${isInCart ? "btn-danger w-75" : "btn-success w-75"}`}
                    onClick={() => (isInCart ? removeFromCart(bookId) : addToCart(book))}
                  >
                    {isInCart ? "Remove Cart" : "Add Cart"}
                  </button>
                </div>
              </div>
            );
          })}
    </div>
  );

}

export default BooksCard