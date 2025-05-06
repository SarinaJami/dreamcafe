import React from 'react'
import './header.css'
import header from '../../assets/header.png'

function Header() {
  return (
    <div className="cafe__header section-padding" id="home">
      <div className="cafe__header-content">
        <h1>A taste of heaven<br />just in your cup</h1>
      </div>
      <div className="cafe__header-image">
        <img src={header} alt='header' />
      </div>
    </div>
  )
}

export default Header