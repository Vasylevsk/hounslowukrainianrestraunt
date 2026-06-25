import React from 'react';

import { images } from '../../constants';
import './Chef.css';

const Chef = () => (
  <div className="app__chef app__bg app__wrapper section__padding">
    <div className="app__wrapper_img app__wrapper_img-reverse app__chef_media">
      <img src={images.chef} alt="Galina, chef and founder at Prosperity Ukrainian Restaurant" loading="lazy" decoding="async" />
    </div>

    <div className="app__wrapper_info app__chef_copy">
      <h1 className="headtext__cormorant">What we believe in</h1>
      <img src={images.spoon} alt="" className="spoon__img" aria-hidden />

      <div className="app__chef-content">
        <div className="app__chef-content_quote">
          <img src={images.quote} alt="" aria-hidden />
          <p className="p__opensans">
            For over 20 years, I have been serving Ukrainians and not only in London. I know what delicious Ukrainian
            cuisine is, authentic taste, warm atmosphere and perfect presentation.
          </p>
        </div>
        <p className="p__opensans app__chef-content_text">
          We honor the traditions of Ukrainian cuisine, bringing authentic flavors and time-honored recipes to your
          table. Every meal is prepared with passion, using the finest ingredients and traditional cooking methods
          passed down through generations.
        </p>
      </div>

      <div className="app__chef-sign">
        <p>Galina</p>
        <p className="p__opensans">Chef &amp; Founder</p>
      </div>
    </div>
  </div>
);

export default Chef;
