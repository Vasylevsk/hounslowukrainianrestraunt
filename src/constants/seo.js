import { LOUNGE_SHISHA_ENABLED } from './features';
import { defaultWorkingHours } from './siteDefaults';

/** Central SEO copy and per-route titles (English, UK-focused). */

export const SITE_NAME = 'Prosperity Ukrainian Restaurant';
export const SITE_NAME_SHORT = 'Prosperity';

const CLOSED_RE = /closed/i;

function dayRangeLabel(start, end) {
  if (start === end) return start;
  return `${start}–${end}`;
}

/** Compact hours line for meta descriptions, e.g. "Open Tuesday–Friday 12:00–21:00, Saturday–Sunday 12:00–22:00. Closed on Mondays". */
export function hoursDescriptionLine(workingHours = defaultWorkingHours) {
  if (!Array.isArray(workingHours) || workingHours.length === 0) return '';

  const groups = [];
  workingHours.forEach((row) => {
    if (!row || !row.day) return;
    const hours = String(row.hours || '').trim();
    const prev = groups[groups.length - 1];
    if (prev && prev.hours === hours) {
      prev.end = row.day;
    } else {
      groups.push({ start: row.day, end: row.day, hours });
    }
  });

  const openParts = [];
  const closedParts = [];
  groups.forEach((g) => {
    const label = dayRangeLabel(g.start, g.end);
    if (CLOSED_RE.test(g.hours)) {
      closedParts.push(g.start === g.end && g.start === 'Monday' ? 'Mondays' : label);
    } else {
      openParts.push(`${label} ${g.hours.replace(/[---]/g, '–')}`);
    }
  });

  const parts = [];
  if (openParts.length) parts.push(`Open ${openParts.join(', ')}`);
  if (closedParts.length) parts.push(`Closed on ${closedParts.join(' and ')}`);
  return parts.join('. ');
}

export function openingHoursSpecification(workingHours = defaultWorkingHours) {
  if (!Array.isArray(workingHours)) return [];
  return workingHours.flatMap((row) => {
    if (!row || !row.day) return [];
    const hours = String(row.hours || '');
    if (CLOSED_RE.test(hours)) return [];
    const m = hours.match(/(\d{1,2})\s*:\s*(\d{2})\s*[---]\s*(\d{1,2})\s*:\s*(\d{2})/);
    if (!m) return [];
    return [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: row.day,
        opens: `${String(m[1]).padStart(2, '0')}:${m[2]}`,
        closes: `${String(m[3]).padStart(2, '0')}:${m[4]}`,
      },
    ];
  });
}

export function getDefaultDescription(workingHours = defaultWorkingHours) {
  const hours = hoursDescriptionLine(workingHours);
  return hours
    ? `Authentic Ukrainian cuisine in Twickenham. ${hours}. Call 020 4568 0606.`
    : 'Authentic Ukrainian cuisine in Twickenham. Banquets, live music, and warm hospitality. Call 020 4568 0606.';
}

export const DEFAULT_DESCRIPTION = getDefaultDescription();

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
    title: `${SITE_NAME} | Twickenham, London`,
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
    description: LOUNGE_SHISHA_ENABLED
      ? 'Reserve a table at Prosperity Ukrainian Restaurant, Twickenham — restaurant or lounge. Shisha in the lounge £27. Call 020 4568 0606 or book online.'
      : 'Reserve a table at Prosperity Ukrainian Restaurant, Twickenham. Call 020 4568 0606 or book online.',
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
