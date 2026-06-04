import React, { useMemo } from 'react';

import MenuCatalogView from '../components/MenuCatalogView/MenuCatalogView';
import { defaultDrinksMenu, sortDrinksCategories } from '../constants/drinksMenu';
import { sortMenuCategories } from '../constants/siteDefaults';
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

  return (
    <MenuCatalogView
      subHeading="Menu"
      title="Our Menu"
      categories={menuCategories}
      navShortLabels={MENU_NAV_LABELS}
      drinksCategories={drinksCategories}
      drinksNavShortLabels={DRINKS_NAV_LABELS}
      sectionIdPrefix="menu-cat"
      drinksSectionIdPrefix="menu-drink"
      navAriaLabel="Menu sections"
      footerLinks={[{ to: '/breakfast', label: 'Breakfast Menu', variant: 'secondary' }]}
    />
  );
};

export default MenuPage;
