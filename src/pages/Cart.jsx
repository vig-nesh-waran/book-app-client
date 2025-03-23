import React, { useContext, useEffect } from "react";
import { BooksContext } from "../context/BooksContext";
import CartBooksCard from "../components/CartBooksCard";

function Cart() {
  const { cart, totalAmount, totalQuantity } = useContext(BooksContext);
  
  // const totalBooks = cart.length;
  const totalBooks = totalQuantity;
  

  // GST Calculation (5%)
  const gstAmount = (totalAmount * 5) / 100;
  const calculatedAmount = totalAmount + gstAmount;

  return (
    <div className="container mt-5">
      <h4 className="mb-4 fw-bold text-success">Your Cart</h4>
      <div className="row d-flex flex-md-row-reverse">

        {/* Amount View - 40% */}
        <div className="col-md-5">
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
                    <button className="btn btn-success w-100">Checkout</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Card View - 60% */}
        <div className="col-md-7">
          <div className="card-view">
            {cart.length > 0 ? <CartBooksCard /> : <p className="text-center text-info">No Books in Cart :|</p>}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;
