import React, { useState, useEffect } from 'react'
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

const ScrollNavbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  // State variables to manage scroll behavior
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [top, setTop] = useState(0);
  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        setTop(0); // Show navbar
      } else {
        setTop(-100); // Hide navbar
      }
      setPrevScrollpos(currentScrollPos);
    };
    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);
    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollpos]);

  const navbarStyle = {
    position: 'fixed',
    top: `${top}px`,
    width: '100%',
    transition: 'top 0.3s',
  }

  return (
    <div className="cafe__navbar" style={navbarStyle}>
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

export default ScrollNavbar