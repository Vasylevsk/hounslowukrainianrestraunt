import React from 'react';
import { Link } from 'react-router-dom';

import { SubHeading } from '../components';
import { images } from '../constants';
import { ORGANIZATION } from '../constants/seo';
import './BanquetPage.css';

const OCCASIONS = [
  { title: 'Birthdays', text: 'Celebrate with family and friends in a warm atmosphere.' },
  { title: 'Christenings', text: 'A traditional milestone surrounded by loved ones.' },
  { title: 'Family Dinners', text: 'Memorable meals and shared traditions.' },
  { title: 'Wedding Gatherings & Anniversaries', text: 'Receptions and anniversary parties.' },
  { title: 'Intimate Celebrations', text: 'Cosy gatherings, just for your own.' },
];

const BanquetPage = () => (
  <div className="app__banquet-page">
    <div className="app__banquet-page_container app__bg section__padding">
      <div className="app__banquet-page_content">
        <div className="app__banquet-page_header">
          <SubHeading title="Celebrations" />
          <h1 className="headtext__cormorant">A banquet that warms the heart</h1>
          <img src={images.spoon} alt="" className="spoon__img app__banquet-spoon" aria-hidden />
        </div>

        <div className="app__banquet-page_intro">
          <p className="p__opensans">
            Celebrate with warmth, authentic Ukrainian food, and live music - for birthdays, weddings,
            family gatherings, and every occasion that matters.
          </p>
        </div>

        <div className="app__banquet-page_section">
          <h2 className="app__banquet-section-title">Banquets of any format</h2>
          <div className="app__banquet-list">
            {OCCASIONS.map((item) => (
              <div key={item.title} className="app__banquet-list_item">
                <h3 className="app__banquet-item-title p__cormorant">{item.title}</h3>
                <p className="p__opensans">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="app__banquet-page_section">
          <h2 className="app__banquet-section-title">Venue Options</h2>
          <p className="p__opensans app__banquet-section-lead">
            Main restaurant hall or private rooms - choose the setting that fits your day.
          </p>
          <div className="app__banquet-venues">
            <div className="app__banquet-venue">
              <h3 className="app__banquet-venue-title p__cormorant">Main Restaurant Hall</h3>
              <p className="p__opensans">
                Spacious hall for 20-50 guests, with elegant decor and ambient lighting.
              </p>
            </div>
            <div className="app__banquet-venue">
              <h3 className="app__banquet-venue-title p__cormorant">Private Rooms</h3>
              <p className="p__opensans">
                A cosy, private setting for smaller groups who want an intimate experience.
              </p>
            </div>
          </div>
        </div>

        <div className="app__banquet-page_section">
          <h2 className="app__banquet-section-title">Live Music Included</h2>
          <p className="p__opensans">
            Live music is included in the price - traditional Ukrainian songs and an authentic atmosphere
            that makes your celebration truly special.
          </p>
        </div>

        <div className="app__banquet-page_section">
          <h2 className="app__banquet-section-title">Our Menu</h2>
          <p className="p__opensans">
            Traditional Ukrainian banquet dishes, from classics to grilled specialties, prepared with
            authentic recipes and served with care.
          </p>
        </div>

        <div className="app__banquet-page_contact">
          <h2 className="app__banquet-section-title">Book Your Banquet</h2>
          <p className="p__opensans app__banquet-contact-lead">
            Tell us your date and guest count - we will help plan your celebration.
          </p>
          <div className="app__banquet-contact-info">
            <p className="p__opensans">
              <strong>Phone:</strong>{' '}
              <a href={`tel:${ORGANIZATION.telephone}`}>020 4568 0606</a>
            </p>
            <p className="p__opensans">
              <strong>Mobile:</strong>{' '}
              <a href={`tel:${ORGANIZATION.telephoneAlt}`}>07853 514567</a>
            </p>
          </div>
          <div className="app__banquet-actions">
            <a href={`tel:${ORGANIZATION.telephone}`} className="custom__button app__banquet-cta">
              Book Your Event
            </a>
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
