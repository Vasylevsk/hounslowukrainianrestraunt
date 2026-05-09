/** Default site copy: hours, featured blocks on home, full menu page. Version must match persisted JSON. */

export const SITE_CONTENT_VERSION = 2;

const img = () => ({ image: '' });

export const defaultWorkingHours = [
  { day: 'Monday', hours: 'Closed' },
  { day: 'Tuesday', hours: '12:00-21:30' },
  { day: 'Wednesday', hours: '09:00-21:30' },
  { day: 'Thursday', hours: '09:00-21:30' },
  { day: 'Friday', hours: '09:00-21:30' },
  { day: 'Saturday', hours: '09:00-22:00' },
  { day: 'Sunday', hours: '12:00-22:00' },
];

export const defaultFeaturedMenu = {
  leftTitle: 'Ukrainian Classics',
  rightTitle: 'From our kitchen',
  leftItems: [
    { title: 'Ukrainian Borsch', price: '£6.50', tags: 'Beetroot, cabbage, chicken, herbs' },
    { title: 'Chicken Kiev', price: '£12.20', tags: 'Cheese, herbs, served with potatoes or rice' },
    { title: 'Varenyky with Potatoes', price: '£6.20', tags: 'With cracklings, sour cream or tomato sauce' },
    { title: 'Beef Stroganoff', price: '£12.90', tags: 'Beef in sauce with mashed potato and salad' },
    { title: 'Syrniki (Cheese Pancake)', price: '£5.10', tags: 'Three pieces, served with sour cream' },
  ],
  rightItems: [
    { title: 'Salo with Garlic', price: '£4.50', tags: 'With black bread' },
    { title: 'Sea Bass', price: '£14.80', tags: 'Grilled, with potatoes or rice or chips and salad' },
    { title: 'Siberian Pelmeni', price: '£6.90', tags: 'With sour cream or tomato sauce' },
    { title: 'Large Breakfast', price: '£7.90', tags: 'Eggs, bacon, sausages, beans, toast' },
    { title: 'Pancakes with Cottage Cheese', price: '£4.90', tags: 'Three pieces and sour cream' },
  ],
};

/** Menu aligned with Prosperity printed / Instagram menus. Optional `image`: public URL e.g. /menu/dish.jpg */
export const defaultFullMenu = [
  {
    title: 'Appetizers',
    items: [
      { name: 'Marinated Vegetable Platter', price: '£4.95', description: '', ...img() },
      { name: 'Kryzhalka', price: '£3.60', description: '', ...img() },
      { name: 'Meat Platter', price: '£9.80', description: '', ...img() },
      { name: 'Salo with Garlic and black bread', price: '£4.50', description: '', ...img() },
      { name: 'Pancakes with Salmon Caviar', price: '£10.80', description: '', ...img() },
    ],
  },
  {
    title: 'Breakfast',
    items: [
      {
        name: 'Large Breakfast',
        price: '£7.90',
        description:
          'Two fried eggs, 2 bacon rashers, 2 sausages, black pudding, 2 hash brown, baked beans, mushroom, tomato, 2 slices of toast with butter.',
        ...img(),
      },
      {
        name: 'Omelette Breakfast',
        price: '£6.80',
        description: 'Two eggs omelette with cheese, baked beans, chips and salad.',
        ...img(),
      },
      {
        name: 'Vegetarian Breakfast',
        price: '£5.90',
        description: 'Two fried eggs or 2 poached eggs, baked beans, hash brown, mushroom, tomato, slice of toast.',
        ...img(),
      },
    ],
  },
  {
    title: 'Soups',
    items: [
      {
        name: 'Ukrainian Borsch',
        price: '£6.50',
        description:
          'Beetroot, cabbage, potatoes, carrots, chicken meat, chopped tomato, red pepper, salt, pepper, potherbs.',
        ...img(),
      },
      {
        name: 'Mushroom Soup',
        price: '£5.20',
        description: 'Mushrooms, melted cheese, salt, pepper, and potherbs.',
        ...img(),
      },
      {
        name: 'Chicken Soup with Noodles',
        price: '£5.80',
        description: 'Chicken meat, noodles, potherbs.',
        ...img(),
      },
      {
        name: 'Solyanka',
        price: '£7.20',
        description: 'Six types of meat, potatoes, tomato puree, pickles, olives, lemon, capers, sour cream.',
        ...img(),
      },
      {
        name: 'Vegetable Cream Soup',
        price: '£4.10',
        description: 'Seasonal vegetables, cream, herbs.',
        ...img(),
      },
    ],
  },
  {
    title: 'Salads',
    items: [
      {
        name: 'Vinegret',
        price: '£5.20',
        description: 'Beetroot, potatoes, carrots, red beans, pickles, olive oil, salt and pepper.',
        ...img(),
      },
      {
        name: 'Summer Salads',
        price: '£5.60',
        description: 'Cucumber, tomatoes, pepper, olives, feta, salt, pepper, olive oil and lemon juice.',
        ...img(),
      },
      {
        name: 'Olivie',
        price: '£6.05',
        description: 'Potatoes, boiled sausage, peas, pickles, egg, salt, pepper, mayonnaise.',
        ...img(),
      },
    ],
  },
  {
    title: 'Fish & seafood',
    items: [
      {
        name: 'Fish and Chips, Green Peas, Tartare Sauce',
        price: '£10.80',
        description: 'Fillet of white fish batter, chips, green peas, tartare sauce.',
        ...img(),
      },
      {
        name: 'Sea Bass',
        price: '£14.80',
        description: 'Grilled sea bass, served with potatoes or rice or French fries and salad.',
        ...img(),
      },
      {
        name: 'Siberian Pelmeni, Dumplings',
        price: '£6.90',
        description: 'Meat dumplings served with sour cream or tomato sauce.',
        ...img(),
      },
      {
        name: 'Dumpling-Varenyky with Potatoes',
        price: '£6.20',
        description: 'Dumplings served with cracklings, sour cream or tomato sauce.',
        ...img(),
      },
      {
        name: 'Dumpling-Varenyky with Cabbage',
        price: '£5.95',
        description: 'Dumplings served with cracklings, sour cream or tomato sauce.',
        ...img(),
      },
      {
        name: 'Chicken Stripes',
        price: '£7.80',
        description: 'Chicken fillet stripes, 5 pieces, with French fries and salad.',
        ...img(),
      },
    ],
  },
  {
    title: 'Ukrainian mains',
    items: [
      {
        name: 'Chicken with Sauce On The Village',
        price: '£9.80',
        description: 'Chicken fillet with white sauce served with potatoes or rice or French fries and salad.',
        ...img(),
      },
      {
        name: 'Chicken Cutlets',
        price: '£7.80',
        description: 'Chicken fillet fried in egg with flour, served with potatoes or rice or French fries and salad.',
        ...img(),
      },
      {
        name: 'Chicken Kiev',
        price: '£12.20',
        description:
          'Chicken fillet, cheese, fried in egg with breadcrumbs, salt, pepper, potherbs, served with potatoes or rice or French fries and salad.',
        ...img(),
      },
      {
        name: 'Hutsul Chop',
        price: '£10.95',
        description: 'Pork chop, tomatoes, cheese served with potatoes or French fries or rice and salad.',
        ...img(),
      },
      {
        name: 'Pork Cutlets',
        price: '£9.90',
        description: 'Pork fillet fried in egg with flour, served with potatoes or rice or French fries and salad.',
        ...img(),
      },
      {
        name: 'Beef Stroganoff',
        price: '£12.90',
        description: 'Beef in sauce served with mashed potatoes and salad.',
        ...img(),
      },
      {
        name: 'Liver Under Home Made Sauce',
        price: '£7.60',
        description: 'Chicken liver, sour cream, onion, served with garnish.',
        ...img(),
      },
      {
        name: 'Cabbage Rolls',
        price: '£7.10',
        description: 'Stuffed cabbage with meat and rice, tomato sauce.',
        ...img(),
      },
    ],
  },
  {
    title: 'Pasta',
    items: [
      {
        name: 'Spaghetti & Meatballs',
        price: '£8.50',
        description: 'Beef meatballs served with spaghetti tomato sauce.',
        ...img(),
      },
      {
        name: 'Pasta Penne with Tomatoes & White Beans',
        price: '£7.80',
        description: 'Penne, diced tomatoes, cannellini beans, fresh spinach, grated cheese.',
        ...img(),
      },
      {
        name: 'Pasta Bolognese',
        price: '£8.80',
        description: 'Penne, beef minced, red beans, tomato sauce with cheese.',
        ...img(),
      },
      {
        name: 'Spaghetti Pasta Carbonara',
        price: '£8.05',
        description: 'Bacon, spaghetti, carbonara sauce.',
        ...img(),
      },
      {
        name: 'Creamy Garlic Mix Seafood Pasta',
        price: '£10.50',
        description: 'Tagliatelle with mixed seafood, creamy garlic sauce.',
        ...img(),
      },
    ],
  },
  {
    title: 'Burgers, sandwiches & panini',
    items: [
      {
        name: 'Beef Burger with Chips',
        price: '£7.80',
        description: 'Buns with cheese, beef minced, lettuce, tomato, golden crispy chips.',
        ...img(),
      },
      {
        name: 'Open-Faced Sandwich (Zapiekanka)',
        price: '£4.50',
        description: 'With mushroom and cheese, ketchup.',
        ...img(),
      },
      {
        name: 'Open-Faced Sandwich (Zapiekanka)',
        price: '£5.80',
        description: 'With chicken, pickled cucumber, cheese, tomato.',
        ...img(),
      },
      {
        name: 'Open-Faced Sandwich (Zapiekanka)',
        price: '£6.50',
        description: 'With cooked beef minced, red beans, cheese, tomato.',
        ...img(),
      },
      {
        name: 'Panini with Bacon, Sausage, Egg, Tomato, Green Salad',
        price: '£3.50',
        description: '',
        ...img(),
      },
      {
        name: 'Panini with Chicken, Cheese, Tomato, Green Salad',
        price: '£4.20',
        description: '',
        ...img(),
      },
      {
        name: 'Panini with Tuna, Salad and Sweetcorn',
        price: '£3.10',
        description: '',
        ...img(),
      },
      {
        name: 'Panini with Smoked Salmon, Tomato, Green Salad',
        price: '£5.80',
        description: '',
        ...img(),
      },
    ],
  },
  {
    title: 'Palyanyzza',
    items: [
      {
        name: 'Palyanyzza with Pepperoni and Cheese',
        price: '£5.50',
        description: '',
        ...img(),
      },
      {
        name: 'Palyanyzza with Chicken, Cheese, Sweet Corn',
        price: '£6.20',
        description: '',
        ...img(),
      },
      {
        name: 'Palyanyzza with 3 Cheese and Herbs',
        price: '£4.80',
        description: '',
        ...img(),
      },
    ],
  },
  {
    title: 'Side dishes',
    items: [
      { name: 'French fries', price: '£2.90', description: '', ...img() },
      { name: 'Mashed Potatoes', price: '£2.90', description: '', ...img() },
      { name: 'Rice', price: '£2.90', description: '', ...img() },
    ],
  },
  {
    title: 'Eggs Benedict',
    items: [
      {
        name: 'Eggs Benedict with Crispy Parma Ham',
        price: '£6.20',
        description: '',
        ...img(),
      },
      {
        name: 'Eggs Benedict with Smoked Salmon',
        price: '£7.50',
        description: '',
        ...img(),
      },
      {
        name: 'Eggs Benedict with Mushrooms and Spinach',
        price: '£5.50',
        description: '',
        ...img(),
      },
    ],
  },
  {
    title: 'Sweet varenyky',
    items: [
      {
        name: 'Dumpling - Varenyky with Strawberries',
        price: '£6.10',
        description: 'Dumplings served with sour cream.',
        ...img(),
      },
      {
        name: 'Dumpling - Varenyky with Cottage Cheese',
        price: '£6.10',
        description: 'Dumplings served with sour cream.',
        ...img(),
      },
    ],
  },
  {
    title: 'Desserts',
    items: [
      { name: 'Cake of Day', price: '£3.50', description: 'Ask your server for today\'s choice.', ...img() },
      {
        name: 'Syrniki (Cheese Pancake)',
        price: '£5.10',
        description: 'Three pieces. Served with sour cream.',
        ...img(),
      },
      {
        name: 'Pancakes with Cottage Cheese',
        price: '£4.90',
        description: 'Three pieces, cottage cheese and sour cream.',
        ...img(),
      },
      {
        name: 'Pancakes with Strawberry Jam',
        price: '£4.65',
        description: 'Three pieces and strawberry jam.',
        ...img(),
      },
      {
        name: 'Pancakes with Cherries Jam',
        price: '£4.65',
        description: 'Three pieces and cherries jam.',
        ...img(),
      },
    ],
  },
  {
    title: 'Cold drinks',
    items: [
      { name: 'Apple Juice', price: '£3.00', description: '1L', ...img() },
      { name: 'Orange Juice', price: '£3.00', description: '1L', ...img() },
      { name: 'Tomato Juice', price: '£3.00', description: '1L', ...img() },
      { name: 'Coca-Cola Original Taste', price: '£4.50', description: '1.5L', ...img() },
      { name: 'Sparkling Water', price: '£3.00', description: '1.5L', ...img() },
      { name: 'Still Water', price: '£1.50', description: '0.5L', ...img() },
      { name: 'Lemonade', price: '£2.50', description: '0.5L', ...img() },
    ],
  },
];

export const defaultMenuIntro =
  'Traditional Ukrainian home cooking in Twickenham. Dark bread, borsch, varenyky, and grills - cooked with heart.';

export const defaultSiteContent = {
  version: SITE_CONTENT_VERSION,
  workingHours: defaultWorkingHours,
  featuredMenu: defaultFeaturedMenu,
  fullMenu: defaultFullMenu,
  menuIntro: defaultMenuIntro,
};
