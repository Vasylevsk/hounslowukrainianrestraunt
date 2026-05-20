/** Default site copy: hours, featured blocks on home, full menu page. Version must match persisted JSON. */

import menuDishImages from './menuImages';

export const SITE_CONTENT_VERSION = 9;

const img = (dishName) => ({ image: (dishName && menuDishImages[dishName]) || '' });

export const defaultWorkingHours = [
  { day: 'Monday', hours: 'Closed' },
  { day: 'Tuesday', hours: '09:00-21:00' },
  { day: 'Wednesday', hours: '09:00-21:30' },
  { day: 'Thursday', hours: '09:00-21:30' },
  { day: 'Friday', hours: '09:00-21:30' },
  { day: 'Saturday', hours: '09:00-22:00' },
  { day: 'Sunday', hours: '12:00-21:00' },
];

export const defaultFeaturedMenu = {
  sectionSubTitle: 'Menu Highlights',
  sectionTitle: 'Prosperity Classics',
  leftTitle: 'Guest Favourites',
  rightTitle: 'Ukrainian Classics',
  leftItems: [
    { title: 'Beef Steak with Salad', price: '£18', tags: 'Served with fresh salad' },
    { title: 'Salmon in Creamy Spinach Sauce', price: '£18', tags: 'Salmon, spinach, double cream, served with salad' },
    { title: 'Pork Shank with Braised Cabbage', price: '£22', tags: 'Slow-cooked pork shank with braised cabbage' },
    { title: 'Mixed Meat Solyanka', price: '£11', tags: 'Ham, sausage, bacon, frankfurters, olives and lemon' },
    { title: 'Party Platter for 6', price: '£80', tags: 'Steaks, skewers, wings, sausage, potatoes and braised cabbage' },
  ],
  rightItems: [
    {
      title: 'Borscht with Salo & Sour Cream',
      price: '£9',
      tags: 'Served with salo, bread and onions',
    },
    { title: 'Chicken Kyiv', price: '£17', tags: 'Herb butter, cheese, breadcrumbs, served with salad' },
    { title: 'Ukrainian Poltava Galushky', price: 'from £15', tags: 'Traditional dumplings — choose your filling' },
    { title: 'Chanakhy', price: '£10', tags: 'Pork, beef, beans, mushrooms and potatoes' },
    { title: 'Banosh', price: '£6', tags: 'Cornmeal with double cream, served with salad' },
  ],
};

/** Canonical category order for the menu page (starters → mains → extras → desserts). */
export const MENU_CATEGORY_ORDER = [
  'Appetizers',
  'Salads',
  'Soups',
  'Main Courses',
  'Dumplings & Pancakes',
  'Sides',
  'Banosh',
  'Sauces',
  'Desserts',
];

export function sortMenuCategories(categories) {
  return [...categories].sort((a, b) => {
    const ia = MENU_CATEGORY_ORDER.indexOf(a.title);
    const ib = MENU_CATEGORY_ORDER.indexOf(b.title);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });
}

/** Full menu. Optional `image`: public URL e.g. /menu/dish.jpg. Optional `variants`: { name, price }[] */
export const defaultFullMenu = [
  {
    title: 'Appetizers',
    items: [
      {
        name: 'Salo with Black Bread',
        price: '£10',
        description: 'Pickled cucumber and Korean-style carrots.',
        ...img(),
      },
      {
        name: 'Herring with Potatoes & Pickles',
        price: '£12',
        description: 'Traditional cured herring served with boiled potatoes and pickles.',
        ...img(),
      },
      {
        name: 'Pickled Assortment',
        price: '£9',
        description: 'Korean-style carrots, cucumber and mushrooms.',
        ...img(),
      },
      {
        name: 'Cheese & Meat Platter',
        price: '£13',
        description: 'Selection of cheeses and cured meats, served with adjika.',
        ...img(),
      },
    ],
  },
  {
    title: 'Salads',
    items: [
      {
        name: 'Olivier Salad',
        price: '£7',
        description: 'Sausage, potatoes, carrots, pickled cucumber, egg, green peas, mayonnaise.',
        ...img(),
      },
      {
        name: 'Beetroot Salad',
        price: '£8',
        description: 'Mixed greens, cucumber, beetroot, stuffed pepper, dressing, pistachios.',
        ...img(),
      },
      {
        name: 'Warm Eggplant Salad',
        price: '£9',
        description: 'Mixed greens, cherry tomatoes, roasted eggplant, parmesan, dressing.',
        ...img(),
      },
      {
        name: 'Warm Chicken Salad',
        price: '£11',
        description: 'Mixed greens, cherry tomatoes, cucumber, grilled chicken, mozzarella, dressing.',
        ...img(),
      },
    ],
  },
  {
    title: 'Soups',
    items: [
      {
        name: 'Borscht with Salo & Sour Cream',
        price: '£9',
        description:
          'Chicken, beetroot, cabbage, carrots, potatoes. Served with salo, bread and onions.',
        ...img(),
      },
      {
        name: 'Seasonal Vegetable Cream Soup with Bruschetta',
        price: '£8',
        description: 'Cauliflower, potatoes, carrot, onions and pumpkin, finished with sour cream.',
        ...img('Seasonal Vegetable Cream Soup with Bruschetta'),
      },
      {
        name: 'Seasonal Traditional Okroshka',
        price: '£9',
        description: 'Cold kefir soup with fresh vegetables, herbs, eggs and tender meat.',
        ...img(),
      },
      {
        name: 'Mixed Meat Solyanka',
        price: '£11',
        description: 'Ham, sausage, bacon, frankfurters, onion, olives and lemon.',
        ...img('Mixed Meat Solyanka'),
      },
      {
        name: 'Chanakhy',
        price: '£10',
        description: 'Pork, beef, beans, mushrooms and potatoes.',
        ...img(),
      },
    ],
  },
  {
    title: 'Main Courses',
    items: [
      {
        name: 'Caramelized Chicken Steak',
        price: '£12',
        description: 'Marinated chicken fillet, served with salad.',
        ...img(),
      },
      {
        name: 'Chicken Kyiv',
        price: '£17',
        description: 'Chicken fillet, herb butter, cheese, breadcrumbs, served with salad.',
        ...img('Chicken Kyiv'),
      },
      {
        name: 'Verkhovyna-style Schnitzel',
        price: '£13',
        description: 'Pork in egg and breadcrumbs, served with salad.',
        ...img(),
      },
      {
        name: 'Braised Pork Steak',
        price: '£15',
        description: 'Marinated pork neck fillet, served with salad.',
        ...img(),
      },
      {
        name: 'Pork Shashlik',
        price: '£15',
        description: 'Grilled pork skewers, served with salad.',
        ...img('Pork Shashlik'),
      },
      {
        name: 'Pork Shank with Braised Cabbage',
        price: '£22',
        description: 'Slow-cooked pork shank with braised cabbage.',
        ...img(),
      },
      {
        name: 'Black Pudding Sausage with Braised Cabbage',
        price: '£11',
        description: '',
        ...img(),
      },
      {
        name: 'Beef Steak with Salad',
        price: '£18',
        description: '',
        ...img(),
      },
      {
        name: 'Beef Liver Cutlets in Sour Cream Sauce',
        price: '£14',
        description: 'Served with salad and potatoes.',
        ...img(),
      },
      {
        name: 'Chopped Lamb Cutlet',
        price: '£16',
        description: 'Served with potatoes and salad.',
        ...img(),
      },
      {
        name: 'Bukovyna-style Lamb',
        price: '£18',
        description: 'Bone-in lamb with vegetables and brynza cheese.',
        ...img(),
      },
      {
        name: 'Roasted Crispy Quail',
        price: '£17',
        description: 'Served with salad.',
        ...img(),
      },
      {
        name: 'Crispy Fried Carp',
        price: '£17',
        description: 'Half carp fillet, served with sauce and salad.',
        ...img(),
      },
      {
        name: 'Salmon in Creamy Spinach Sauce',
        price: '£18',
        description: 'Salmon fillet, spinach, double cream, served with salad.',
        ...img(),
      },
      {
        name: 'Stuffed Cabbage Rolls with Mushroom Sauce',
        price: '£9',
        description: '5 pieces. Cabbage, rice, pork & beef mince, carrots, onion.',
        ...img(),
      },
      {
        name: 'Vegetarian Stuffed Cabbage Rolls',
        price: '£8',
        description: '5 pieces. Cabbage, potatoes, buckwheat, carrots, onion.',
        ...img(),
      },
      {
        name: 'Party Platter for 6',
        price: '£80',
        description:
          'Steak, sausages, chicken skewers, pork skewers, chicken wings, black pudding sausage, potatoes and braised cabbage.',
        ...img('Party Platter for 6'),
      },
    ],
  },
  {
    title: 'Dumplings & Pancakes',
    items: [
      {
        name: 'Varenyky',
        price: '',
        description:
          'Served with fried onions & pork cracklings or butter. Choice of sour cream, machanka sauce or carbonara sauce.',
        variants: [
          { name: 'Potatoes & cheese, 10 pcs', price: '£10' },
          { name: 'Cabbage, 10 pcs', price: '£10' },
          { name: 'Fish with special sauce, 5 pcs', price: '£15' },
        ],
        ...img('Varenyky'),
      },
      {
        name: 'Pelmeni, 18 pcs',
        price: '£13',
        description:
          'Pork & beef or chicken. Served with butter & sour cream or machanka sauce.',
        ...img(),
      },
      {
        name: 'Ukrainian Poltava Galushky',
        price: '',
        description: 'Traditional dumplings — choose your filling.',
        variants: [
          { name: 'With seasonal vegetables', price: '£15' },
          { name: 'With braised meat', price: '£16' },
          { name: 'With veal meat', price: '£16' },
          { name: 'With seafood', price: '£18' },
          { name: 'With rabbit', price: '£19' },
        ],
        ...img('Ukrainian Poltava Galushky'),
      },
      {
        name: 'Potato Pancakes, 5 pcs',
        price: '£9',
        description: 'Served with fried onions & pork cracklings or sour cream.',
        ...img(),
      },
      {
        name: 'Potato Pancakes in a Clay Pot',
        price: '£12',
        description: 'With mushrooms & cheese, served with salad.',
        ...img(),
      },
      {
        name: 'Stuffed Crepes (Benderyky), 3 pcs',
        price: '',
        description: '',
        variants: [
          { name: 'With cabbage', price: '£7' },
          { name: 'With chicken & mushroom sauce', price: '£9' },
        ],
        ...img(),
      },
    ],
  },
  {
    title: 'Sides',
    items: [
      { name: 'French Fries', price: '£4', description: '', ...img() },
      { name: 'Rice', price: '£4', description: '', ...img() },
      { name: 'Rustic Potatoes', price: '£5', description: '', ...img() },
      { name: 'Potato Gratin or Mashed Potatoes', price: '£5', description: '', ...img() },
    ],
  },
  {
    title: 'Banosh',
    items: [
      {
        name: 'Banosh',
        price: '£6',
        description: 'Cornmeal with double cream, served with salad.',
        ...img(),
      },
      {
        name: 'Banosh Add-ons',
        price: '',
        description: 'Add to your banosh.',
        variants: [
          { name: 'With brynza cheese', price: '£3' },
          { name: 'With pork cracklings', price: '£3' },
          { name: 'With mushrooms', price: '£3' },
        ],
        ...img(),
      },
    ],
  },
  {
    title: 'Sauces',
    items: [
      { name: 'Adjika', price: '£4', description: '', ...img() },
      { name: 'BBQ Sauce', price: '£4', description: '', ...img() },
      { name: 'Tartar Sauce', price: '£4', description: '', ...img() },
    ],
  },
  {
    title: 'Desserts',
    items: [
      {
        name: 'Crepes in Creamy Orange Sauce',
        price: '£9',
        description: '',
        ...img('Crepes in Creamy Orange Sauce'),
      },
      {
        name: 'Crepes with Cottage Cheese',
        price: '£9',
        description: 'With strawberry jam or sour cream.',
        ...img('Crepes with Cottage Cheese'),
      },
      {
        name: 'Syrnyky (Cheese Pancakes)',
        price: '£9',
        description: 'With strawberry jam or sour cream.',
        ...img(),
      },
      {
        name: 'Cherry Varenyky, 3 pcs',
        price: '£9',
        description: 'Served with sour cream.',
        ...img(),
      },
      {
        name: 'Cake of the Day',
        price: '£9',
        description: 'Ask your server for today\'s selection.',
        ...img(),
      },
    ],
  },
];

export const defaultMenuIntro =
  'Authentic Ukrainian cuisine in Twickenham — from borscht and varenyky to grilled meats and banosh. All prices in GBP. Dishes with options are listed below each item; ask our team if you need help choosing.';

export const BREAKFAST_CATEGORY_ORDER = [
  'House Breakfasts',
  'Omelette',
  'Skillets & Eggs',
  'Pancakes / Benderyky',
  'Burgers & More',
  'Desserts',
];

export function sortBreakfastCategories(categories) {
  return [...categories].sort((a, b) => {
    const ia = BREAKFAST_CATEGORY_ORDER.indexOf(a.title);
    const ib = BREAKFAST_CATEGORY_ORDER.indexOf(b.title);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });
}

export const defaultBreakfastIntro =
  'Start your day the Ukrainian way — hearty plates, omelettes, skillets, and sweet finishes. All prices in GBP.';

export const defaultBreakfastBadge = 'Until 4:00 PM';

/** Breakfast menu (served until 4:00 PM). Same item shape as fullMenu. */
export const defaultBreakfastMenu = [
  {
    title: 'House Breakfasts',
    items: [
      {
        name: 'Full House',
        price: '£14',
        description:
          'Eggs x2, bacon x2, sausages x2, black pudding x2, potato pancakes x2, mushrooms, tomatoes, beans, toast.',
        ...img('Full House'),
      },
      {
        name: 'Green House',
        price: '£10',
        description: 'Potato pancakes x2, mushrooms, beans, tomatoes, toast.',
        ...img(),
      },
    ],
  },
  {
    title: 'Omelette',
    items: [
      {
        name: 'Omelette',
        price: '',
        description: 'Served with chips or potato pancakes x2.',
        variants: [
          { name: 'With cheese', price: '£10' },
          { name: 'With ham', price: '£11' },
          { name: 'With salmon', price: '£13' },
        ],
        ...img(),
      },
    ],
  },
  {
    title: 'Skillets & Eggs',
    items: [
      {
        name: 'Cossack Strength Skillet',
        price: '£12',
        description: 'Potatoes, bacon, sausage, tomatoes, eggs, greens.',
        ...img('Cossack Strength Skillet'),
      },
      {
        name: "Nobleman's Egg",
        price: '',
        description: 'Bruschetta x2, poached eggs x2, rocket, hollandaise sauce.',
        variants: [
          { name: 'With mushrooms', price: '£9' },
          { name: 'With bacon', price: '£11' },
          { name: 'With salmon', price: '£13' },
        ],
        ...img(),
      },
    ],
  },
  {
    title: 'Pancakes / Benderyky',
    items: [
      {
        name: 'Pancakes / Benderyky',
        price: '',
        description: '',
        variants: [
          { name: 'With cabbage, 3 pcs', price: '£7' },
          { name: 'With chicken & mushroom sauce, 3 pcs', price: '£9' },
        ],
        ...img(),
      },
    ],
  },
  {
    title: 'Burgers & More',
    items: [
      {
        name: 'Burger + Chips',
        price: '£14',
        description:
          'Cheese, green salad, tomato, pickled cucumber or caramelized onion. Chicken or beef.',
        ...img(),
      },
      {
        name: 'Cheburaky',
        price: '£7',
        description: 'With minced pork and chicken.',
        ...img(),
      },
    ],
  },
  {
    title: 'Desserts',
    items: [
      {
        name: 'Pancakes in Orange Sauce with Ice Cream',
        price: '£9',
        description: '3 pieces.',
        ...img('Pancakes in Orange Sauce with Ice Cream'),
      },
      {
        name: 'Pancakes with Cottage Cheese',
        price: '£9',
        description: '2 pieces. Served with strawberry jam or sour cream.',
        ...img('Pancakes with Cottage Cheese'),
      },
      {
        name: 'Syrnyky (Cheese Pancakes)',
        price: '£9',
        description: '3 pieces. Served with strawberry jam or sour cream.',
        ...img(),
      },
      {
        name: 'Cherry Dumplings',
        price: '£9',
        description: '',
        ...img(),
      },
      {
        name: 'Cake of the Day',
        price: '£9',
        description: 'Ask your server for today\'s selection.',
        ...img(),
      },
    ],
  },
];

export const defaultSiteContent = {
  version: SITE_CONTENT_VERSION,
  workingHours: defaultWorkingHours,
  featuredMenu: defaultFeaturedMenu,
  fullMenu: defaultFullMenu,
  menuIntro: defaultMenuIntro,
  breakfastMenu: defaultBreakfastMenu,
  breakfastIntro: defaultBreakfastIntro,
  breakfastBadge: defaultBreakfastBadge,
};
