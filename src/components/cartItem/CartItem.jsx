import { useEffect, useState } from "react";
import './cartItem.css'
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"
import { TiTrash } from "react-icons/ti";

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

function CartItem({ id, name, price, finalOrder, setFinalOrder, onAdd, onRemove }) {
  const {
    addCircleSize,
    removeCircleSize,
    handleOrderLogic
  } = useOrderLogic({ onAdd, onRemove });

  const removeOrder = (id) => {
    setFinalOrder((prev) => ({
      ...prev,
      [id]: 0
    }))
  }

  return (
    <div className="cafe__cartItem">
      <div className="cafe__cartItem_content">
        <div className="cafe__cartItem_content-title">
          <p>{name}</p>
        </div>
        <div className="cafe__cartItem_content-price">
          <p>${price}</p>
        </div>
      </div>
      <div className="cafe__cartItem_order">
        <div className="cafe__cartItem_order-count">
          <div>
            <IoRemoveCircleOutline style={{ 'cursor': 'pointer', 'fontSize': `${removeCircleSize}px` }}
              onClick={() => handleOrderLogic('subtract')} />
          </div>
          <p>{finalOrder}</p>
          <div>
            <IoAddCircleOutline style={{ 'cursor': 'pointer', 'fontSize': `${addCircleSize}px` }}
              onClick={() => handleOrderLogic('add')} />
          </div>
        </div>
        <div className="cafe__cartItem_order-delete">
          <TiTrash color="#653C0C" fontSize={25} cursor={'pointer'}
          onClick={() => removeOrder(id)}></TiTrash>
        </div>
      </div>
    </div>
  )
}

export default CartItem