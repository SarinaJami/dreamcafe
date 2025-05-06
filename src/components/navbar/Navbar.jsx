import React, { useState } from 'react'
import './navbar.css'
import logo from '../../assets/logo.png'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'

const NavbarLinks = () => (
  <>
    <p><a href='#home'>Home</a></p>
    <p><a href='#about'>About</a></p>
    <p><a href='#menu'>Menu</a></p>
    <p><a href='#gallery'>Gallery</a></p>
    <p><a href='#contact'>Contact</a></p>
  </>
)

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="cafe__navbar" id="home">
      <div className="cafe__navbar-links">
        <div className="cafe__navbar-links_logo">
          <img src={logo} alt='logo' />
        </div>
        <div className="cafe__navbar-links_container">
          <NavbarLinks />
        </div>
      </div>
      <div className="cafe__navbar-sign">
        <p>Log in / Register</p>
        <div></div>
        <button type='button'><span className="gradient-text">Order Online</span></button>
      </div>
      <div className="cafe__navbar-navbarlinks">
        {toggleMenu
          ? <RiCloseLine color='#000' size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color='#000' size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className="cafe__navbar-navbarlinks_container scale-up-center">
            <div className="cafe__navbar-navbarlinks_container-links">
              <NavbarLinks />
              <div className="cafe__navbar-navbarlinks_container-sign">
                <p>Log in / Register</p>
                <div></div>
                <button type='button'><span className="gradient-text-dark">Order Online</span></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar