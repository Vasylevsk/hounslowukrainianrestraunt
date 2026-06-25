import desktop1 from '../assets/home/desctop1.jpg';
import desktop2 from '../assets/home/desctop2.jpg';
import desktop3 from '../assets/home/desctop3.jpg';
import desktop4 from '../assets/home/desctop4.jpg';
import mobile1 from '../assets/home/mobile1.jpg';
import mobile2 from '../assets/home/mobile2.jpg';
import mobile3 from '../assets/home/mobile3.jpg';
import mobile4 from '../assets/home/mobile4.jpg';

/** Viewport width (px) below which hero uses mobile image set. */
export const HOME_HERO_MOBILE_MAX_WIDTH = 768;

/** Homepage hero slideshow — paired desktop / mobile crops per slide. */
export const HOME_HERO_SLIDES = [
  {
    desktop: desktop1,
    mobile: mobile1,
    alt: 'Guests dining at Prosperity Ukrainian Restaurant, Twickenham',
  },
  {
    desktop: desktop2,
    mobile: mobile2,
    alt: 'Ukrainian dishes and warm atmosphere at Prosperity',
  },
  {
    desktop: desktop3,
    mobile: mobile3,
    alt: 'Evening at Prosperity Ukrainian Restaurant, London',
  },
  {
    desktop: desktop4,
    mobile: mobile4,
    alt: 'Prosperity restaurant interior and hospitality',
  },
];

export const HOME_HERO_INTERVAL_MS = 4500;

export function getHeroSlideSrc(slide, isMobile) {
  return isMobile ? slide.mobile : slide.desktop;
}

export function preloadHeroSlides(isMobile) {
  HOME_HERO_SLIDES.forEach((slide) => {
    const primary = new Image();
    primary.src = getHeroSlideSrc(slide, isMobile);

    const secondary = new Image();
    secondary.src = getHeroSlideSrc(slide, !isMobile);
  });
}
