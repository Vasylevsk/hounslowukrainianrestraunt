import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { SubHeading } from '../../components';
import {
  HOME_HERO_INTERVAL_MS,
  HOME_HERO_MOBILE_MAX_WIDTH,
  HOME_HERO_SLIDES,
  preloadHeroSlides,
} from '../../constants/homeHero';
import './Header.css';

const SLIDE_COUNT = HOME_HERO_SLIDES.length;
const FADE_MS = 1400;

const Header = () => {
  const heroRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${HOME_HERO_MOBILE_MAX_WIDTH}px)`);
    const load = () => preloadHeroSlides(mq.matches);
    load();
    mq.addEventListener('change', load);
    return () => mq.removeEventListener('change', load);
  }, []);

  useEffect(() => {
    const navbar = document.querySelector('.app__navbar');
    if (!navbar) return undefined;

    const sync = () => {
      document.documentElement.style.setProperty('--site-header-height', `${navbar.offsetHeight}px`);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(navbar);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || SLIDE_COUNT < 2) return undefined;
    const timer = window.setInterval(goNext, HOME_HERO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [goNext, paused, reduceMotion]);

  useEffect(() => {
    if (!heroRef.current) return;
    heroRef.current.style.setProperty('--hero-slide-ms', `${HOME_HERO_INTERVAL_MS}ms`);
    heroRef.current.style.setProperty('--hero-fade-ms', `${FADE_MS}ms`);
  }, []);

  return (
    <section
      ref={heroRef}
      className={`app__hero${paused ? ' app__hero--paused' : ''}`}
      id="home"
      aria-label="Prosperity Ukrainian Restaurant"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="app__hero-slides" aria-hidden="true">
        {HOME_HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.alt}
            className={`app__hero-slide${index === activeIndex ? ' app__hero-slide--active' : ''}`}
            style={{ '--hero-ken-delay': `${index * (HOME_HERO_INTERVAL_MS / 1000)}s` }}
          >
            <div className="app__hero-slide-media">
              <picture>
                <source
                  media={`(max-width: ${HOME_HERO_MOBILE_MAX_WIDTH}px)`}
                  srcSet={slide.mobile}
                />
                <img
                  src={slide.desktop}
                  alt=""
                  className="app__hero-slide-img"
                  loading="eager"
                  decoding="async"
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  draggable={false}
                />
              </picture>
            </div>
          </div>
        ))}
      </div>

      <div className="app__hero-overlay" aria-hidden="true" />

      <div className="app__hero-content">
        <SubHeading title="Warmth. Taste. Tradition." />
        <h1 className="app__hero-title">Prosperity Ukrainian Restaurant</h1>
        <p className="app__hero-tagline p__opensans">where every dish has a soul</p>
        <div className="app__hero-actions">
          <Link to="/menu" className="custom__button app__hero-cta">
            Explore Menu
          </Link>
          <Link to="/booking" className="custom__button app__hero-cta app__hero-cta--secondary">
            Book a Table
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
