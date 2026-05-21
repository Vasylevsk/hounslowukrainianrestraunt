import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

import { SubHeading } from '../components';
import { images } from '../constants';
import { DONATION_IMAGES } from '../constants/donationImages';
import {
  HUMANITARIAN_FEATURED_VIDEO_EMBED,
  HUMANITARIAN_FEATURED_VIDEO_URL,
  HUMANITARIAN_VIDEO_EMBED,
  HUMANITARIAN_VIDEO_URL,
  PRESS_BY_ID,
  PRESS_COVERAGE,
} from '../constants/pressCoverage';
import { SOCIAL_LINKS } from '../constants/social';
import './HumanitarianPage.css';

/** One use per photo; captions follow the filenames you chose. Crop keeps mixed image sizes visually even. */
const HumFigure = ({ src, alt, caption, variant = 'tile' }) => (
  <figure className={`app__hum-figure app__hum-figure--${variant}`}>
    <div className="app__hum-figure_crop">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
    {caption ? <figcaption>{caption}</figcaption> : null}
  </figure>
);

const HumVideo = ({ embed, url, label, caption, featured = false }) => (
  <div className={`app__hum-video${featured ? ' app__hum-video--featured' : ''}`}>
    <p className="app__hum-video_label p__opensans">{label}</p>
    {caption ? <p className="app__hum-video_caption p__opensans">{caption}</p> : null}
    <div className="app__hum-video_frame">
      <iframe
        title={label}
        src={`${embed}?rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
    <p className="app__hum-video_footer">
      <a href={url} target="_blank" rel="noopener noreferrer">
        Open on YouTube
      </a>
    </p>
  </div>
);

const HumanitarianPage = () => (
  <article className="app__hum-page">
    <div className="app__hum-page_wrap app__bg">
      <header className="app__hum-hero">
        <SubHeading title="Prosperity for Ukraine" />
        <h1 className="headtext__cormorant">Humanitarian aid for Ukraine</h1>
        <img src={images.spoon} alt="" className="spoon__img" style={{ marginTop: '1rem' }} />
        <p className="p__opensans app__hum-hero_lead">
          Prosperity Restaurant in Twickenham began as a place for Ukrainian home cooking. During the first years of the full-scale war it also became
          a humanitarian aid hub for Ukraine — a chapter we now look back on with gratitude to the community.
        </p>
        <HumFigure
          variant="hero"
          src={DONATION_IMAGES.owners}
          alt="Owners outside café - Prosperity, Twickenham"
          caption="Owners outside the café - Halyna Kosynska and Oleksandr (Alex) Yarema at Prosperity, York Street."
        />
      </header>

      <section className="app__hum-section" id="press">
        <h2>Press &amp; partners</h2>
        <p className="app__hum-section_intro">
          From the first days of the full-scale invasion, journalists and partners documented how Twickenham rallied around Prosperity. These
          articles and the films below tell that story.
        </p>
        <ul className="app__hum-press-list">
          {PRESS_COVERAGE.map((item) => (
            <li key={item.id}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="app__hum-press-card">
                <span className="app__hum-press-card_meta">
                  <span className="app__hum-press-card_label">{item.label}</span>
                  <span className="app__hum-press-card_date">{item.date}</span>
                </span>
                <span className="app__hum-press-card_title">{item.title}</span>
                <span className="app__hum-press-card_hint">Read article</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="app__hum-videos" id="video">
          <HumVideo
            featured
            embed={HUMANITARIAN_FEATURED_VIDEO_EMBED}
            url={HUMANITARIAN_FEATURED_VIDEO_URL}
            label="Film"
            caption="Twickenham community volunteers, collections at Prosperity, and lorries of aid sent to Ukraine."
          />
          <HumVideo
            embed={HUMANITARIAN_VIDEO_EMBED}
            url={HUMANITARIAN_VIDEO_URL}
            label="Earlier coverage"
            caption="Additional footage from the early months of the aid hub."
          />
        </div>
      </section>

      <section className="app__hum-section" id="story">
        <h2>Our story</h2>
        <p>
          When the full-scale war broke out in Ukraine on 24 February 2022, Halyna Kosynska and Oleksandr (Alex) Yarema, who run Prosperity
          Restaurant (see photos in the site footer), took the decision to close Prosperity&apos;s doors as a restaurant and instead put the space
          to use helping those in need - as featured by the{' '}
          <a href={PRESS_BY_ID.bbc.href} target="_blank" rel="noopener noreferrer" className="app__hum-inline-link">
            BBC on 9 March 2022
          </a>
          ,{' '}
          <a href={PRESS_BY_ID['sw-londoner'].href} target="_blank" rel="noopener noreferrer" className="app__hum-inline-link">
            South West Londoner
          </a>
          ,{' '}
          <a href={PRESS_BY_ID['new-arab'].href} target="_blank" rel="noopener noreferrer" className="app__hum-inline-link">
            The New Arab
          </a>
          , and other outlets.
        </p>
        <HumFigure
          src={DONATION_IMAGES.team}
          alt="Team photo - volunteers at Prosperity"
          caption="Team photo - volunteers and regular helpers at the donation hub."
        />
        <p>
          Prosperity became one of the central donation hubs for humanitarian aid for Ukraine in the South-East of England. Run solely by a dedicated
          team of Twickenham community volunteers, aid was delivered directly into Ukraine, to the cities and towns where it was needed most.
        </p>
        <p>
          The collection lists were based on demand from partner warehouses in Ukraine. With the support of donations and sponsors, volunteers across
          Richmond and Twickenham collected, packaged, and transported tonnes of humanitarian aid to Ukrainian cities most in need of help.
        </p>
        <p>
          As shelling damaged Ukrainian infrastructure and power stations, many cities were left without electricity, water, and heating. Donations
          brought power banks, blankets, heaters, and generators, helping families through the colder months.
        </p>
        <HumFigure
          src={DONATION_IMAGES.generators}
          alt="Generators collected for Ukraine"
          caption="Generators - part of the power and warmth kit sent when the grid was under stress."
        />
        <p>
          Munira Wilson, MP for Twickenham, expressed support for the humanitarian work undertaken at Prosperity Restaurant.
        </p>
        <HumFigure
          src={DONATION_IMAGES.mpMunira}
          alt="Twickenham MP Munira Wilson (left) at Prosperity"
          caption="Twickenham MP Munira Wilson (left) with the Prosperity team during a visit."
        />
        <p className="app__hum-note" style={{ marginTop: '1rem' }}>
          As <strong>Prosperity for Ukraine</strong>, we operate as a Ltd company registered in England and Wales no. <strong>14278450</strong>.
        </p>
      </section>

      <section className="app__hum-section" id="facts">
        <h2>Facts</h2>
        <div className="app__hum-facts">
          <div className="app__hum-fact">
            <strong>Central hub</strong>
            <span>The Twickenham restaurant was the central point for all incoming donations.</span>
          </div>
          <div className="app__hum-fact">
            <strong>Off-site partners</strong>
            <span>Two local organisations kindly provided space off site to sort and pack donations.</span>
          </div>
          <div className="app__hum-fact">
            <strong>Volunteers every day</strong>
            <span>A dedicated Twickenham community team worked daily to ensure donations reached Ukraine.</span>
          </div>
          <div className="app__hum-fact">
            <strong>Direct delivery</strong>
            <span>We worked with partners and delivered aid to Kyiv, Ternopil, Lviv, Stryi, Ivano-Frankivsk, and Berezhany.</span>
          </div>
          <div className="app__hum-fact" style={{ gridColumn: '1 / -1' }}>
            <strong>Scale of help</strong>
            <span>
              Over the course of the campaign we sent <strong>150 twenty-tonne lorries</strong> packed with donations direct to Ukraine, organised
              with Twickenham community volunteers.
            </span>
          </div>
        </div>
        <div className="app__hum-mosaic">
          <HumFigure
            src={DONATION_IMAGES.football}
            alt="Football club donations"
            caption="Football club donations - a local club sending kit and goods for the convoys."
          />
          <HumFigure
            src={DONATION_IMAGES.cake}
            alt="Cake donations"
            caption="Cake donations - home baking dropped off for volunteers and supporters."
          />
        </div>
        <HumFigure
          src={DONATION_IMAGES.leaderMaria}
          alt="Leader - Maria"
          caption="Leader - Maria, on site helping steer collections and sorting."
        />
        <p className="app__hum-closed-note">
          The Prosperity Centre for Humanitarian Aid for Ukraine has now closed. Prosperity operates again as a restaurant; we are no longer
          collecting donations. The sections below describe how the community helped during the campaign.
        </p>
      </section>

      <section className="app__hum-section" id="donate">
        <h2>How the community helped</h2>
        <p>
          At the <strong>Prosperity Centre for Humanitarian Aid for Ukraine</strong> we welcomed three types of support: humanitarian goods (which we
          transported to Ukraine), monetary donations towards transport costs, and community fundraising including a JustGiving for Prosperity
          Caf&eacute; and Restaurant set up by a local resident to help cover running costs while the venue operated as an aid centre.
        </p>
        <p>
          Physical donations were brought to <strong>Prosperity Caf&eacute; and Restaurant, 59 York Street, Twickenham, London, TW1 3LP</strong>.
        </p>
        <div className="app__hum-mosaic">
          <HumFigure
            src={DONATION_IMAGES.amazon1}
            alt="Amazon delivery"
            caption="Amazon delivery - wish-list parcels arriving at Prosperity."
          />
          <HumFigure
            src={DONATION_IMAGES.amazon2}
            alt="Amazon delivery 2"
            caption="Amazon delivery (second batch) - more line items from the list, ready to open and sort."
          />
        </div>
        <p>
          Our humanitarian request list was updated when our counterparts in Ukraine told us what was needed. Local collections and bulk donations were
          coordinated by phone.
        </p>
        <div className="app__hum-highlight">
          Amazon: supporters donated essential items via our Amazon wish list, using our York Street address at checkout so parcels arrived straight at
          Prosperity to be packed for lorries. The list reflected priority goods from our contacts in Ukraine.
        </div>
        <HumFigure
          src={DONATION_IMAGES.itemsForSale}
          alt="Items for sale"
          caption="Items for sale - fundraising goods on the stall to help cover running costs."
        />
      </section>

      <section className="app__hum-section" id="items">
        <h2>What we collected</h2>

        <div className="app__hum-mosaic">
          <HumFigure
            src={DONATION_IMAGES.ambulances}
            alt="Donated ambulances"
            caption="Donated ambulances - medical transport and major gifts leaving via our logistics partners."
          />
          <HumFigure
            src={DONATION_IMAGES.leaderMaya}
            alt="Leader - Maya"
            caption="Leader - Maya, helping run shifts and keep the floor moving when volumes spike."
          />
        </div>
        <p className="app__hum-partner-note">
          Ukrainian institutions received shipments coordinated from London — for example,{' '}
          <a href={PRESS_BY_ID.tdmu.href} target="_blank" rel="noopener noreferrer" className="app__hum-inline-link">
            Ternopil National Medical University reported receiving 22 tonnes of humanitarian cargo from Prosperity and partners in March 2022
          </a>
          .
        </p>

        <div className="app__hum-list-block">
          <h4>Food</h4>
          <p>
            <strong>Tinned / tetra pack:</strong> vegetables, soups, meat, fish, sauces, fruit, milks.
          </p>
          <p>
            <strong>Dried:</strong> pasta, rice, grain, flour; baby and infant food, formula milk, pouches, ready-to-eat meals.
          </p>
        </div>

        <div className="app__hum-list-block">
          <h4>Medicine</h4>
          <HumFigure
            src={DONATION_IMAGES.medical}
            alt="Medical supplies"
            caption="Medical supplies - OTC medicines, dressings, and clinical essentials packed for Ukraine."
          />
          <p>
            Over-the-counter pain relief, antihistamine, cold remedies, sleep aids, children&apos;s medication. Prescription items (everything is
            checked). Dressings, bandages, first aid kits, antibacterial wipes.
          </p>
        </div>

        <div className="app__hum-list-block">
          <h4>Personal hygiene (adult and children)</h4>
          <p>
            Baby nappies and wipes, adult incontinence pads, period products, toothpaste, toothbrushes, soap, shampoo, moisturisers, deodorant.
          </p>
        </div>

        <div className="app__hum-list-block">
          <h4>Other</h4>
          <p>Sleeping bags, camping mats.</p>
        </div>
      </section>

      <section className="app__hum-section" id="social">
        <h2>Follow our work</h2>
        <p style={{ textAlign: 'center', marginBottom: 0 }}>
          During the campaign we shared updates, collections, and community news on Facebook, Instagram, and YouTube — and the press links above for
          longer reads.
        </p>
        <div className="app__hum-social">
          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebookF aria-hidden />
            Facebook
          </a>
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram aria-hidden />
            Instagram
          </a>
          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">
            <FaYoutube aria-hidden />
            YouTube
          </a>
        </div>
      </section>

      <div className="app__hum-actions">
        <Link to="/" className="p__opensans" style={{ color: 'var(--color-golden)', alignSelf: 'center' }}>
          Back to home
        </Link>
      </div>

      <p className="app__hum-note">
        To book a table or ask about the restaurant, call <a href="tel:+442045680606">020 4568 0606</a> or{' '}
        <a href="tel:+447853514567">07853 514567</a>.
      </p>
    </div>
  </article>
);

export default HumanitarianPage;
