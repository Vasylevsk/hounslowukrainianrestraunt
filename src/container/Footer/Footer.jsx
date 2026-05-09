import React from 'react';
import { FiInstagram } from 'react-icons/fi';
import { FaTripadvisor } from 'react-icons/fa';
import { SiDeliveroo, SiUbereats } from 'react-icons/si';
import { Link } from 'react-router-dom';

import { FooterOverlay } from '../../components';
import { images } from '../../constants';
import { SOCIAL_LINKS } from '../../constants/social';
import { useSiteContent } from '../../context/SiteContentContext';
import './Footer.css';

const Footer = () => {
  const { content } = useSiteContent();

  return (
  <div className="app__footer section__padding" id="contact">
    <FooterOverlay />

    <div className="app__footer-links">
      <div className="app__footer-links_contact">
        <h1 className="app__footer-headtext">Contact Us</h1>
        <p className="p__opensans"><a href="tel:+442045680606">020 4568 0606</a></p>
        <p className="p__opensans"><a href="tel:+447853514567">07853 514567</a></p>
        <p className="p__opensans" style={{ marginTop: '1rem' }}>
          <Link to="/humanitarian-aid">Humanitarian aid for Ukraine</Link>
        </p>
        <p className="p__opensans app__footer-press-line">
          <Link to="/humanitarian-aid#press">BBC, press &amp; video</Link>
        </p>
      </div>

      <div className="app__footer-links_logo">
        <h1 className="app__footer-logo-text">PROSPERITY</h1>
        <p className="p__opensans">&quot;The best way to find yourself is to lose yourself in the service of others.&quot;</p>
        <img src={images.spoon} alt="" className="spoon__img" style={{ marginTop: 15 }} />
        <div className="app__footer-links_icons">
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="app__footer-social-link">
            <FiInstagram />
          </a>
          <a href={SOCIAL_LINKS.tripadvisor} target="_blank" rel="noopener noreferrer" aria-label="Tripadvisor" className="app__footer-social-link">
            <FaTripadvisor />
          </a>
          <a href={SOCIAL_LINKS.deliveroo} target="_blank" rel="noopener noreferrer" aria-label="Deliveroo" className="app__footer-social-link">
            <SiDeliveroo />
          </a>
          <a href={SOCIAL_LINKS.uberEats} target="_blank" rel="noopener noreferrer" aria-label="Uber Eats" className="app__footer-social-link">
            <SiUbereats />
          </a>
        </div>
      </div>

      <div className="app__footer-links_work">
        <h1 className="app__footer-headtext">Working Hours</h1>
        {content.workingHours.map((row, i) => (
          <p key={`${row.day}-${i}`} className="p__opensans">
            {row.day}: {row.hours}
          </p>
        ))}
      </div>
    </div>

    <div className="footer__copyright">
      <p className="p__opensans">{new Date().getFullYear()} Prosperity Ukrainian Restaurant. All rights reserved.</p>
    </div>

  </div>
  );
};

export default Footer;