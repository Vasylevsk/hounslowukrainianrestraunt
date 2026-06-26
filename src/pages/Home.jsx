import React, { useEffect } from 'react';

import { LOUNGE_SHISHA_ENABLED } from '../constants/features';
import { LoungePromo } from '../components';
import { AboutUs, BanquetTeaser, Chef, FindUs, Gallery, Header, HumanitarianTeaser, SpecialMenu } from '../container';

const Home = () => {
  useEffect(() => {
    // Handle anchor links on page load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <Header />
      <SpecialMenu />
      <AboutUs />
      <BanquetTeaser />
      {LOUNGE_SHISHA_ENABLED ? <LoungePromo /> : null}
      <Chef />
      <Gallery />
      <HumanitarianTeaser />
      <FindUs />
    </>
  );
};

export default Home;
