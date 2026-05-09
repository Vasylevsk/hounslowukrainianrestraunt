import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scroll to top on route change; if URL has #hash, scroll to that section (navbar offset). */
const NAV_OFFSET = 80;

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }
      }, 0);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
