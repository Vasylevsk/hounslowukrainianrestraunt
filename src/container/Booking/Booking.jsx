import React from 'react';

import { SubHeading, BookingForm } from '../../components';
import { images } from '../../constants';
import './Booking.css';

const Booking = () => (
  <div className="app__bg app__wrapper section__padding" id="booking">
    <div className="app__wrapper_info">
      <SubHeading title="Reservation" />
      <h1 className="headtext__cormorant" style={{ marginBottom: '3rem' }}>
        Book a Table
      </h1>
      <p className="p__opensans" style={{ marginBottom: '2rem' }}>
        Reserve your table at Prosperity Ukrainian Restaurant
      </p>

      <BookingForm variant="compact" />
    </div>

    <div className="app__wrapper_img">
      <img src={images.findus} alt="booking_img" />
    </div>
  </div>
);

export default Booking;
