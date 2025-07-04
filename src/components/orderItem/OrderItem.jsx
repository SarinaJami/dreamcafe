import React, { useEffect, useRef, useState } from 'react'
import './orderItem.css'
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

function useOrderLogic({ onAdd, onRemove }) {
  const [addCircleSize, setAddCircleSize] = useState('20');
  const [removeCircleSize, setRemoveCircleSize] = useState('20');

  const handleOrderLogic = (operation) => {
    if (operation === 'add') {
      setAddCircleSize('18');
      onAdd();
      setTimeout(() => setAddCircleSize('20'), 200);
    }
    if (operation === 'subtract') {
      setRemoveCircleSize('18');
      onRemove();
      setTimeout(() => setRemoveCircleSize('20'), 200);
    }
  }

  return { addCircleSize, removeCircleSize, handleOrderLogic };
}

function OrderItem({ itemImg, title, price, orderCount, onAdd, onRemove }) {
  const ioCircleStyle = {
    'cursor': 'pointer',
    'transition': 'font-size 0.1s ease'
  }

  const {
    addCircleSize,
    removeCircleSize,
    handleOrderLogic
  } = useOrderLogic({ onAdd, onRemove });


  return (
    <div className="cafe__orderItem">
      <div className="cafe__orderItem-item">
        <div className="cafe__orderItem-item_img">
          <img src={itemImg} alt='Item' />
        </div>
        <div className="cafe__orderItem-item_content">
          <p>{title}</p>
          <p>${price}</p>
        </div>
      </div>
      <div className="cafe__orderItem-count">
        <div>
          <IoRemoveCircleOutline style={{ ioCircleStyle, 'fontSize': `${removeCircleSize}px` }}
            onClick={() => handleOrderLogic('subtract')} />
        </div>
        <p>{orderCount}</p>
        <div>
          <IoAddCircleOutline style={{ ioCircleStyle, 'fontSize': `${addCircleSize}px` }}
            onClick={() => handleOrderLogic('add')} />
        </div>
      </div>
    </div>
  )
}

export default OrderItem