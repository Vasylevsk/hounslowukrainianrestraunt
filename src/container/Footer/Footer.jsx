import React from 'react';
import { FiInstagram } from 'react-icons/fi';
import { FaTripadvisor } from 'react-icons/fa';
import { SiDeliveroo, SiUbereats } from 'react-icons/si';
import { Link } from 'react-router-dom';

import { FooterOverlay } from '../../components';
import { FOOTER_LEGAL_LINKS } from '../../constants/legalContent';
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
        <nav className="app__footer-legal" aria-label="Legal">
          {FOOTER_LEGAL_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="app__footer-legal-link">
              {link.label}
            </Link>
          ))}
        </nav>
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
      <div className="footer__copyright-inner">
        <p className="footer__copyright-legal p__opensans">
          {new Date().getFullYear()} Prosperity Ukrainian Restaurant. All rights reserved.
        </p>
        <a
          href="https://ttmms.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__copyright-credit"
        >
          <span>Made with</span>
          <svg
            className="footer__copyright-heart"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="currentColor"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          <span>
            by <span className="footer__copyright-brand">TTMMS.UK</span>
          </span>
        </a>
      </div>
    </div>

  </div>
  );
};

export default Footer;