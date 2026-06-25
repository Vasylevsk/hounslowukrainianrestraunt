export const GA_MEASUREMENT_ID = 'G-RB1B5L5NKG';
export const COOKIE_CONSENT_KEY = 'prosperity_cookie_consent';

export const COOKIE_CONSENT = {
  accepted: 'accepted',
  rejected: 'rejected',
};

export function getCookieConsent() {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setCookieConsent(value) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    // storage unavailable
  }
}

let gaLoadPromise = null;

export function loadGoogleAnalytics() {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (typeof window.gtag === 'function') return Promise.resolve(true);
  if (gaLoadPromise) return gaLoadPromise;

  gaLoadPromise = new Promise((resolve) => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onload = () => {
      window.dispatchEvent(new CustomEvent('prosperity:analytics-ready'));
      resolve(true);
    };
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });

  return gaLoadPromise;
}

export function trackPageView(pagePath) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function hasAnalyticsConsent() {
  return getCookieConsent() === COOKIE_CONSENT.accepted;
}
