import React, { useState, useEffect, useRef } from 'react'
import './navbar.css'
import logo from '../../assets/logo.png'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'

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

function useOutsideMouseClick(ref, setToggleMenu) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setToggleMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setToggleMenu]);
}

const ScrollNavbar = () => {
  const smallScreenSize = 1060;
  const wrapperRef = useRef(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [currentSection, setCurrentSection] = useState('');

  useOutsideMouseClick(wrapperRef, setToggleMenu);

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

      if (window.innerWidth <= smallScreenSize) {
        if (window.scrollY > navbarHeight) {
          toggleMenu ? setIsHidden(false) : setIsHidden(true);
        }
      }
    }

    window.addEventListener('scroll', handleNavbarPosition);
    return () => {
      window.removeEventListener('scroll', handleNavbarPosition);
    }
  }, [navbarHeight, toggleMenu]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if ((window.innerWidth <= smallScreenSize) && toggleMenu) {
        setIsHidden(false);
      }
      else {
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
  }, [navbarHeight, atTop, toggleMenu])

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
          <div className="cafe__navbar-navbarlinks_container scale-up-center" ref={wrapperRef}>
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