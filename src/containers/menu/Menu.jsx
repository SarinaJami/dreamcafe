import React, { useRef, useEffect } from 'react'
import './menu.css'
import cafe from '../../assets/cafe.png'
import { MenuItem } from '../../components'



function Menu() {
  const rotateRef = useRef(null);

  return (
    <div className="cafe__menu section-padding" id="menu">
      <div className="cafe__menu-content">
        <div className="cafe__menu-content_heading" ref={rotateRef} onMouseOverCapture={() => {
          rotateRef.current.classList.add("rotate-center");
          setTimeout(() => {
            rotateRef.current.classList.remove("rotate-center");
          }, 700);
        }}>
          <h1 className="gradient-text-dark">Drops of <span>Brown</span> Love</h1>
        </div>
        <div className="cafe__menu-content_items">
          <MenuItem title="Latte" ingredients={["Espresso", "Steamed Milk", "Foam"]} price={6.8} />
          <MenuItem title="Americano" ingredients={["Espresso", "Off-boil Water"]} price={4.9} />
          <MenuItem title="Mocha" ingredients={["Brewed Coffee", "Milk", "Cocoa Powder", "White Sugar"]} price={6.8} />
          <MenuItem title="Cappuccino" ingredients={["Espresso", "Steamed Milk", "Foam"]} price={6.5} />
          <MenuItem title="Caramel Macchiato" ingredients={["Espresso", "Milk", "Simple Syrup", "Caramel Syrup"]} price={5.6} />
          <MenuItem title="Irish Coffee" ingredients={["Coffee", "Irish Whiskey", "Brown Sugar", "Fresh Cream"]} price={7.5} />
        </div>
      </div>
      <div className="cafe__menu-image">
        <img src={cafe} alt='cafe' />
      </div>
    </div>
  )
}

export default Menu