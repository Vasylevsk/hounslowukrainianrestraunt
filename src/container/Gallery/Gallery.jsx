import React from 'react';
import { BsArrowLeftShort, BsArrowRightShort, BsInstagram, BsTicketPerforated } from 'react-icons/bs';

import { SubHeading } from '../../components';
import { EVENT_HIGHLIGHTS, sortEventsByDate } from '../../constants/events';
import { SOCIAL_LINKS } from '../../constants/social';
import './Gallery.css';

const Gallery = () => {
  const scrollRef = React.useRef(null);
  const events = React.useMemo(() => sortEventsByDate(EVENT_HIGHLIGHTS), []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;

    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  return (
    <div className="app__gallery flex__center">
      <div className="app__gallery-content">
        <SubHeading title="Events" />
        <h1 className="headtext__cormorant">Event Highlights</h1>
        <p className="p__opensans app__gallery-intro">
          Take a look at our recent celebrations, private parties, and live evenings at Prosperity.
        </p>
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="custom__button"
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          See Events
        </a>
      </div>

      <div className="app__gallery-images">
        <div className="app__gallery-images_container" ref={scrollRef}>
          {events.map((event) => (
            <a
              key={event.id}
              href={event.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`app__gallery-images_card flex__center ${
                event.ended ? 'app__gallery-images_card--ended' : ''
              }`}
              aria-label={`${event.title}${event.badge ? ` - ${event.badge}` : ''}`}
            >
              <img src={event.image} alt={event.alt} />
              {event.badge ? (
                <span
                  className={`app__gallery-event-badge ${
                    event.ended ? 'app__gallery-event-badge--ended' : 'app__gallery-event-badge--active'
                  }`}
                >
                  {event.badge}
                </span>
              ) : null}
              <span className="app__gallery-event-caption">
                <span className="app__gallery-event-caption-title">{event.title}</span>
                {event.subtitle ? (
                  <span className="app__gallery-event-caption-sub">{event.subtitle}</span>
                ) : null}
              </span>
              {event.linkType === 'tickets' ? (
                <BsTicketPerforated className="gallery__image-icon" aria-hidden />
              ) : (
                <BsInstagram className="gallery__image-icon" aria-hidden />
              )}
            </a>
          ))}
        </div>
        <div className="app__gallery-images_arrows">
          <BsArrowLeftShort
            className="gallery__arrow-icon"
            onClick={() => scroll('left')}
            aria-label="Scroll events left"
          />
          <BsArrowRightShort
            className="gallery__arrow-icon"
            onClick={() => scroll('right')}
            aria-label="Scroll events right"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
