import React, { useContext, useState } from "react";
import { BooksContext } from "../context/BooksContext";
import CartBooksCard from "../components/CartBooksCard";
import { useNavigate } from "react-router-dom";
import { FaGooglePay } from "react-icons/fa";

function Cart() {
  const { cart, totalAmount, totalQuantity, userDetails, setAddOrders, clearCart, placeOrderAPI } = useContext(BooksContext);
  const navigate = useNavigate();
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const totalBooks = totalQuantity;
  const gstAmount = (totalAmount * 5) / 100;
  const calculatedAmount = totalAmount + gstAmount;

  // Checkout button click
  const handleCheckout = () => {
    if (userDetails && typeof userDetails === 'object') {
      if (!userDetails.Phone) {
        setShowAddressPopup(true);
      } else {
        setShowPaymentPopup(true);
      }
    } else {
      setShowAddressPopup(true);
    }
  };

  // Simulating payment process
  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      const orderDetails = {
        items: cart,
        totalAmount: calculatedAmount,
        orderDate: new Date().toISOString(),
      };
  
      //setAddOrders(prevOrders => [...prevOrders, orderDetails]); 
      placeOrderAPI(orderDetails);
      setTimeout(() => {
        setShowPaymentPopup(false);
        clearCart();
        navigate("/profile");
      }, 2000);
    }, Math.random() * (4000 - 2000) + 2000);
  };

  // Prevent interaction during payment
  const handleInteraction = () => {
    if (isProcessing) {
      setShowPaymentPopup(false);
      navigate("/cart");
    }
  };
  

  return (
    <div className="container mt-5" onClick={handleInteraction}>
      <h4 className="mb-4 fw-bold text-success">Your Cart</h4>
      <div className="row d-flex flex-md-row-reverse">
        {/* Amount View - 40% */}
        <div className="col-md-5 col-sm-12 mb-4">
          <div className="amount-view text-success p-3 border rounded">
            <h3 className="text-center mb-3">Total Amount</h3>
            <table className="table text-success">
              <tbody>
                <tr>
                  <td><strong>Total No. of Books:</strong></td>
                  <td>{totalBooks}</td>
                </tr>
                <tr>
                  <td><strong>Total Amount:</strong></td>
                  <td>&#8377; {totalAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td><strong>GST (5%):</strong></td>
                  <td>&#8377; {gstAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td><strong>Final Amount:</strong></td>
                  <td>&#8377; {calculatedAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <button
                      className="btn btn-success w-100"
                      onClick={handleCheckout}
                      disabled={cart.length === 0}
                    >
                      Checkout
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Card View - 60% */}
        <div className="col-md-7 col-sm-8">
            {cart.length > 0 ? <CartBooksCard /> : <p className="text-center text-info">No Books in Cart :|</p>}
        </div>
      </div>

      {/* Address Check Popup */}
      {showAddressPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1050 }}>
          <div className="bg-white p-4 text-center rounded shadow" style={{ maxWidth: "400px" }}>
            <h5 className="text-danger">Please fill your address details in the Profile page before proceeding.</h5>
            <div className="d-flex justify-content-center mt-3">
              <button className="btn btn-primary me-2" onClick={() => navigate("/profile")}>Go to Profile</button>
              <button className="btn btn-secondary" onClick={() => setShowAddressPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1050 }}>
          <div className="bg-white p-4 text-center rounded shadow" style={{ maxWidth: "400px" }}>
            {!paymentSuccess ? (
              <>
                <FaGooglePay size={50} className="text-primary mb-3" />
                <h5><strong>Total: &#8377; {calculatedAmount.toFixed(2)}</strong></h5>
                <p className="text-muted">BookBaazaar Bank</p>
                <p className="text-muted">Receiver: BookBaazar Pvt Ltd</p>
                <button className="btn btn-success w-100" onClick={handlePayment} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Pay"}
                </button>
                <p className="mt-3 text-danger small">Don't move or tap the page during payment.</p>
              </>
            ) : (
              <>
                <h4 className="text-success">Payment Successful!</h4>
                <p>Your order has been placed successfully.</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
