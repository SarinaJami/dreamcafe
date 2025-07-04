import React, { useEffect, useState } from 'react'
import './cart.css'


function Cart({ menuItems, orderCount, setOrderCount }) {
  const [paymentMessage, setPaymentMessage] = useState('Payment');
  const handlePayment = (setOrderCount) => {
    setOrderCount((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {})
    );
    setPaymentMessage('Paid!');
    setTimeout(() => {
      setPaymentMessage('Payment')
    }, 3000);
  }
  const ordersIds = Object.entries(orderCount).filter(([_, value]) => {
    return value > 0
  }).map(([id]) => id);

  return (
    <div className="cafe__cart pop-up">
      <div className="cafe__cart-orders">
        {
          menuItems.map((item) => (
            <div className="cafe__cart-order">
              <p>{ordersIds.includes(item.id) ? item.name : ""}</p>
            </div>
          ))
        }
      </div>
      <div className="cafe__cart-buttons">
        <div>
          <button onClick={() => handlePayment(setOrderCount)}><span className="payment-message gradient-text">{paymentMessage}</span></button>
        </div>
        <div>
          <button><span className="gradient-text">Edit Order</span></button>
        </div>
      </div>
    </div>
  )
}

export default Cart