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
              alt="Volunteers who sorted and packed donations at Prosperity, Twickenham"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="app__humanitarian-teaser_visualCaption">Team photo - Twickenham community volunteers packing aid at Prosperity</p>
        </div>
      </div>

      <div className="app__humanitarian-teaser_body">
        <div className="app__humanitarian-teaser_copy">
          <SubHeading title="Beyond the table" />
          <p className="app__humanitarian-teaser_eyebrow">Prosperity for Ukraine</p>
          <h2 id="humanitarian-teaser-heading" className="app__humanitarian-teaser_title">
            From our kitchen to those who need it most
          </h2>
          <p className="app__humanitarian-teaser_tagline">
            Prosperity: from a small cafe to one of London&apos;s key humanitarian aid hubs.
          </p>
          <p className="app__humanitarian-teaser_lead">
            What began as home-style Ukrainian cooking in Twickenham grew into a lifeline. For two years Prosperity was one of the South-East&apos;s
            central donation hubs for aid to Ukraine, run by Twickenham community volunteers who packed and shipped tonnes of help to where it was
            needed most.
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
        </div>

        <div className="app__humanitarian-teaser_actions">
          <Link to="/humanitarian-aid" className="custom__button app__humanitarian-teaser_btn">
            Read the full story
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HumanitarianTeaser;
