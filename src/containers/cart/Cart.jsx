import React, { useEffect, useRef, useState } from 'react'
import './cart.css'
import { CartItem } from '../../components'
import { AiOutlineCloseCircle } from 'react-icons/ai';

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


function Cart({ menuItems, finalOrder, setFinalOrder, setOrderCount, onClose, navbarRef, setIsCartVisible, setIsOrderListVisible }) {
  const cartRef = useRef(null)
  const [payMessage, setPayMessage] = useState("Pay")

  useOutsideMouseClick([cartRef, navbarRef], () => onClose())
  const orderedList = Object.entries(finalOrder).filter(([key, value]) => value > 0)
  const isEmpty = Object.keys(orderedList).length === 0;

  const handleAdd = (id) => {
    setFinalOrder((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, 20)
    }))
  }

  const handleRemove = (id) => {
    setFinalOrder((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0)
    }))
  }

  useEffect(() => {
    setOrderCount(finalOrder)
  }, [finalOrder])
  
  return (
    <div className="cafe__cart pop-up" ref={cartRef}>
      <div className="cafe__cart-scrollable">
        <div className="cafe__cart-close">
          <AiOutlineCloseCircle color='#653C0C' size={25} cursor={'pointer'} onClick={() => onClose()}></AiOutlineCloseCircle>
        </div>
        <div className="cafe__cart-items">
          <h2>Your Cart</h2>
          {isEmpty ? (
            <p className="cafe__cart-empty">Your cart is empty.</p>
          ) :
          orderedList.map(([id, count]) => {
            const item = menuItems[Number(id)]
            return (
              <div className="cafe__cart-item" key={id}>
                <CartItem
                  id={Number(id)}
                  name={item.name}
                  price={item.price}
                  finalOrder={count}
                  setFinalOrder={setFinalOrder}
                  onAdd={() => handleAdd(Number(id))}
                  onRemove={() => handleRemove(Number(id))}
                />
                <div className="cafe__cart-item_separation-line"></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="cafe__cart-buttons">
        <div>
          <button className={`${isEmpty ? "inactive-bg" : "cafe__cart-button-hover cafe__cart-button-active"}`} 
          onClick={() => {
            if (Object.values(finalOrder).some(count => count > 0)) {
              setPayMessage("Paid!")
              setTimeout(() => {
                setPayMessage("Pay")
                setFinalOrder(prevOrder => {
                  const reset = Object.fromEntries(
                    Object.entries(prevOrder).map(([key, _]) => [key, 0])
                  );
                  return reset;
                });
              }, 1500);
            }
          }}><span className={`${isEmpty ? "inactive-text" : "gradient-text"}`}>{payMessage}</span></button>
        </div>
        <div>
          <button className="cafe__cart-button-hover cafe__cart-button-active" onClick={() => {
            setIsCartVisible(false)
            setIsOrderListVisible(true)
          }}><span className="gradient-text">Edit Order</span></button>
        </div>
      </div>
    </div>
  )
}

export default Cart