import React from 'react'
import './orderNotif.css'

function OrderNotif({ message, buttonMessage, buttonOnClick, notifRef }) {
  return (
    <div className="cafe__ordernotif" ref={notifRef}>
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