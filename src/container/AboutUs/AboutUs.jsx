import React from 'react';
import { Link } from 'react-router-dom';

import { images } from '../../constants';
import './AboutUs.css';

const AboutUs = () => (
  <div className="app__bg app__wrapper section__padding app__aboutus" id="about">
    <div className="app__wrapper_img app__wrapper_img-reverse">
      <img src={images.p} alt="" aria-hidden />
    </div>

    <div className="app__wrapper_info">
      <h1 className="headtext__cormorant">Breakfast</h1>
      <img src={images.spoon} alt="" className="spoon__img" aria-hidden />
      <p className="p__opensans">
        Proper Ukrainian breakfast until 4:00 PM - platters, omelettes, skillets, potato pancakes, and sweet
        finishes.
      </p>
      <p className="p__opensans">
        Hearty plates for a slow morning or late brunch, cooked with care just like at home.
      </p>
      <Link to="/menu#breakfast" className="custom__button app__aboutus-button">
        View Breakfast Menu
      </Link>
    </div>
  </div>
);

export default AboutUs;
