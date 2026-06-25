import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

import { NAV_CTA, NAV_LINKS } from '../../constants/navigation';
import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (toggleMenu) {
      document.body.classList.add('nav-overlay-open');
    } else {
      document.body.classList.remove('nav-overlay-open');
    }
    return () => document.body.classList.remove('nav-overlay-open');
  }, [toggleMenu]);

  const closeMenu = () => setToggleMenu(false);

  const scrollToAnchor = (anchor) => {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAnchorClick = (e, anchor) => {
    e.preventDefault();
    closeMenu();

    if (location.pathname !== '/') {
      history.push({ pathname: '/', hash: anchor.slice(1) });
      return;
    }

    scrollToAnchor(anchor);
  };

  const renderNavItem = (link, onNavigate) => {
    if (link.type === 'anchor') {
      return (
        <a href={link.to} onClick={(e) => handleAnchorClick(e, link.to)}>
          {link.label}
        </a>
      );
    }

    return (
      <Link to={link.to} onClick={onNavigate}>
        {link.label}
      </Link>
    );
  };

  return (
    <nav className="app__navbar" aria-label="Main">
      <div className="app__navbar-logo">
        <Link to="/" className="app__navbar-logo-text">
          PROSPERITY
        </Link>
      </div>

      <ul className="app__navbar-links">
        {NAV_LINKS.map((link) => (
          <li key={link.to} className="p__opensans">
            {renderNavItem(link)}
          </li>
        ))}
      </ul>

      <div className="app__navbar-login">
        <Link to={NAV_CTA.to} className="p__opensans app__navbar-cta">
          {NAV_CTA.label}
        </Link>
      </div>

      <div className="app__navbar-smallscreen">
        <button
          type="button"
          className="app__navbar-menu-btn"
          onClick={() => setToggleMenu(true)}
          aria-label="Open menu"
        >
          <GiHamburgerMenu color="#fff" fontSize={27} />
        </button>

        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <button
              type="button"
              className="overlay__close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <MdOutlineRestaurantMenu fontSize={27} />
            </button>
            <ul className="app__navbar-smallscreen_links">
              {NAV_LINKS.map((link) => (
                <li key={link.to} className="p__opensans">
                  {renderNavItem(link, closeMenu)}
                </li>
              ))}
              <li className="p__opensans app__navbar-mobile-cta">
                <Link to={NAV_CTA.to} onClick={closeMenu} className="app__navbar-cta">
                  {NAV_CTA.label}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
