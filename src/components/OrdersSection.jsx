import React, { useEffect, useContext,useRef } from 'react';
import { BooksContext } from '../context/BooksContext';

const statusColors = {
  Pending: 'bg-warning text-dark',
  Packing: 'bg-info text-white',
  Shipped: 'bg-primary',
  Delivered: 'bg-success',
};

const OrdersSection = () => {
  const { myOrders, updateOrderStatusAPI } = useContext(BooksContext);

useEffect(() => {
    // Set timeout to trigger API 3s after component mounts
    const timer1 = setTimeout(() => {
      myOrders.forEach(order => {
        if (order.status === "Pending") {
          updateOrderStatusAPI(order._id);
        }
      });
    }, 2000);

    // Optional: trigger again at 6s
    const timer2 = setTimeout(() => {
      myOrders.forEach(order => {
        if (order.status === "Packing") {
          updateOrderStatusAPI(order._id);
        }
      });
    }, 4000);

    // Optional: trigger again at 9s
    const timer3 = setTimeout(() => {
      myOrders.forEach(order => {
        if (order.status === "Shipped") {
          updateOrderStatusAPI(order._id);
        }
      });
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [myOrders]); // Empty dependency to run once on mount


  return (
    <div className="row mt-2">
      <div className="col-12">
        <h4 className="mb-3">Your Orders</h4>
      </div>

      {myOrders.length === 0 ? (
        <div className="col-12">
          <p className="text-danger">You have no orders yet.</p>
        </div>
      ) : (
        myOrders.map((order, i) => {
          const firstProduct = order.products[0];
          const date = new Date(order.orderDate).toLocaleDateString();

          return (
            <div className="col-md-6 col-lg-4 mb-4" key={i}>
              <div className="card shadow-sm h-100">
                <img
                  src={firstProduct.productImage}
                  alt={firstProduct.productName}
                  className="card-img-top"
                  style={{ height: '220px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h6 className="card-title">{firstProduct.productName}</h6>
                  <p className="card-text mb-1">
                    <strong>Total Items:</strong> {order.products.length}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Order Date:</strong> {date}
                  </p>
                  <span className={`badge ${statusColors[order.status]} px-3 py-1`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrdersSection;
