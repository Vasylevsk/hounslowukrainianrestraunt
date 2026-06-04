import React from 'react';
import { Link } from 'react-router-dom';

import SubHeading from '../SubHeading/SubHeading';
import './LoungePromo.css';

const LoungePromo = ({ variant = 'section' }) => {
  if (variant === 'inline') {
    return (
      <aside className="lounge-promo lounge-promo--inline" aria-label="Lounge hookah">
        <div className="lounge-promo__inline-main">
          <p className="lounge-promo__eyebrow">The Lounge</p>
          <p className="lounge-promo__inline-title">Hookah available</p>
          <p className="lounge-promo__inline-text p__opensans">
            Premium hookah in a relaxed lounge setting. Ask when you book or speak to our team on arrival.
          </p>
        </div>
        <p className="lounge-promo__price" aria-label="Price 27 pounds">
          <span className="lounge-promo__price-value">£27</span>
        </p>
      </aside>
    );
  }

  return (
    <section className="lounge-promo lounge-promo--section app__bg section__padding" id="lounge" aria-labelledby="lounge-promo-heading">
      <div className="lounge-promo__inner">
        <div className="lounge-promo__visual" aria-hidden>
          <div className="lounge-promo__orb lounge-promo__orb--1" />
          <div className="lounge-promo__orb lounge-promo__orb--2" />
          <p className="lounge-promo__visual-label">Lounge</p>
          <p className="lounge-promo__price lounge-promo__price--hero">
            <span className="lounge-promo__price-value">£27</span>
            <span className="lounge-promo__price-caption">hookah</span>
          </p>
        </div>

        <div className="lounge-promo__copy">
          <SubHeading title="Evenings at Prosperity" />
          <p className="lounge-promo__eyebrow">Restaurant &amp; Lounge</p>
          <h2 id="lounge-promo-heading" className="lounge-promo__title headtext__cormorant">
            Hookah in the Lounge
          </h2>
          <p className="lounge-promo__lead p__opensans">
            After dinner or for a late evening with friends - enjoy a premium hookah in our lounge. Ukrainian warmth,
            calm atmosphere, and attentive service.
          </p>
          <ul className="lounge-promo__perks p__opensans">
            <li>Premium hookah - <strong>£27</strong></li>
            <li>Available in the Lounge area</li>
            <li>Reserve &quot;Lounge&quot; when booking a table</li>
          </ul>
          <Link to="/booking" className="custom__button lounge-promo__cta">
            Book the Lounge
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoungePromo;
