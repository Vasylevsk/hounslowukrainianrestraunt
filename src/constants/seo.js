/** Central SEO copy and per-route titles (English, UK-focused). */

export const SITE_NAME = 'Prosperity Ukrainian Restaurant';
export const SITE_NAME_SHORT = 'Prosperity';

export const DEFAULT_DESCRIPTION =
  'Prosperity Ukrainian Restaurant in Twickenham, London. Authentic Ukrainian cuisine, banquets, live music, and warm hospitality. Book a table at 59 York Street TW1 3LP.';

export const KEYWORDS =
  'Ukrainian restaurant Twickenham, Ukrainian restaurant London, Prosperity restaurant, Ukrainian food UK, banquet hall Twickenham, book table Ukrainian restaurant, York Street restaurant';

export const ORGANIZATION = {
  streetAddress: '59 York Street',
  addressLocality: 'Twickenham',
  postalCode: 'TW1 3LP',
  addressCountry: 'GB',
  telephone: '+442045680606',
  telephoneAlt: '+447853514567',
};

/** Pathname (no query) -> { title, description } */
export const SEO_BY_ROUTE = {
  '/': {
    title: `${SITE_NAME} | Ukrainian Restaurant Twickenham, London`,
    description: DEFAULT_DESCRIPTION,
  },
  '/menu': {
    title: `Menu | ${SITE_NAME}`,
    description:
      'Browse food, drinks, and breakfast at Prosperity Ukrainian Restaurant, Twickenham: Ukrainian classics, soups, grilled dishes, breakfast until 4 PM, and bar favourites.',
  },
  '/breakfast': {
    title: `Breakfast Menu | ${SITE_NAME}`,
    description:
      'Breakfast at Prosperity Ukrainian Restaurant, Twickenham - on our menu page. Full House, omelettes, skillets, pancakes, and more. Served until 4:00 PM.',
  },
  '/booking': {
    title: `Book a Table | ${SITE_NAME}`,
    description:
      'Reserve a table at Prosperity Ukrainian Restaurant, Twickenham — restaurant or lounge. Shisha in the lounge £27. Call 020 4568 0606 or book online.',
  },
  '/banquet': {
    title: `Banquets & Celebrations | ${SITE_NAME}`,
    description:
      'Host weddings, birthdays, christenings, and family celebrations at Prosperity Ukrainian Restaurant. Main hall, private rooms, live music, and Ukrainian banquet menus in Twickenham.',
  },
  '/humanitarian-aid': {
    title: `Humanitarian Aid for Ukraine | ${SITE_NAME_SHORT}`,
    description:
      'Prosperity for Ukraine: the story of Twickenham\'s humanitarian aid hub — 150 lorries with community volunteers, BBC & press coverage, photos, and film.',
  },
  '/privacy-policy': {
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      'Privacy Policy for Prosperity Ukrainian Restaurant, Twickenham. How we collect, use, and protect your personal data under UK GDPR.',
  },
  '/cookie-policy': {
    title: `Cookie Policy | ${SITE_NAME}`,
    description:
      'Cookie Policy for prosperityua.uk - essential cookies and optional Google Analytics, and how to manage your preferences.',
  },
  '/terms-of-use': {
    title: `Terms of Use | ${SITE_NAME}`,
    description:
      'Terms of Use for the Prosperity Ukrainian Restaurant website, including bookings, content, and acceptable use.',
  },
  '/admin': {
    title: `Content | ${SITE_NAME_SHORT}`,
    description: 'Staff content editor for Prosperity Ukrainian Restaurant. Not indexed by search engines.',
  },
};

export function getSeoForPath(pathname) {
  const path = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  return SEO_BY_ROUTE[path] || SEO_BY_ROUTE['/'];
}
