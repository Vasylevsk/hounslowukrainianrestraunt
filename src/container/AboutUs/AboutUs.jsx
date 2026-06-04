import React from 'react';
import { Link } from 'react-router-dom';

import { images } from '../../constants';
import './AboutUs.css';

const AboutUs = () => (
  <div className="app__aboutus app__bg flex__center section__padding" id="about">
    <div className="app__aboutus-overlay flex__center">
      <img src={images.G} alt="P_overlay" />
    </div>

    <div className="app__aboutus-content flex__center">
      <div className="app__aboutus-content_about">
        <h1 className="headtext__cormorant">A banquet that warms the heart</h1>
        <img src={images.spoon} alt="about_spoon" className="spoon__img" />
        <p className="p__opensans">Celebrate life's precious moments in an atmosphere of warmth and authenticity. Every celebration becomes a memory to cherish.</p>
        <p className="p__opensans">Whether it&apos;s a grand wedding, intimate family gathering, or milestone birthday - we create the perfect setting for your special day.</p>
        <p className="p__opensans">Choose between our elegant main hall or cozy private rooms. Traditional Ukrainian music accompanies every celebration.</p>
        <Link to="/banquet" className="custom__button app__aboutus-button">Know More</Link>
      </div>

      <div className="app__aboutus-content_knife flex__center">
        <img src={images.knife} alt="about_knife" />
      </div>

      <div className="app__aboutus-content_history">
        <h1 className="headtext__cormorant">Breakfast</h1>
        <img src={images.spoon} alt="about_spoon" className="spoon__img" />
        <p className="p__opensans">Start your day with a proper Ukrainian breakfast - served until 4:00 PM.</p>
        <p className="p__opensans">Full House and Green House platters, omelettes, skillets, potato pancakes, and sweet finishes.</p>
        <p className="p__opensans">Hearty plates for a slow morning or a late brunch - cooked with care, just like at home.</p>
        <Link to="/breakfast" className="custom__button app__aboutus-button">
          View Breakfast Menu
        </Link>
      </div>
    </div>
  </div>
);

export default AboutUs;