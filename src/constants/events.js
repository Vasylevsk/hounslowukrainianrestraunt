import eventUsyk from '../assets/event/USYK.jpeg';
import eventUkrainianCultural from '../assets/event/Ukrainian Cultural Event.jpeg';
import eventJanna from '../assets/event/janna.png';
import eventVictoria from '../assets/event/victoria.png';
import eventChristmas from '../assets/event/christmas2026.jpg';

import { SOCIAL_LINKS } from './social';

/** Homepage event carousel items. Use sortDate (YYYY-MM-DD) for ordering. */
export const EVENT_HIGHLIGHTS = [
  {
    id: 'ukrainian-cultural',
    image: eventUkrainianCultural,
    alt: 'Ukrainian Cultural Event at Prosperity Ukrainian Restaurant',
    title: 'Ukrainian Cultural Event',
    subtitle: 'Culture & celebration at Prosperity',
    href: 'https://www.instagram.com/p/DYj_kePCOY-/',
    linkType: 'instagram',
    badge: 'See on Instagram',
    ended: false,
  },
  {
    id: 'janna',
    image: eventJanna,
    alt: 'Zhanna Ltavska live concert at Prosperity Ukrainian Restaurant',
    title: 'Zhanna Ltavska',
    subtitle: '20 June 2026 · Live concert',
    sortDate: '2026-06-20',
    href: 'https://eventfirst.co.uk/event/zhanna-ltavska/',
    linkType: 'tickets',
    badge: 'On sale',
    ended: false,
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
