import React from 'react';
import { LoungePromo, SubHeading, BookingForm } from '../components';
import { images } from '../constants';
import './BookingPage.css';

const BookingPage = () => (
  <div className="app__booking-page">
    <div className="app__booking-page_container app__bg section__padding">
      <div className="app__booking-page_content">
        <div className="app__booking-page_info">
          <SubHeading title="Reservation" />
          <h1 className="headtext__cormorant">Book a Table</h1>
          <p className="p__opensans" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            Reserve your table at Prosperity Ukrainian Restaurant
          </p>
          <p className="p__opensans" style={{ marginBottom: '1.5rem', color: '#DCCA87' }}>
            Table reservations are available only during our opening hours (shown when you pick a date).
            For banquets or special events, please contact us directly.
          </p>

          <LoungePromo variant="inline" />

          <BookingForm variant="full" showBackLink />
        </div>

        <div className="app__booking-page_image">
          <img src={images.findus} alt="booking_img" />
        </div>
      </div>
    </div>
  </div>
);

export default BookingPage;
