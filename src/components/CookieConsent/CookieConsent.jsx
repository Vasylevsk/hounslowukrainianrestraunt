import React, { useCallback, useEffect, useState } from 'react';

import {
  COOKIE_CONSENT,
  getCookieConsent,
  loadGoogleAnalytics,
  setCookieConsent,
  trackPageView,
} from '../../utils/analytics';
import './CookieConsent.css';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const dismiss = useCallback((choice) => {
    setCookieConsent(choice);
    setClosing(true);
    window.setTimeout(() => setVisible(false), 320);
  }, []);

  const handleAccept = useCallback(async () => {
    dismiss(COOKIE_CONSENT.accepted);
    await loadGoogleAnalytics();
    trackPageView(window.location.pathname + window.location.hash);
  }, [dismiss]);

  const handleReject = useCallback(() => {
    dismiss(COOKIE_CONSENT.rejected);
  }, [dismiss]);

  useEffect(() => {
    const stored = getCookieConsent();

    if (stored === COOKIE_CONSENT.accepted) {
      loadGoogleAnalytics().then(() => {
        trackPageView(window.location.pathname + window.location.hash);
      });
      return;
    }

    if (stored === COOKIE_CONSENT.rejected) return;

    const timer = window.setTimeout(() => setVisible(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`cookie-consent${closing ? ' cookie-consent--closing' : ''}`}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      aria-live="polite"
    >
      <div className="cookie-consent__panel">
        <div className="cookie-consent__accent" aria-hidden />

        <div className="cookie-consent__icon" aria-hidden>
          <svg viewBox="0 0 24 24" width="28" height="28" focusable="false">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 4.07c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2.5 11.43c-.83 0-1.5-.67-1.5-1.5 0-.28.22-.5.5-.5s.5.22.5.5c0 .28.22.5.5.5s.5-.22.5-.5-.22-.5-.5-.5c-.83 0-1.5-.67-1.5-1.5 0-.65.42-1.21 1.02-1.41C13.16 13.2 13 12.62 13 12c0-1.66 1.34-3 3-3 .55 0 1 .45 1 1s-.45 1-1 1c-.55 0-1 .45-1 1 0 .55.45 1 1 1 .83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
            />
          </svg>
        </div>

        <div className="cookie-consent__body">
          <p className="cookie-consent__eyebrow">Your privacy</p>
          <h2 id="cookie-consent-title" className="cookie-consent__title">
            We value your visit
          </h2>
          <p id="cookie-consent-desc" className="cookie-consent__text">
            We use essential cookies so the site works. With your permission, we also use analytics
            cookies to understand how guests explore our menu and pages — helping us improve
            Prosperity online.
          </p>
        </div>

        <div className="cookie-consent__actions">
          <button type="button" className="cookie-consent__btn cookie-consent__btn--primary" onClick={handleAccept}>
            Accept all
          </button>
          <button type="button" className="cookie-consent__btn cookie-consent__btn--ghost" onClick={handleReject}>
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
