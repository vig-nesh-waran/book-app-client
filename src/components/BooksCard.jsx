import React, { useState, useContext, useEffect } from 'react'
import BookCover from '../assets/img/bookcover.jpg'
import { AiFillStar } from "react-icons/ai"; 
import { BooksContext } from "../context/BooksContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


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
            <div key={index} className="col-md-4 mb-5 mt-5">
              <div className="card p-3 d-flex justify-content-evenly align-items-center" style={{ width: "20rem", height: "34rem" }}>
                <Skeleton height={200} width={180} /> {/* Image Placeholder */}
                <div className="card-body text-center">
                  <h5 className="card-title"><Skeleton width={120} /></h5>
                  <div className="card-text"><Skeleton width={180} /></div>
                  <div className="card-text d-flex flex-row align-items-center justify-content-between">
                    <Skeleton width={50} height={20} /> {/* Star Placeholder */}
                    <Skeleton width={60} height={20} /> {/* Price Placeholder */}
                  </div>
                </div>
                <Skeleton width={120} height={40} /> {/* Button Placeholder */}
              </div>
            </div>
          ))
        : books?.items?.map((book) => {
          const bookId = book.id;
          const isInCart = cartBookIds.has(bookId);
            return (
              <div key={book.id} className="col-md-4 mb-5 mt-5">
                <div className="card p-3 d-flex justify-content-evenly align-items-center" style={{ width: "20rem", height: "34rem" }}>
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
                    className={`btn ${isInCart ? "btn-danger" : "btn-success"}`}
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