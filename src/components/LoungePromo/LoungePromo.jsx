import React from 'react';
import { Link } from 'react-router-dom';

import SubHeading from '../SubHeading/SubHeading';
import './LoungePromo.css';

const LoungePromo = ({ variant = 'section' }) => {
  if (variant === 'inline') {
    return (
      <aside className="lounge-promo lounge-promo--inline" aria-label="Lounge shisha">
        <div className="lounge-promo__inline-main">
          <p className="lounge-promo__inline-title">Shisha available</p>
          <p className="lounge-promo__inline-text p__opensans">
            Premium shisha in our lounge. Ask when you book or speak to our team on arrival.
          </p>
        </div>
        <p className="lounge-promo__price" aria-label="Price 27 pounds">
          <span className="lounge-promo__price-value">£27</span>
        </p>
      </aside>
    );
  }

  return (
    <section
      className="lounge-promo lounge-promo--section app__bg section__padding"
      id="lounge"
      aria-labelledby="lounge-promo-heading"
    >
      <div className="lounge-promo__inner">
        <SubHeading title="Lounge" />

        <h2 id="lounge-promo-heading" className="lounge-promo__title headtext__cormorant">
          Premium Shisha
        </h2>

        <p className="lounge-promo__lead p__opensans">
          Unwind after dinner in our lounge with premium shisha, a calm atmosphere, and attentive service.
        </p>

        <div className="lounge-promo__details" role="list">
          <div className="lounge-promo__detail" role="listitem">
            <span className="lounge-promo__detail-label">Price</span>
            <span className="lounge-promo__detail-value">£27</span>
          </div>
          <div className="lounge-promo__detail" role="listitem">
            <span className="lounge-promo__detail-label">Setting</span>
            <span className="lounge-promo__detail-value">Lounge area</span>
          </div>
          <div className="lounge-promo__detail" role="listitem">
            <span className="lounge-promo__detail-label">Booking</span>
            <span className="lounge-promo__detail-value">Select Lounge</span>
          </div>
        </div>

        <Link to="/booking" className="custom__button lounge-promo__cta">
          Book the Lounge
        </Link>
      </div>
    </section>
  );
};

export default LoungePromo;
