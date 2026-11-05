/** England v Australia match-day offer, Sunday 8 November 2026. */

export const MATCH_DAY_POPUP_ENABLED = true;

export const MATCH_DAY_STORAGE_KEY = 'prosperity_match_popup_eng_aus_2026';

/**
 * Popup stays up through Sunday service.
 * The UK is on GMT that week, so midnight Monday is 00:00 UTC.
 */
export const MATCH_DAY_ENDS_AT = Date.parse('2026-11-09T00:00:00Z');

export const MATCH_DAY = {
  title: 'England v Australia',
  summary:
    'Sunday 8 November. A glass of Bosca sparkling wine on the house with every main course. Prosperity, 59 York Street, Twickenham. Open 12:00 to 22:00.',
  phoneLabel: '020 4568 0606',
  phoneHref: 'tel:+442045680606',
  place: '59 York Street, Twickenham',
  mapsHref: 'https://maps.app.goo.gl/6cZKRmVvRjkUgx5v7',
  poster: '/downloads/Prosperity-England-Australia.jpg',
};

export function matchDayCampaignLive(now = Date.now()) {
  return MATCH_DAY_POPUP_ENABLED && now < MATCH_DAY_ENDS_AT;
}

export function matchPopupDismissed() {
  try {
    return localStorage.getItem(MATCH_DAY_STORAGE_KEY) === 'dismissed';
  } catch {
    return false;
  }
}

export function persistMatchPopupDismissed() {
  try {
    localStorage.setItem(MATCH_DAY_STORAGE_KEY, 'dismissed');
  } catch {
    /* ignore */
  }
}

export function matchPopupForced() {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('match') === '1';
}

/** Match popup is about to take the screen, so set lunch stays back. */
export function matchPopupBlockingLunch() {
  if (typeof window === 'undefined' || !MATCH_DAY_POPUP_ENABLED) return false;
  if (matchPopupForced()) return true;
  if (!matchDayCampaignLive()) return false;
  return !matchPopupDismissed();
}
