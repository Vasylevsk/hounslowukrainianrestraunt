import { ORGANIZATION } from './seo';

/** Weekday set-lunch offer shown in the homepage popup. */

export const SET_LUNCH_STORAGE_KEY = 'prosperity_set_lunch_popup_v1';

export const SET_LUNCH = {
  eyebrow: 'Weekday offer',
  title: 'Set Lunch',
  days: 'Tuesday to Friday',
  tagline: 'Great food. Brighter days.',
  walkIn: 'Walk in any day, Tuesday–Friday.',
  prepay: 'Prepay for Tuesday–Friday and save £5.',
  limit: 'One lunch per day',
  prices: [
    { amount: '£15', label: 'Per lunch', note: 'Walk in any weekday' },
    { amount: '£55', label: 'Four lunches', note: 'Prepay and save £5', featured: true },
  ],
  phoneLabel: '07853 514567',
  phoneHref: `tel:${ORGANIZATION.telephoneAlt}`,
  place: 'Twickenham, TW1 3LP',
  mapsHref: 'https://maps.app.goo.gl/6cZKRmVvRjkUgx5v7',
  closing: 'Good food brings good people together.',
};
