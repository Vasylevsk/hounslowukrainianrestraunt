import React, { useEffect } from 'react';

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
      <LoungePromo />
      <Chef />
      <Gallery />
      <HumanitarianTeaser />
      <FindUs />
    </>
  );
};

export default Home;
