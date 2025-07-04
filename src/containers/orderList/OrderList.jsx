import React, { useState, useEffect, useRef } from 'react';
import { OrderItem, OrderNotif } from '../../components';
import './orderList.css';
// import { item01, item02, item03, item04, item05, item06 } from '../../assets/images';
// const itemImages = [item01, item02, item03, item04, item05, item06];
// const itemName = ['Latte', 'Americano', 'Mocha', 'Cappuccino', 'Caramel Macchiato', 'Irish Coffee'];
// const prices = [6.8, 5, 6.8, 6.5, 5.6, 7.5];

function useOutsideMouseClick(refs, onOutsideClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      const clickedInsideAnyRef = refs.some(
        (ref) => ref.current && (ref.current.contains(event.target) || event.target.closest('[data-inside-navbar]'))
      );
      if (!clickedInsideAnyRef) {
        onOutsideClick();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, onOutsideClick]);
}

function OrderList({ menuItems, orderCount, setOrderCount, onClose, navbarRef }) {
  const orderListRef = useRef(null)
  const notifRef = useRef(null)
  // const menuItems = itemName.map((name, index) => ({
  //   id: index,
  //   name: name,
  //   image: itemImages[index],
  //   price: prices[index],
  // }))
  const [showNotif, setShowNotif] = useState(false)
  const [noItemNotif, setNoItemNotif] = useState(false);
  useOutsideMouseClick([orderListRef, navbarRef], () => {
    if (!showNotif && !noItemNotif) onClose()
  })
  useOutsideMouseClick([notifRef, navbarRef], () => setShowNotif(false))

  const handleAdd = (id) => {
    setOrderCount((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, 20)
    }))
  }

  const handleRemove = (id) => {
    setOrderCount((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0)
    }))
  }

  const total = menuItems.reduce((sum, item) => {
    return sum + (orderCount[item.id] || 0) * item.price
  }, 0)


  return (
    <div className="cafe__orderList pop-up">
      <div className="cafe__orderList-scrollable" ref={orderListRef}>
        <div className="cafe__orderList-items">
          <h2>order online</h2>
          {menuItems.map((item) => (
            <div className="cafe__orderList-item" key={item.id}>
              <OrderItem
                id={item.id}
                itemImg={item.image}
                title={item.name}
                price={item.price}
                orderCount={orderCount[item.id] || 0}
                onAdd={() => handleAdd(item.id)}
                onRemove={() => handleRemove(item.id)}
              />
            </div>
          ))}
        </div>
        <div className="cafe__orderList-finalized">
          <div className="cafe__orderList-finalized_total">
            <p>Total Cost: <span className='total_cost'>${total.toFixed(2)}</span></p>
          </div>
          <div className="cafe__orderList-finalized_bill">
            <button onClick={() => {
              if (Object.values(orderCount).some(count => count > 0)) {
                setShowNotif(true)
              }
              else {
                setNoItemNotif(true)
                setTimeout(() => {
                  setNoItemNotif(false)
                }, 1500);
              }
            }}><span className="gradient-text">Add to Cart</span></button>
          </div>
        </div>
      </div>
      {showNotif && (
        <div className="cafe__orderList-notif_overlay">
          <OrderNotif
            message="Done!"
            buttonMessage="Go to Cart"
            buttonOnClick={() => { console.log('button clicked!') }}
            notifRef={notifRef}
          />
        </div>
      )}
      {noItemNotif && (
        <div className="cafe__orderList-notif_overlay">
          <div className="no-item-notif"><p>No Item Added!</p></div>
        </div>
      )}
    </div>
  )
}

export default OrderList