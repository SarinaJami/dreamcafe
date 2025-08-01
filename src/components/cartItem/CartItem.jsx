import { useEffect, useState } from "react";
import './cartItem.css'
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

function CartItem({ name, price, finalOrder, onAdd, onRemove }) {
  const {
    addCircleSize,
    removeCircleSize,
    handleOrderLogic
  } = useOrderLogic({ onAdd, onRemove });

  return (
    <div className="cafe__cartItem">
      <div className="cafe__cartItem_col1">
        <p>{name}</p>
        <div className="cafe__cartItem-count">
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
      </div>
    </div>
  )
}

export default CartItem