import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function readScrollOffsetPx() {
  const styles = getComputedStyle(document.documentElement);
  const header = parseFloat(styles.getPropertyValue('--site-header-height')) || 72;
  const menuNav = parseFloat(styles.getPropertyValue('--menu-nav-height')) || 0;
  return header + menuNav + 8;
}

const GA_MEASUREMENT_ID = 'G-RB1B5L5NKG';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname + hash,
      });
    }
  }, [pathname, hash]);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - readScrollOffsetPx();
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }
      }, 80);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
