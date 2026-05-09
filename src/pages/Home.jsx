import React, { useEffect } from 'react';

import { AboutUs, Chef, FindUs, Gallery, Header, HumanitarianTeaser, SpecialMenu } from '../container';

const Home = () => {
  useEffect(() => {
    // Handle anchor links on page load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const offsetTop = element.offsetTop - 80; // Account for navbar height
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <Header />
      <AboutUs />
      <SpecialMenu />
      <Chef />
      <Gallery />
      <FindUs />
      <HumanitarianTeaser />
    </>
  );
};

export default Home;
