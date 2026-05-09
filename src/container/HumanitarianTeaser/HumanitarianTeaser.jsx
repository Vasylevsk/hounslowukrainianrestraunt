import React from 'react';
import { Link } from 'react-router-dom';

import { SubHeading } from '../../components';
import { DONATION_IMAGES } from '../../constants/donationImages';
import { PRESS_BY_ID } from '../../constants/pressCoverage';
import './HumanitarianTeaser.css';

const HumanitarianTeaser = () => (
  <section className="app__humanitarian-teaser app__bg section__padding" id="prosperity-impact" aria-labelledby="humanitarian-teaser-heading">
    <div className="app__humanitarian-teaser_row">
      <div className="app__humanitarian-teaser_media">
        <div className="app__humanitarian-teaser_visual">
          <div className="app__humanitarian-teaser_visualCrop">
            <img
              src={DONATION_IMAGES.team}
              alt="Volunteers sorting and packing donations at Prosperity, Twickenham"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="app__humanitarian-teaser_visualCaption">Team photo - volunteers packing aid at Prosperity</p>
        </div>
      </div>

      <div className="app__humanitarian-teaser_copy">
        <SubHeading title="Beyond the table" />
        <p className="app__humanitarian-teaser_eyebrow">Prosperity for Ukraine</p>
        <h2 id="humanitarian-teaser-heading" className="app__humanitarian-teaser_title">
          From our kitchen to those who need it most
        </h2>
        <p className="app__humanitarian-teaser_tagline">
          Prosperity: from a small cafe to London&apos;s key humanitarian aid hub.
        </p>
        <p className="app__humanitarian-teaser_lead">
          What began as home-style Ukrainian cooking in Twickenham grew into a lifeline: today Prosperity is one of the South-East&apos;s central
          donation hubs for aid to Ukraine, run by volunteers who pack and ship tonnes of help straight to where it is needed.
        </p>
        <p className="app__humanitarian-teaser_press">
          Featured by the{' '}
          <a href={PRESS_BY_ID.bbc.href} target="_blank" rel="noopener noreferrer">
            BBC
          </a>
          ,{' '}
          <a href={PRESS_BY_ID['new-arab'].href} target="_blank" rel="noopener noreferrer">
            The New Arab
          </a>
          , and more -{' '}
          <Link to="/humanitarian-aid#press">press, video &amp; photos</Link>.
        </p>
        <div className="app__humanitarian-teaser_frame">
          <div className="app__humanitarian-teaser_actions">
            <Link to="/humanitarian-aid" className="custom__button" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Read the full story
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HumanitarianTeaser;
