import { LOUNGE_SHISHA_ENABLED } from './features';

const ALL_NAV_LINKS = [
  { label: 'Menu', to: '/menu', type: 'route' },
  { label: 'Banquet', to: '/banquet', type: 'route' },
  { label: 'Lounge', to: '#lounge', type: 'anchor', loungeOnly: true },
  { label: 'Events', to: '#events', type: 'anchor' },
  { label: 'Ukraine Aid', to: '/humanitarian-aid', type: 'route' },
  { label: 'Contact', to: '#contact', type: 'anchor' },
];

/** Primary nav — order matches homepage story flow */
export const NAV_LINKS = LOUNGE_SHISHA_ENABLED
  ? ALL_NAV_LINKS
  : ALL_NAV_LINKS.filter((link) => !link.loungeOnly);

export const NAV_CTA = {
  label: 'Book a Table',
  to: '/booking',
};
