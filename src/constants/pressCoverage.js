/** External coverage and video (humanitarian page). */
export const PRESS_COVERAGE = [
  {
    id: 'bbc',
    label: 'BBC News',
    title: 'Ukrainian couple turn London restaurant into donations hub',
    href: 'https://www.bbc.co.uk/news/uk-england-london-60664874',
    date: '9 March 2022',
  },
  {
    id: 'new-arab',
    label: 'The New Arab',
    title: 'A restaurant on the frontline of war: Londoners mobilise for Ukraine',
    href: 'https://www.newarab.com/features/ukraine-london-restaurant-frontlines-war',
    date: '31 March 2022',
  },
  {
    id: 'sw-londoner',
    label: 'South West Londoner',
    title: 'Ukrainian restaurant in Twickenham sets up humanitarian collection',
    href: 'https://www.swlondoner.co.uk/news/08032022-watch-ukrainian-restaurant-in-twickenham-sets-up-humanitarian-collection',
    date: '8 March 2022',
  },
  {
    id: 'sports-gazette',
    label: 'Sports Gazette',
    title: 'Twickenham restaurant raises funds for Ukraine on eve of England vs. Ireland',
    href: 'https://sportsgazette.co.uk/local-restaurant-becomes-hub-for-humanitarian-help/',
    date: '11 March 2022',
  },
  {
    id: 'tdmu',
    label: 'Ternopil National Medical University',
    title: 'Ukrainian restaurant in London joins help for our country (humanitarian shipment)',
    href: 'https://www.tdmu.edu.ua/blog/2022/03/11/ukrayinskyj-restoran-u-londoni-doluchyvsya-do-dopomogy-nashij-krayini/',
    date: '11 March 2022',
  },
];

export const PRESS_BY_ID = Object.fromEntries(PRESS_COVERAGE.map((item) => [item.id, item]));

/** Primary film — Twickenham community & convoys to Ukraine */
export const HUMANITARIAN_FEATURED_VIDEO_EMBED = 'https://www.youtube.com/embed/bDCjk46SUaQ';
export const HUMANITARIAN_FEATURED_VIDEO_URL = 'https://youtu.be/bDCjk46SUaQ';

export const HUMANITARIAN_VIDEO_EMBED = 'https://www.youtube.com/embed/0a46c4eDGok';
export const HUMANITARIAN_VIDEO_URL = 'https://www.youtube.com/watch?v=0a46c4eDGok';
