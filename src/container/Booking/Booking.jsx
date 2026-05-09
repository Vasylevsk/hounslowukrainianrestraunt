import React, { useState } from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Booking.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    alert('Thank you! Your table reservation request has been submitted. We will contact you shortly to confirm.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      message: ''
    });
  };

  return (
    <div className="app__bg app__wrapper section__padding" id="booking">
      <div className="app__wrapper_info">
        <SubHeading title="Reservation" />
        <h1 className="headtext__cormorant" style={{ marginBottom: '3rem' }}>Book a Table</h1>
        <p className="p__opensans" style={{ marginBottom: '2rem' }}>
          Reserve your table at Prosperity Ukrainian Restaurant
        </p>
        <p className="p__opensans" style={{ marginBottom: '2rem', color: '#DCCA87' }}>
          Please note that table reservations are available only during our opening hours.
          For banquets or special events, please contact us directly.
        </p>
        
        <form className="app__booking-form" onSubmit={handleSubmit}>
          <div className="app__booking-form_row">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="app__booking-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="app__booking-input"
            />
          </div>
          
          <div className="app__booking-form_row">
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="app__booking-input"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="app__booking-input"
            />
          </div>
          
          <div className="app__booking-form_row">
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="app__booking-input"
            />
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="app__booking-input"
            >
              <option value="">Number of Guests</option>
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guests</option>
              <option value="6">6 Guests</option>
              <option value="7">7+ Guests</option>
            </select>
          </div>
          
          <textarea
            name="message"
            placeholder="Special Requests (Optional)"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="app__booking-textarea"
          />
          
          <button type="submit" className="custom__button" style={{ marginTop: '2rem' }}>
            Book Table
          </button>
        </form>
      </div>

      <div className="app__wrapper_img">
        <img src={images.findus} alt="booking_img" />
      </div>
    </div>
  );
};

export default Booking;
