/** Drinks menu - categories, optional price columns (wine, vodka), simple rows otherwise. */

export const DRINKS_CATEGORY_ORDER = [
  'Beer',
  'Mykulyn Draught Beer',
  'Wine',
  'Sparkling Wine',
  'Horilka - Vodka',
  'Soft Drinks',
  'Tea',
  'Coffee & Hot Chocolate',
];

export function sortDrinksCategories(categories) {
  return [...categories].sort((a, b) => {
    const ia = DRINKS_CATEGORY_ORDER.indexOf(a.title);
    const ib = DRINKS_CATEGORY_ORDER.indexOf(b.title);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });
}

export const defaultDrinksIntro = 'Ukrainian beers, wines, horilka, and bar favourites.';

export const defaultDrinksMenu = [
  {
    title: 'Beer',
    items: [
      { name: 'Obolon Light', detail: '4.5% · 500ml', price: '£6' },
      { name: 'Obolon Premium Lager', detail: '5.0% · 500ml', price: '£6' },
      { name: 'Lvivske Svitle', detail: '4.3% · 500ml', price: '£6' },
      { name: 'Lvivske Myagke', detail: '4.2% · 450ml', price: '£6' },
      { name: 'Lvivske 1715', detail: '4.5% · 450ml', price: '£6' },
    ],
  },
  {
    title: 'Mykulyn Draught Beer',
    items: [
      { name: 'Honey Lager', detail: '5.8%', price: '£7.50' },
      { name: 'Lager', detail: '4.3%', price: '£7' },
    ],
  },
  {
    title: 'Wine',
    columns: ['Glass', 'Bottle'],
    items: [
      { name: 'Koblevo Stefania', detail: 'Semi-dry red', prices: ['£7.50', '£22'] },
      { name: 'Koblevo White', detail: 'Semi-dry white', prices: ['£7.50', '£22'] },
      { name: 'Koblevo Rose', detail: 'Semi-dry rosé', prices: ['£7.50', '£22'] },
      { name: 'Villa Tinta Merlot', detail: 'Dry red', prices: ['£8.50', '£28'] },
      { name: 'Odessa Black', detail: 'Dry red', prices: ['£8.50', '£28'] },
      { name: 'Artania White', detail: 'Dry white', prices: ['£10', '£32'] },
      { name: 'Artania Red', detail: 'Dry red', prices: ['£10', '£32'] },
    ],
  },
  {
    title: 'Sparkling Wine',
    columns: ['Bottle'],
    items: [
      { name: 'Oreanda Brut White', prices: ['£48'] },
      { name: 'Premium Oreanda Crystal Brut', detail: 'Dry white', prices: ['£55'] },
    ],
  },
  {
    title: 'Horilka - Vodka',
    columns: ['25ml', '50ml'],
    items: [
      { name: 'Harvest Day', detail: '40%', prices: ['£3.50', '£6.50'] },
      { name: 'Nemiroff', detail: '40%', prices: ['£3.50', '£6.50'] },
      { name: 'Nemiroff Honey Pepper', detail: '40%', prices: ['£4', '£7'] },
      { name: 'Khortytsa', detail: '40%', prices: ['£3.50', '£6.50'] },
    ],
  },
  {
    title: 'Soft Drinks',
    items: [
      { name: 'Zhivchyk Apple', detail: '1L', price: '£8' },
      { name: 'Apple, orange or tomato juice', detail: '1L', price: '£8' },
      { name: 'Kvass Taras', detail: '0.5L', price: '£5' },
      { name: 'Cola, Sprite, Fanta, 7Up', detail: '0.33L', price: '£3.50' },
      { name: 'Zhivchyk Apple', detail: '0.25L', price: '£3' },
      { name: 'Apple, orange or tomato juice', detail: '0.25L', price: '£3' },
      { name: 'Apple or tomato juice', detail: '0.5L', price: '£4' },
      { name: 'Sparkling water', detail: '0.5L', price: '£2.50' },
      { name: 'Still water', detail: '0.5L', price: '£2.50' },
    ],
  },
  {
    title: 'Tea',
    items: [
      { name: 'Tea', price: '£3.20' },
      { name: 'Herbal tea', price: '£4.20' },
      { name: 'Herbal tea pot', price: '£7' },
      { name: 'Iced tea', price: '£4' },
    ],
  },
  {
    title: 'Coffee & Hot Chocolate',
    items: [
      { name: 'Espresso', price: '£2.50' },
      { name: 'Double espresso', price: '£3' },
      { name: 'Americano', price: '£3.20' },
      { name: 'White americano', price: '£3.50' },
      { name: 'Cappuccino', price: '£4.20' },
      { name: 'Latte', price: '£4.40' },
      { name: 'Hot chocolate', price: '£4.20' },
      { name: 'Iced coffee', price: '£4.80' },
    ],
  },
];
