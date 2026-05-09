import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const location = useLocation();

  const handleAnchorClick = (e, anchor) => {
    e.preventDefault();
    setToggleMenu(false);

    if (location.pathname !== '/') {
      // If not on home page, navigate to home with anchor
      window.location.href = anchor;
    } else {
      // If on home page, scroll to anchor smoothly
      const element = document.querySelector(anchor);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className="app__navbar">
        <div className="app__navbar-logo">
          <Link to="/" className="app__navbar-logo-text">
            PROSPERITY
          </Link>
        </div>
        <ul className="app__navbar-links">
          <li className="p__opensans"><a href="#home" onClick={(e) => handleAnchorClick(e, '#home')}>Home</a></li>
          <li className="p__opensans"><a href="#about" onClick={(e) => handleAnchorClick(e, '#about')}>About</a></li>
          <li className="p__opensans"><Link to="/menu">Menu</Link></li>
          <li className="p__opensans"><Link to="/banquet">Banquet</Link></li>
          <li className="p__opensans"><Link to="/humanitarian-aid">Ukraine aid</Link></li>
          <li className="p__opensans"><a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>Contact</a></li>
        </ul>
        <div className="app__navbar-login">
          <Link to="/booking" className="p__opensans">Book Table</Link>
        </div>
        <div className="app__navbar-smallscreen">
          <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />

          {toggleMenu && (
            <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
              <ul className="app__navbar-smallscreen_links">
                <li className="p__opensans"><a href="#home" onClick={(e) => handleAnchorClick(e, '#home')}>Home</a></li>
                <li className="p__opensans"><a href="#about" onClick={(e) => handleAnchorClick(e, '#about')}>About</a></li>
                <li className="p__opensans"><Link to="/menu" onClick={() => setToggleMenu(false)}>Menu</Link></li>
                <li className="p__opensans"><Link to="/banquet" onClick={() => setToggleMenu(false)}>Banquet</Link></li>
                <li className="p__opensans"><Link to="/humanitarian-aid" onClick={() => setToggleMenu(false)}>Ukraine aid</Link></li>
                <li className="p__opensans"><a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>Contact</a></li>
                <li className="p__opensans"><Link to="/booking" onClick={() => setToggleMenu(false)}>Book Table</Link></li>
              </ul>
            </div>
          )}


        </div>
    </nav>
  );
}


export default Navbar;
