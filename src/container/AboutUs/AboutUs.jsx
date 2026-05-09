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
        <h1 className="headtext__cormorant">Our Menu</h1>
        <img src={images.spoon} alt="about_spoon" className="spoon__img" />
        <p className="p__opensans">Traditional Ukrainian dishes with modern presentation. Authentic recipes passed through generations.</p>
        <p className="p__opensans">Experience the rich flavors of Ukraine in every dish, every detail. Authentic Ukrainian cuisine at your table.</p>
        <p className="p__opensans">From classic khinkali and khachapuri to grilled meats and traditional stews - something special for every taste.</p>
        <Link to="/banquet" className="custom__button app__aboutus-button">Know More</Link>
      </div>
    </div>
  </div>
);

export default AboutUs;