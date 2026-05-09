import React from 'react';

import { SubHeading } from '../../components';
import { useSiteContent } from '../../context/SiteContentContext';
import './FindUs.css';

/** Same place as https://maps.app.goo.gl/6cZKRmVvRjkUgx5v7 (place ref 0x48760c61a66424ef:0xa73496e77faaa7d0) */
const MAP_GOOGLE_APP_URL = 'https://maps.app.goo.gl/6cZKRmVvRjkUgx5v7';

/**
 * Google Maps embed for this exact business (not a generic address search).
 * Coordinates match the short link redirect: 51.448228, -0.3256238
 */
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1988.4!2d-0.3256238!3d51.448228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760c61a66424ef%3A0xa73496e77faaa7d0!2sProsperity%20Ukrainian%20Cafe%20%26%20Restaurant!5e0!3m2!1sen!2suk!4v1!5m2!1sen!2suk';

const FindUs = () => {
  const { content } = useSiteContent();

  return (
    <div className="app__bg app__wrapper section__padding" id="contact">
      <div className="app__wrapper_info">
        <SubHeading title="Contact" />
        <h1 className="headtext__cormorant" style={{ marginBottom: '3rem' }}>
          Find Us
        </h1>
        <div className="app__wrapper-content">
          <p className="p__cormorant" style={{ color: '#DCCA87', marginBottom: '1rem' }}>
            Find Us
          </p>
          <p className="p__opensans" style={{ marginBottom: '2rem' }}>
            <a
              href={MAP_GOOGLE_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#DCCA87', textDecoration: 'none', transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => {
                e.target.style.color = '#F5E6D3';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#DCCA87';
              }}
            >
              59 York Street, Twickenham TW1 3LP
            </a>
          </p>
          <p className="p__cormorant" style={{ color: '#DCCA87', margin: '2rem 0 1rem 0' }}>
            Contact Us
          </p>
          <p className="p__opensans">
            <a href="tel:+442045680606">020 4568 0606</a>
          </p>
          <p className="p__opensans">
            <a href="tel:+447853514567">07853 514567</a>
          </p>
          <p className="p__cormorant" style={{ color: '#DCCA87', margin: '2rem 0 1rem 0' }}>
            Opening Hours
          </p>
          {content.workingHours.map((row, i) => (
            <p key={`${row.day}-${i}`} className="p__opensans">
              {row.day}: {row.hours}
            </p>
          ))}
        </div>
        <a
          href={MAP_GOOGLE_APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="custom__button"
          style={{ marginTop: '2rem', textDecoration: 'none', display: 'inline-block' }}
        >
          Visit Us
        </a>
      </div>

      <div className="app__wrapper_img">
        <div className="app__findus-map">
          <div className="app__findus-map-inner">
            <iframe
              title="Prosperity Ukrainian Restaurant on Google Maps"
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="app__findus-map-caption">
            <a className="app__findus-map-link" href={MAP_GOOGLE_APP_URL} target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FindUs;
