import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { hasAnalyticsConsent, trackPageView } from '../../utils/analytics';

/** Zone tab hashes handled inside MenuCatalogView — not page scroll targets. */
const MENU_ZONE_HASHES = new Set(['breakfast', 'food']);

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const pagePath = pathname + hash;

  useEffect(() => {
    if (!hasAnalyticsConsent()) return undefined;

    trackPageView(pagePath);

    const onReady = () => trackPageView(pagePath);
    window.addEventListener('prosperity:analytics-ready', onReady);
    return () => window.removeEventListener('prosperity:analytics-ready', onReady);
  }, [pagePath]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  useEffect(() => {
    if (!hash) return undefined;

    const id = hash.replace('#', '');
    if (MENU_ZONE_HASHES.has(id)) return undefined;

    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);

    return () => window.clearTimeout(t);
  }, [hash, pathname]);

  return null;
};

export default ScrollToTop;
