import React, { useMemo } from 'react';

import MenuCatalogView from '../components/MenuCatalogView/MenuCatalogView';
import { defaultDrinksMenu, sortDrinksCategories } from '../constants/drinksMenu';
import { defaultBreakfastMenu, sortBreakfastCategories, sortMenuCategories } from '../constants/siteDefaults';
import { useSiteContent } from '../context/SiteContentContext';

const MENU_NAV_LABELS = {
  'Dumplings & Pancakes': 'Dumplings',
  'Main Courses': 'Mains',
};

const DRINKS_NAV_LABELS = {
  'Mykulyn Draught Beer': 'Draught',
  'Horilka - Vodka': 'Horilka',
  'Coffee & Hot Chocolate': 'Coffee',
  'Sparkling Wine': 'Sparkling',
};

const BREAKFAST_NAV_LABELS = {
  'House Breakfasts': 'Plates',
  'Skillets & Eggs': 'Skillets',
  'Pancakes / Benderyky': 'Pancakes',
  'Burgers & More': 'Burgers',
};

const MenuPage = () => {
  const { content } = useSiteContent();
  const menuCategories = useMemo(() => sortMenuCategories(content.fullMenu), [content.fullMenu]);
  const drinksCategories = useMemo(() => {
    const source =
      Array.isArray(content.drinksMenu) && content.drinksMenu.length > 0
        ? content.drinksMenu
        : defaultDrinksMenu;
    return sortDrinksCategories(source);
  }, [content.drinksMenu]);
  const breakfastCategories = useMemo(() => {
    const source =
      Array.isArray(content.breakfastMenu) && content.breakfastMenu.length > 0
        ? content.breakfastMenu
        : defaultBreakfastMenu;
    return sortBreakfastCategories(source);
  }, [content.breakfastMenu]);

  return (
    <MenuCatalogView
      subHeading="Menu"
      categories={menuCategories}
      navShortLabels={MENU_NAV_LABELS}
      drinksCategories={drinksCategories}
      drinksNavShortLabels={DRINKS_NAV_LABELS}
      breakfastCategories={breakfastCategories}
      breakfastNavShortLabels={BREAKFAST_NAV_LABELS}
      breakfastBadge={content.breakfastBadge || 'Until 4:00 PM'}
      sectionIdPrefix="menu-cat"
      drinksSectionIdPrefix="menu-drink"
      breakfastSectionIdPrefix="breakfast-cat"
      navAriaLabel="Menu sections"
    />
  );
};

export default MenuPage;
