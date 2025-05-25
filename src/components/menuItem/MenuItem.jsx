import React from 'react'
import './menuitem.css'

function MenuItem({ title, ingredients, price }) {
  return (
    <div className="cafe__menuitem">
      <div className="cafe__menuitem-content">
        <p>{title}</p>
        <p>{ingredients.join(' | ')}</p>
      </div>
      <div className="cafe__menuitem-price">
        <div></div>
        <p>${price.toFixed(1)}</p>
      </div>
    </div>
  )
}

export default MenuItem