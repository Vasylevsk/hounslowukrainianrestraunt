import React from 'react';
import { Link } from 'react-router-dom';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Header = () => (
  <div className="app__header app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="Warmth. Taste. Tradition." />
      <h1 className="app__header-h1">Prosperity Ukrainian Restaurant</h1>
      <p className="p__opensans" style={{ margin: '2rem 0' }}>where every dish has a soul</p>
      <Link to="/menu" className="custom__button" style={{ textDecoration: 'none', display: 'inline-block' }}>Explore Menu</Link>
    </div>

    <div className="app__wrapper_img">
      <img src={images.welcome} alt="header_img" />
    </div>
  </div>
);

export default Header;