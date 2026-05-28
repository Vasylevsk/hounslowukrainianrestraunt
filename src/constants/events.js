import eventUsyk from '../assets/event/USYK.jpeg';
import eventUkrainianCultural from '../assets/event/Ukrainian Cultural Event.jpeg';
import eventJanna from '../assets/event/janna.png';
import eventVictoria from '../assets/event/victoria.png';
import eventChristmas from '../assets/event/christmas2026.jpg';

import { SOCIAL_LINKS } from './social';

/** Homepage event carousel — order: upcoming → past → seasonal */
export const EVENT_HIGHLIGHTS = [
  {
    id: 'usyk',
    image: eventUsyk,
    alt: 'USYK vs RICO — WBO World Heavyweight Championship viewing at Prosperity',
    title: 'USYK vs RICO',
    subtitle: '23 May 2026 · WBO World Heavyweight · Giza',
    href: SOCIAL_LINKS.instagram,
    linkType: 'instagram',
    badge: 'Event ended',
    ended: true,
  },
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
    href: 'https://eventfirst.co.uk/event/zhanna-ltavska/',
    linkType: 'tickets',
    badge: 'On sale',
    ended: false,
  },
  {
    id: 'victoria',
    image: eventVictoria,
    alt: 'Victoria — live evening at Prosperity',
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
    href: SOCIAL_LINKS.instagram,
    linkType: 'instagram',
    badge: 'Event ended',
    ended: true,
  },
];
