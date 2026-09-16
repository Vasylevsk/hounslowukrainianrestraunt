import { ORGANIZATION } from './seo';

/** Weekday set-lunch offer shown in the site popup. */

export const SET_LUNCH_STORAGE_KEY = 'prosperity_set_lunch_popup_v2';

export const SET_LUNCH = {
  eyebrow: 'Weekday set lunch',
  title: 'Set Lunch',
  days: 'Tuesday to Friday',
  tagline: 'Great food. Brighter days.',
  summary: 'Walk in any weekday, or prepay four lunches and save £5. One lunch per day.',
  prices: [
    { amount: '£15', label: 'Per lunch' },
    { amount: '£55', label: '4 lunches' },
  ],
  saveNote: 'Save £5',
  phoneLabel: '07853 514567',
  phoneHref: `tel:${ORGANIZATION.telephoneAlt}`,
  place: 'Twickenham, TW1 3LP',
  mapsHref: 'https://maps.app.goo.gl/6cZKRmVvRjkUgx5v7',
};
