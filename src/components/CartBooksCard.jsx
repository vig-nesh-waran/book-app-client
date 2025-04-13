import React, { useContext } from "react";
import BookCover from "../assets/img/bookcover.jpg";
import { BooksContext } from "../context/BooksContext";
import { FaTimes } from "react-icons/fa";

function CartBooksCard() {
  const { cart, updateCart, removeFromCart } = useContext(BooksContext);

  // Handle Remove from Cart
  const handleRemove = (bookId) => {
    removeFromCart(bookId);
  };

  // Handle Quantity Update
  const handleQuantityChange = (bookId, quantity) => {
    if (quantity >= 1) {
      updateCart(bookId, quantity);
    }
  };

  return (
    <div>
      {cart.map((book) => {
        return (
          <div key={book.bookId} className="card mb-3 p-3 position-relative">
            {/* Remove Button */}
            <span 
              className="position-absolute close-btn end-0 m-1 top-0 rounded-circle fs-bold fw-bolder bg-danger text-white d-flex justify-content-center align-items-center"
              onClick={() => handleRemove(book.bookId)}
            >
              <FaTimes />
            </span>

            <div className="row g-3">
              {/* Image */}
              <div className="col-md-4">
                <img src={book?.thumbnail || BookCover} alt={book.title} className="img-fluid rounded" />
              </div>

              {/* Book Info */}
              <div className="col-md-8 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="fw-bold">{book.title}</h5>
                  <p className="text-muted">Author: {book.author || "Unknown"}</p>
                  <p className="fw-bold text-success">₹ {book.price || 560.70}</p>
                </div>

                {/* Quantity Controls */}
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => handleQuantityChange(book.bookId, book.quantity - 1)}
                    disabled={book.quantity === 1}
                  >
                    -
                  </button>
                  <span className="fw-bold">{book.quantity}</span>
                  <button
                    className="btn btn-outline-secondary ms-2"
                    onClick={() => handleQuantityChange(book.bookId, book.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CartBooksCard;
