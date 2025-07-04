import React, { useState, useEffect, useRef, useCallback } from 'react'
import './navbar.css'
import logo from '../../assets/logo.png'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import { CiShoppingCart } from 'react-icons/ci'
import { useIsMobile } from '../../hooks'

const NavbarLinks = () => (
  <nav>
    <div>
      <ul>
        <li className='home'><a href='#home'>Home</a></li>
        <li className='about'><a href='#about'>About</a></li>
        <li className='menu'><a href='#menu'>Menu</a></li>
        <li className='gallery'><a href='#gallery'>Gallery</a></li>
        <li className='contact'><a href='#contact'>Contact</a></li>
      </ul>
    </div>
  </nav>
)

function useOutsideMouseClick(ref, onOutsideClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
}

const ScrollNavbar = ({ navbarRef, onOrderClick }) => {
  const isMobile = useIsMobile(1088);
  const [orderCount, setOrderCount] = useState(0);
  const [cartMargin, setCartMargin] = useState(0.5);
  const [shoppingBorderColor, setShoppingBorderColor] = useState('#653C0C');
  const wrapperRef = useRef(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);


  const cartStyle = {
    'marginLeft': `${cartMargin}rem`,
  }

  const shoppingStyle = {
    'borderColor': `${shoppingBorderColor}`,
  }

  const handleClose = useCallback(() => setToggleMenu(false), []);
  useOutsideMouseClick(wrapperRef, handleClose);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.clientHeight);
    }
  }, [])

  useEffect(() => {
    const handleNavbarPosition = () => {
      const scrolled = window.scrollY > navbarHeight;
      setAtTop(!scrolled);
      setIsHidden(scrolled);
    }

    window.addEventListener('scroll', handleNavbarPosition);
    return () => {
      window.removeEventListener('scroll', handleNavbarPosition);
    }
  }, [navbarHeight, toggleMenu]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isMobile) {
        if (event.clientY <= navbarHeight && !atTop) {
          setIsHidden(false);
        }
        else if (!atTop) {
          setIsHidden(true);
        }
      }
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile, navbarHeight, atTop])

  useEffect(() => {
    const handleScrollForMobile = () => {
      if (isMobile) {
        setPrevScrollPosition(window.pageYOffset);
        if (window.scrollY > navbarHeight) {
          if (toggleMenu) {
            setIsHidden(false)
          }
          else {
            if (window.scrollY > prevScrollPosition) {
              setIsHidden(true);
            }
            else {
              setIsHidden(false);
            }
          }
        }
        setPrevScrollPosition(window.scrollY);
      }
    }

    window.addEventListener('scroll', handleScrollForMobile);
    return () => {
      window.removeEventListener('scroll', handleScrollForMobile);
    }
  }, [isMobile, toggleMenu, navbarHeight, prevScrollPosition])

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav ul li');
    const handleActive = () => {
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= (sectionTop - sectionHeight / 5)) {
          setCurrentSection(section.getAttribute('id'));
        }
      })

      navLi.forEach(li => {
        li.classList.remove('active');
        if (li.classList.contains(currentSection)) {
          li.classList.add('active');
        }
      })
    };
    window.addEventListener('scroll', handleActive);
    return () => {
      window.removeEventListener('scroll', handleActive);
    };
  }, [currentSection]);

  return (
    <div className={`cafe__navbar ${isHidden ? "cafe__navbar__hidden" : ""}`} ref={navbarRef}>
      <div className='cafe__navbar-container'>
        <div className="cafe__navbar-links">
          <div className="cafe__navbar-links_logo">
            <img src={logo} alt='logo' />
          </div>
          <div className="cafe__navbar-links_container">
            <NavbarLinks />
          </div>
        </div>
        <div className="cafe__navbar-sign">
          <div className="cafe__navbar-sign_shoppingcart" style={shoppingStyle}
            onMouseEnter={() => setCartMargin(1)}
            onMouseLeave={() => setCartMargin(0.5)}
            onClick={() => {
              setShoppingBorderColor('#653b0ca1');
              setTimeout(() => setShoppingBorderColor('#653C0C'), 500);
            }}
          >
            <CiShoppingCart style={{ color: 'var(--color-btn)', fontSize: '34', strokeWidth: '1' }} />
            <p style={cartStyle}>{orderCount}</p>
          </div>
          <button type='button' onClick={onOrderClick}><span className="gradient-text">Order Online</span></button>
        </div>
        <div className="cafe__navbar-navbarlinks">
          {toggleMenu
            ? <RiCloseLine data-inside-navbar color='#000' size={27} onClick={() => setToggleMenu(false)} />
            : <RiMenu3Line data-inside-navbar color='#000' size={27} onClick={() => setToggleMenu(true)} />
          }
          {toggleMenu && (
            <div className="cafe__navbar-navbarlinks_container scale-up-center" ref={wrapperRef}>
              <div className="cafe__navbar-navbarlinks_container-links">
                <NavbarLinks />
                <div className="cafe__navbar-navbarlinks_container-sign">
                  <button type='button' onClick={() => {
                    setToggleMenu(false);
                    onOrderClick()
                  }}><span className="gradient-text-dark">Order Online</span></button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScrollNavbar