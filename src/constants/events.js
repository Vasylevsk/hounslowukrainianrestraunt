import eventUsyk from '../assets/event/USYK.jpeg';
import eventUkrainianCultural from '../assets/event/Ukrainian Cultural Event.jpeg';
import eventVictoria from '../assets/event/victoria.png';
import eventChristmas from '../assets/event/christmas2026.jpg';
import eventKupala from '../assets/event/kypala.jpeg';
import eventIndependenceDay from '../assets/event/Ukrainian Independence Day Festival.jpeg';

import { SOCIAL_LINKS } from './social';

/** Homepage event carousel items. Use sortDate (YYYY-MM-DD) for ordering. */
export const EVENT_HIGHLIGHTS = [
  {
    id: 'independence-day-2026',
    image: eventIndependenceDay,
    alt: 'Ukrainian Independence Day Festival 2026 - Orlean Gardens, Twickenham',
    title: 'Ukrainian Independence Day Festival',
    subtitle: '5 September 2026 · 12:00-19:00 · Orlean Gardens, Twickenham',
    sortDate: '2026-09-05',
    href: 'https://www.eventbrite.co.uk/e/ukrainian-independence-day-festival-tickets-1997154116725',
    linkType: 'tickets',
    badge: 'Tickets',
    ended: false,
  },
  {
    id: 'ukrainian-cultural',
    image: eventUkrainianCultural,
    alt: 'Ukrainian Cultural Event at Prosperity Ukrainian Restaurant',
    title: 'Ukrainian Cultural Event',
    subtitle: 'Culture & celebration at Prosperity',
    href: 'https://www.instagram.com/p/DYj_kePCOY-/',
    linkType: 'instagram',
    badge: 'Event ended',
    ended: true,
  },
  {
    id: 'kupala-party',
    image: eventKupala,
    alt: '#KupalaParty - artisan market, masterclasses, live music and food in Kew',
    title: '#KupalaParty',
    subtitle: '21 June 2026 · 15:00-20:00 · Kew',
    sortDate: '2026-06-21',
    href: SOCIAL_LINKS.instagram,
    linkType: 'instagram',
    badge: 'Event ended',
    ended: true,
  },
  {
    id: 'usyk',
    image: eventUsyk,
    alt: 'USYK vs RICO - WBO World Heavyweight Championship viewing at Prosperity',
    title: 'USYK vs RICO',
    subtitle: '23 May 2026 · WBO World Heavyweight · Giza',
    sortDate: '2026-05-23',
    href: SOCIAL_LINKS.instagram,
    linkType: 'instagram',
    badge: 'Event ended',
    ended: true,
  },
  {
    id: 'victoria',
    image: eventVictoria,
    alt: 'Victoria - live evening at Prosperity',
    title: 'Victoria',
    subtitle: 'Live music at Prosperity',
    href: SOCIAL_LINKS.instagram,
    linkType: 'instagram',
    badge: 'Event ended',
    ended: true,
  },
  {
    id: 'christmas',
    image: eventChristmas,
    alt: 'Christmas celebrations at Prosperity',
    title: 'Christmas 2026',
    subtitle: 'Festive evenings at Prosperity',
    sortDate: '2025-12-20',
    href: SOCIAL_LINKS.instagram,
    linkType: 'instagram',
    badge: 'Event ended',
    ended: true,
  },
];

function dateValue(sortDate) {
  if (!sortDate) return null;
  const t = new Date(`${sortDate}T12:00:00`).getTime();
  return Number.isFinite(t) ? t : null;
}

/** Upcoming first (soonest date), then past (most recent first). Undated items last within each group. */
export function sortEventsByDate(events) {
  const upcoming = [];
  const past = [];

  events.forEach((event) => {
    if (event.ended) past.push(event);
    else upcoming.push(event);
  });

  const asc = (a, b) => {
    const da = dateValue(a.sortDate);
    const db = dateValue(b.sortDate);
    if (da == null && db == null) return 0;
    if (da == null) return 1;
    if (db == null) return -1;
    return da - db;
  };

  const desc = (a, b) => -asc(a, b);

  return [...upcoming.sort(asc), ...past.sort(desc)];
}
