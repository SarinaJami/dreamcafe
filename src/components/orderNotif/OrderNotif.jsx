import React from 'react'
import './orderNotif.css'
import { AiOutlineCloseCircle } from 'react-icons/ai';

function OrderNotif({ message, buttonMessage, buttonOnClick, notifRef, onNotifClose }) {
  return (
    <div className="cafe__ordernotif" ref={notifRef}>
      <div className="cafe__ordernotif-close">
        <AiOutlineCloseCircle color='#653C0C' size={25} cursor={'pointer'} onClick={onNotifClose}></AiOutlineCloseCircle>
      </div>
      <div className="cafe__ordernotif-message">
        <p>{message}</p>
      </div>
      <div className="cafe__ordernotif-button">
        <button onClick={buttonOnClick}><span className="gradient-text">{buttonMessage}</span></button>
      </div>
    </div>
  )
}

export default OrderNotif