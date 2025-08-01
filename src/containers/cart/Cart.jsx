import React, { useEffect, useRef, useState } from 'react'
import './cart.css'
import { CartItem } from '../../components'
import { AiOutlineCloseCircle } from 'react-icons/ai';


function Cart({ menuItems, finalOrder, setFinalOrder, setOrderCount, onClose, navbarRef, setIsCartVisible, setIsOrderListVisible }) {
  const cartRef = useRef(null)

  const orderedList = Object.entries(finalOrder).filter(([key, value]) => value > 0)

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
    <div className="cafe__cart pop-up">
      <div className="cafe__cart-scrollable" ref={cartRef}>
        <div className="cafe__cart-close">
          <AiOutlineCloseCircle color='#653C0C' size={25} cursor={'pointer'} onClick={() => onClose()}></AiOutlineCloseCircle>
        </div>
        <div className="cafe__cart-items">
          <h2>Your Cart</h2>
          {orderedList.map(([id, count]) => {
            const item = menuItems[Number(id)]
            return (
              <div className="cafe__cart-item" key={id}>
                <CartItem
                  id={Number(id)}
                  name={item.name}
                  price={item.price}
                  finalOrder={count}
                  onAdd={() => handleAdd(Number(id))}
                  onRemove={() => handleRemove(Number(id))}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Cart