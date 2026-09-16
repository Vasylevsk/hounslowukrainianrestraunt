import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPhone } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

import { images } from '../../constants';
import { SET_LUNCH_POPUP_ENABLED } from '../../constants/features';
import menuDishImages from '../../constants/menuImages';
import { SET_LUNCH, SET_LUNCH_STORAGE_KEY } from '../../constants/setLunch';
import { COOKIE_CONSENT, getCookieConsent } from '../../utils/analytics';
import './SetLunchPopup.css';

const HIDDEN_PATHS = new Set(['/admin']);

function wasDismissed() {
  try {
    return localStorage.getItem(SET_LUNCH_STORAGE_KEY) === 'dismissed';
  } catch {
    return false;
  }
}

function persistDismissed() {
  try {
    localStorage.setItem(SET_LUNCH_STORAGE_KEY, 'dismissed');
  } catch {
    /* ignore */
  }
}

function cookieDecided() {
  const value = getCookieConsent();
  return value === COOKIE_CONSENT.accepted || value === COOKIE_CONSENT.rejected;
}

function forcePreview() {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('lunch') === '1';
}

const SetLunchPopup = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeBtnRef = useRef(null);
  const isHidden = HIDDEN_PATHS.has(pathname) || !SET_LUNCH_POPUP_ENABLED;

  const close = useCallback(() => {
    if (!forcePreview()) persistDismissed();
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 280);
  }, []);

  useEffect(() => {
    if (isHidden) return undefined;
    if (forcePreview()) {
      setOpen(true);
      return undefined;
    }
    if (wasDismissed()) return undefined;

    let shown = false;
    let delayId;
    const reveal = () => {
      if (shown) return;
      shown = true;
      delayId = window.setTimeout(() => setOpen(true), 700);
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
    const prev = document.body.style.overflow;
    document.body.classList.add('set-lunch-open');
    const id = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('set-lunch-open');
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  if (isHidden || !open) return null;

  const borscht = menuDishImages['Borscht with Salo & Sour Cream'];
  const chicken = menuDishImages['Caramelised Chicken Steak'];

  return (
    <div
      className={`set-lunch${closing ? ' set-lunch--closing' : ''}`}
      role="presentation"
      onClick={close}
    >
      <div
        className="set-lunch__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="set-lunch-title"
        aria-describedby="set-lunch-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="set-lunch__close"
          onClick={close}
          aria-label="Close set lunch offer"
        >
          <MdClose size={22} />
        </button>

        <div className="set-lunch__media" aria-hidden="true">
          <img className="set-lunch__photo set-lunch__photo--main" src={borscht} alt="" />
          <img className="set-lunch__photo set-lunch__photo--side" src={chicken} alt="" />
          <p className="set-lunch__badge">{SET_LUNCH.limit}</p>
        </div>

        <div className="set-lunch__copy">
          <p className="set-lunch__eyebrow">{SET_LUNCH.eyebrow}</p>
          <h2 id="set-lunch-title" className="set-lunch__title">
            {SET_LUNCH.title}
          </h2>
          <img src={images.spoon} alt="" className="spoon__img set-lunch__spoon" />
          <p className="set-lunch__days">{SET_LUNCH.days}</p>
          <p id="set-lunch-desc" className="set-lunch__tagline">
            {SET_LUNCH.tagline}
          </p>

          <div className="set-lunch__prices">
            {SET_LUNCH.prices.map((price) => (
              <div
                key={price.label}
                className={`set-lunch__price${price.featured ? ' set-lunch__price--featured' : ''}`}
              >
                <p className="set-lunch__amount">{price.amount}</p>
                <p className="set-lunch__label">{price.label}</p>
                <p className="set-lunch__note">{price.note}</p>
              </div>
            ))}
          </div>

          <p className="set-lunch__detail">{SET_LUNCH.walkIn}</p>
          <p className="set-lunch__detail">{SET_LUNCH.prepay}</p>

          <div className="set-lunch__actions">
            <a className="custom__button set-lunch__call" href={SET_LUNCH.phoneHref}>
              <FiPhone aria-hidden />
              {SET_LUNCH.phoneLabel}
            </a>
            <Link to="/menu" className="set-lunch__menu" onClick={close}>
              View menu
            </Link>
          </div>

          <a className="set-lunch__place" href={SET_LUNCH.mapsHref} target="_blank" rel="noopener noreferrer">
            {SET_LUNCH.place}
          </a>
          <p className="set-lunch__closing">{SET_LUNCH.closing}</p>
        </div>
      </div>
    </div>
  );
};

export default SetLunchPopup;
