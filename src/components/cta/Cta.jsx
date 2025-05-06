import React from 'react'
import './cta.css'

function Cta({ title, placeholder, buttonText }) {
  return (
    <div className="cafe__cta">
      <div className="cafe__cta-title gradient-text-dark">
        <p>{title}</p>
      </div>
      <div className="cafe__cta-input">
        <input type="email" placeholder={placeholder}></input>
        <button type="button">{buttonText}</button>
      </div>
    </div>
  )
}

export default Cta