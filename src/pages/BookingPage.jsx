import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { SubHeading } from '../components';
import { images } from '../constants';
import './BookingPage.css';

const BookingPage = () => {
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
    <div className="app__booking-page">
      <div className="app__booking-page_container app__bg section__padding">
        <div className="app__booking-page_content">
          <div className="app__booking-page_info">
            <SubHeading title="Reservation" />
            <h1 className="headtext__cormorant">Book a Table</h1>
            <p className="p__opensans" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              Reserve your table at Prosperity Ukrainian Restaurant
            </p>
            <p className="p__opensans" style={{ marginBottom: '2rem', color: '#DCCA87' }}>
              Please note that table reservations are available only during our opening hours.
              For banquets or special events, please contact us directly.
            </p>
            
            <form className="app__booking-form" onSubmit={handleSubmit}>
              <div className="app__booking-form_row">
                <div className="app__booking-form_field">
                  <label className="app__booking-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="app__booking-input"
                  />
                </div>
                <div className="app__booking-form_field">
                  <label className="app__booking-label">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="app__booking-input"
                  />
                </div>
              </div>
              
              <div className="app__booking-form_row">
                <div className="app__booking-form_field">
                  <label className="app__booking-label">Your Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="app__booking-input"
                  />
                </div>
                <div className="app__booking-form_field">
                  <label className="app__booking-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="app__booking-input"
                  />
                </div>
              </div>
              
              <div className="app__booking-form_row">
                <div className="app__booking-form_field">
                  <label className="app__booking-label">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="app__booking-input"
                  />
                </div>
                <div className="app__booking-form_field">
                  <label className="app__booking-label">Number of Guests</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="app__booking-input"
                  >
                    <option value="">Select number of guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="7">7+ Guests</option>
                  </select>
                </div>
              </div>
              
              <div className="app__booking-form_field">
                <label className="app__booking-label">Special Requests (Optional)</label>
                <textarea
                  name="message"
                  placeholder="Any special requests or notes..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="app__booking-textarea"
                />
              </div>
              
              <div className="app__booking-form_actions">
                <button type="submit" className="custom__button">
                  Book Table
                </button>
                <Link to="/" className="app__booking-link">
                  Back to Home
                </Link>
              </div>
            </form>
          </div>

          <div className="app__booking-page_image">
            <img src={images.findus} alt="booking_img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
