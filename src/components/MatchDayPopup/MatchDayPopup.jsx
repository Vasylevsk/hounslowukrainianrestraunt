import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

import {
  MATCH_DAY,
  MATCH_DAY_POPUP_ENABLED,
  matchDayCampaignLive,
  matchPopupDismissed,
  matchPopupForced,
  persistMatchPopupDismissed,
} from '../../constants/matchDay';
import { COOKIE_CONSENT, getCookieConsent } from '../../utils/analytics';
import './MatchDayPopup.css';

const HIDDEN_PATHS = new Set(['/admin']);

function cookieDecided() {
  const value = getCookieConsent();
  return value === COOKIE_CONSENT.accepted || value === COOKIE_CONSENT.rejected;
}

const MatchDayPopup = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeBtnRef = useRef(null);
  const campaignOff = !MATCH_DAY_POPUP_ENABLED || (!matchPopupForced() && !matchDayCampaignLive());
  const isHidden = HIDDEN_PATHS.has(pathname) || campaignOff;

  const close = useCallback(() => {
    if (!matchPopupForced()) persistMatchPopupDismissed();
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 260);
  }, []);

  useEffect(() => {
    if (isHidden) return undefined;
    if (matchPopupForced()) {
      setOpen(true);
      return undefined;
    }
    if (matchPopupDismissed()) return undefined;

    let shown = false;
    let delayId;
    const reveal = () => {
      if (shown) return;
      shown = true;
      delayId = window.setTimeout(() => setOpen(true), 600);
    };

    const tick = () => {
      if (!cookieDecided()) return false;
      reveal();
      return true;
    };

    if (tick()) {
      return () => window.clearTimeout(delayId);
    }

    const intervalId = window.setInterval(() => {
      if (tick()) window.clearInterval(intervalId);
    }, 250);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(delayId);
    };
  }, [isHidden]);

  useEffect(() => {
    if (isHidden) setOpen(false);
  }, [isHidden]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add('match-day-open');
    const id = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('match-day-open');
    };
  }, [open, close]);

  if (isHidden || !open) return null;

  return (
    <div className={`match-day${closing ? ' match-day--closing' : ''}`} role="presentation" onClick={close}>
      <article
        className="match-day__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="match-day-title"
        aria-describedby="match-day-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="match-day__close"
          onClick={close}
          aria-label="Close match day offer"
        >
          <MdClose size={20} />
        </button>

        <h2 id="match-day-title" className="match-day__sr">
          {MATCH_DAY.title}
        </h2>
        <p id="match-day-desc" className="match-day__sr">
          {MATCH_DAY.summary}
        </p>

        <img className="match-day__poster" src={MATCH_DAY.poster} alt="" />

        <div className="match-day__actions">
          <Link className="custom__button match-day__book" to="/booking" onClick={close}>
            Book a table
          </Link>
          <a className="match-day__call" href={MATCH_DAY.phoneHref}>
            {MATCH_DAY.phoneLabel}
          </a>
          <a className="match-day__place" href={MATCH_DAY.mapsHref} target="_blank" rel="noopener noreferrer">
            {MATCH_DAY.place}
          </a>
        </div>
      </article>
    </div>
  );
};

export default MatchDayPopup;
