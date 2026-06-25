import React from 'react';
import { Link } from 'react-router-dom';

import { images } from '../../constants';
import './BanquetTeaser.css';

const BanquetTeaser = () => (
  <section
    className="app__banquet-teaser app__bg app__wrapper section__padding"
    id="banquet"
    aria-labelledby="banquet-teaser-heading"
  >
    <div className="app__wrapper_info app__banquet-teaser_copy">
      <h2 id="banquet-teaser-heading" className="headtext__cormorant">
        Banquets
      </h2>
      <img src={images.spoon} alt="" className="spoon__img" aria-hidden />
      <p className="p__opensans app__banquet-teaser_text">
        Celebrate weddings, birthdays and family gatherings in an elegant setting inspired by Ukrainian traditions.
        Thoughtfully prepared cuisine, warm hospitality and a welcoming atmosphere make every occasion truly memorable.
      </p>
      <Link to="/banquet" className="custom__button app__banquet-teaser_btn">
        Discover More
      </Link>
    </div>

    <div className="app__wrapper_img app__banquet-teaser_media">
      <img src={images.banquet} alt="Banquet hall at Prosperity Ukrainian Restaurant" loading="lazy" decoding="async" />
    </div>
  </section>
);

export default BanquetTeaser;
