import banosh from '../assets/menu/Banosh.jpeg';
import borscht from '../assets/menu/Borscht with Salo & Sour Cream.jpeg';
import bukovynaLamb from '../assets/menu/Bukovyna-style Lamb.png';
import cheburaky from '../assets/menu/Cheburaky.jpeg';
import chickenKyiv from '../assets/menu/Chicken Kyiv.jpeg';
import cossackSkillet from '../assets/menu/Cossack Strength Skillet.jpeg';
import crepesCottageCheese from '../assets/menu/Crepes with Cottage Cheese.jpeg';
import crepesOrange from '../assets/menu/Crepes in Creamy Orange Sauce.jpeg';
import fullHouse from '../assets/menu/Full House.jpeg';
import mixedSolyanka from '../assets/menu/Mixed Meat Solyanka.jpeg';
import olivierSalad from '../assets/menu/Olivier Salad.png';
import partyPlatter from '../assets/menu/Party Platter for 6.jpeg';
import porkShashlik from '../assets/menu/Pork Shashlik.jpeg';
import potatoPancakes from '../assets/menu/Potato Pancakes, 5 pcs.png';
import seasonalOkroshka from '../assets/menu/Seasonal Traditional Okroshka.png';
import seasonalSoup from '../assets/menu/Seasonal Vegetable Cream Soup with Bruschetta.jpeg';
import stuffedCabbage from '../assets/menu/Stuffed Cabbage Rolls with Mushroom Sauce.png';
import syrnyky from '../assets/menu/Syrnyky (Cheese Pancakes).jpeg';
import galushkyClassic from '../assets/menu/Ukrainian Poltava Galushky.jpeg';
import galushkySeafood from '../assets/menu/Ukrainian Poltava Galushky.png';
import varenyky from '../assets/menu/Varenyky.jpeg';

/** Dish name → bundled photo (must match menu item `name` in siteDefaults). */
const menuDishImages = {
  Banosh: banosh,
  'Borscht with Salo & Sour Cream': borscht,
  'Bukovyna-style Lamb': bukovynaLamb,
  Cheburaky: cheburaky,
  'Chicken Kyiv': chickenKyiv,
  'Cossack Strength Skillet': cossackSkillet,
  'Crepes in Creamy Orange Sauce': crepesOrange,
  'Crepes with Cottage Cheese': crepesCottageCheese,
  'Full House': fullHouse,
  'Mixed Meat Solyanka': mixedSolyanka,
  'Olivier Salad': olivierSalad,
  'Party Platter for 6': partyPlatter,
  'Pancakes in Orange Sauce with Ice Cream': crepesOrange,
  'Pancakes with Cottage Cheese': crepesCottageCheese,
  'Potato Pancakes, 5 pcs': potatoPancakes,
  'Pork Shashlik': porkShashlik,
  'Seasonal Traditional Okroshka': seasonalOkroshka,
  'Seasonal Vegetable Cream Soup with Bruschetta': seasonalSoup,
  'Stuffed Cabbage Rolls with Mushroom Sauce': stuffedCabbage,
  'Syrnyky (Cheese Pancakes)': syrnyky,
  'Ukrainian Poltava Galushky': galushkyClassic,
  'Ukrainian Poltava Galushky With seafood': galushkySeafood,
  Varenyky: varenyky,
};

/** Two studio shots for the galushky menu row (fillings vary — photos show two popular styles). */
export const ukrainianGalushkyGallery = [
  { src: galushkyClassic, label: 'Traditional' },
  { src: galushkySeafood, label: 'With seafood' },
];

export default menuDishImages;
