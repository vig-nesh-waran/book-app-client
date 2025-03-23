import React, { useContext, useState } from 'react';
import { BooksContext } from '../context/BooksContext';
import CartBooksCard from '../components/CartBooksCard';
import { FaUserCircle } from 'react-icons/fa';
import { FaSadTear } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"; 

function Profile() {
  const { user, email, cart, logout } = useContext(BooksContext);
  const [showPopup, setShowPopup] = useState(false);

  const Navigate = useNavigate()

  // Handle Logout Confirmation
  const handleLogout = () => {
    logout();
    setShowPopup(false);
    Navigate('/', { replace: true });
  };

  return (
    <div className="container my-5">
      <div className="row d-flex justify-content-center align-items-center flex-column-reverse flex-lg-row">
        {/* Left Section: Orders */}
        <div className="col-lg-7 mb-4 mt-4">
          <h4 className="mb-3">Your Orders</h4>
          {/* {cart.length > 0 ? (
            cart.map((book) => <CartBooksCard key={book.bookId} book={book} />)
          ) : (
            <p className="text-muted">No orders found.</p>
          )} */}
            <p className="text-danger">"Orders Component Currently Under Maintenance"</p>
        </div>

        {/* Right Section: Profile Details */}
        <div className="col-lg-5">
          <div className="mb-4 p-4 d-flex flex-column align-items-center">
            {/* Profile Image */}
            <FaUserCircle size={100} className="text-secondary mb-3" />
            
            {/* User Details */}
            <h5>Welcome "<span className='text-success'>{user || 'Guest User'}"</span></h5>
            <p className="text-muted">{email || 'No email available'}</p>

            {/* Logout Button */}
            <button className="btn btn-danger mt-3" onClick={() => setShowPopup(true)}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="alert m-5 p-4 text-center" style={{ maxWidth: '400px' }}>
            <FaSadTear size={80} className="text-warning mb-3" />
            <h5>Are you sure you want to logout?</h5>
            <div className="d-flex justify-content-center mt-4">
              <button className="btn btn-danger me-3" onClick={handleLogout}>Logout</button>
              <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
