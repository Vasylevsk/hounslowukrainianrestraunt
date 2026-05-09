import React from 'react';
import { Link } from 'react-router-dom';

import { SubHeading } from '../components';
import { images } from '../constants';
import './BanquetPage.css';

const BanquetPage = () => (
  <div className="app__banquet-page">
    <div className="app__banquet-page_container app__bg section__padding">
      <div className="app__banquet-page_content">
        <div className="app__banquet-page_header">
          <SubHeading title="Celebrations" />
          <h1 className="headtext__cormorant">A banquet that warms the heart</h1>
          <img src={images.spoon} alt="spoon" className="spoon__img" style={{ marginTop: '1rem' }} />
        </div>

        <div className="app__banquet-page_intro">
          <p className="p__opensans">
            At Prosperity Ukrainian Restaurant, you don&apos;t just celebrate - you experience a special day filled with warmth, flavour, and live music.
            We create unforgettable moments that bring people together, celebrating life&apos;s most precious occasions.
          </p>
        </div>

        <div className="app__banquet-page_section">
          <h2 className="app__banquet-section-title">Banquets of any format</h2>
          <p className="p__opensans">
            Whether you're planning an intimate gathering or a grand celebration, we offer banquets for every occasion:
          </p>
          <div className="app__banquet-list">
            <div className="app__banquet-list_item">
              <h3 className="p__cormorant" style={{ color: '#DCCA87', marginBottom: '0.5rem' }}>Birthdays</h3>
              <p className="p__opensans">Celebrate another year of life with family and friends in a warm, welcoming atmosphere.</p>
            </div>
            <div className="app__banquet-list_item">
              <h3 className="p__cormorant" style={{ color: '#DCCA87', marginBottom: '0.5rem' }}>Christenings</h3>
              <p className="p__opensans">Mark this special religious milestone with a traditional celebration surrounded by loved ones.</p>
            </div>
            <div className="app__banquet-list_item">
              <h3 className="p__cormorant" style={{ color: '#DCCA87', marginBottom: '0.5rem' }}>Family Dinners</h3>
              <p className="p__opensans">Gather your family for a memorable meal, creating new traditions and cherishing old ones.</p>
            </div>
            <div className="app__banquet-list_item">
              <h3 className="p__cormorant" style={{ color: '#DCCA87', marginBottom: '0.5rem' }}>Wedding Gatherings & Anniversaries</h3>
              <p className="p__opensans">Celebrate love and commitment with a beautiful reception or anniversary party that honors your special bond.</p>
            </div>
            <div className="app__banquet-list_item">
              <h3 className="p__cormorant" style={{ color: '#DCCA87', marginBottom: '0.5rem' }}>Intimate Celebrations</h3>
              <p className="p__opensans">Even the smallest gatherings deserve to be special. We create cozy, intimate celebrations "just for our own."</p>
            </div>
          </div>
        </div>

        <div className="app__banquet-page_section">
          <h2 className="app__banquet-section-title">Venue Options</h2>
          <p className="p__opensans">
            Choose between our main restaurant hall or private rooms - perfect for creating the atmosphere you desire:
          </p>
          <div className="app__banquet-venues">
            <div className="app__banquet-venue">
              <h3 className="p__cormorant" style={{ color: '#DCCA87', marginBottom: '1rem' }}>Main Restaurant Hall</h3>
              <p className="p__opensans">
                Our spacious main hall can accommodate larger celebrations with an elegant, welcoming atmosphere. 
                Perfect for gatherings of 20-50 guests, with beautiful decor and ambient lighting.
              </p>
            </div>
            <div className="app__banquet-venue">
              <h3 className="p__cormorant" style={{ color: '#DCCA87', marginBottom: '1rem' }}>Private Rooms</h3>
              <p className="p__opensans">
                For more intimate celebrations, our private rooms offer a cozy, exclusive setting. 
                Ideal for smaller groups who want privacy and a personalized experience.
              </p>
            </div>
          </div>
        </div>

        <div className="app__banquet-page_section">
          <h2 className="app__banquet-section-title">Live Music Included</h2>
          <p className="p__opensans">
            Live music is included in the price! We play music that touches the heart - from traditional Ukrainian songs
            to modern interpretations. Our musicians create an authentic atmosphere that makes your celebration truly special.
          </p>
          <p className="p__opensans" style={{ marginTop: '1rem' }}>
            The music adds soul to your celebration, connecting you to Ukrainian culture and creating memories that will last a lifetime.
          </p>
        </div>

        <div className="app__banquet-page_section">
          <h2 className="app__banquet-section-title">Our Menu</h2>
          <p className="p__opensans">
            Our banquet menu features traditional Ukrainian dishes with a modern presentation. Each dish is carefully prepared
            using authentic recipes passed down through generations. From classic khinkali and khachapuri to grilled meats and traditional stews,
            we offer something special for every taste.
          </p>
          <p className="p__opensans" style={{ marginTop: '1rem' }}>
            Here, you can experience the rich flavors of Ukraine - in the spices, the music, and the details.
            We bring the authentic taste of Ukrainian cuisine to your table.
          </p>
        </div>

        <div className="app__banquet-page_contact">
          <h2 className="app__banquet-section-title">Book Your Banquet</h2>
          <p className="p__opensans" style={{ marginBottom: '2rem' }}>
            Ready to plan your special celebration? Contact us to discuss your needs and we'll create a memorable experience for you and your guests.
          </p>
          <div className="app__banquet-contact-info">
            <p className="p__opensans"><strong>Phone:</strong> <a href="tel:+442045680606">020 4568 0606</a></p>
            <p className="p__opensans"><strong>Mobile:</strong> <a href="tel:+447853514567">07853 514567</a></p>
          </div>
          <div className="app__banquet-actions">
            <Link to="/booking" className="custom__button" style={{ textDecoration: 'none', display: 'inline-block', marginRight: '1rem' }}>
              Book a Table
            </Link>
            <Link to="/" className="app__banquet-link">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BanquetPage;
