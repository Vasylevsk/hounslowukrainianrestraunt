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

const visitButton = (className) => (
  <a
    href={MAP_GOOGLE_APP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`custom__button app__findus-cta ${className}`.trim()}
  >
    Visit Us
  </a>
);

const FindUs = () => {
  const { content } = useSiteContent();

  return (
    <div className="app__findus app__bg app__wrapper section__padding" id="contact">
      <div className="app__wrapper_info app__findus_copy">
        <SubHeading title="Contact" />
        <div className="app__findus-content">
          <p className="p__cormorant app__findus-label">Find Us</p>
          <p className="p__opensans app__findus-address">
            <a href={MAP_GOOGLE_APP_URL} target="_blank" rel="noopener noreferrer">
              59 York Street, Twickenham TW1 3LP
            </a>
          </p>
          <p className="p__cormorant app__findus-label">Contact Us</p>
          <p className="p__opensans">
            <a href="tel:+442045680606">020 4568 0606</a>
          </p>
          <p className="p__opensans">
            <a href="tel:+447853514567">07853 514567</a>
          </p>
          <p className="p__cormorant app__findus-label">Opening Hours</p>
          {content.workingHours.map((row, i) => (
            <p key={`${row.day}-${i}`} className="p__opensans app__findus-hours">
              {row.day}: {row.hours}
            </p>
          ))}
        </div>
        {visitButton('app__findus-cta--desktop')}
      </div>

      <div className="app__wrapper_img app__findus_map">
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
        </div>
        {visitButton('app__findus-cta--mobile')}
      </div>
    </div>
  );
};

export default FindUs;
