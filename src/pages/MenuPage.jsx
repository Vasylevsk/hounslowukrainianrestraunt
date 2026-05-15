import React, { useMemo } from 'react';

import MenuCatalogView from '../components/MenuCatalogView/MenuCatalogView';
import { sortMenuCategories } from '../constants/siteDefaults';
import { useSiteContent } from '../context/SiteContentContext';

const MENU_NAV_LABELS = {
  'Dumplings & Pancakes': 'Dumplings',
  'Main Courses': 'Mains',
};

const MenuPage = () => {
  const { content } = useSiteContent();
  const menuCategories = useMemo(() => sortMenuCategories(content.fullMenu), [content.fullMenu]);

  return (
    <MenuCatalogView
      subHeading="Menu"
      title="Our Menu"
      intro={content.menuIntro}
      categories={menuCategories}
      navShortLabels={MENU_NAV_LABELS}
      sectionIdPrefix="menu-cat"
      navAriaLabel="Menu categories"
      secondaryLink={{ to: '/breakfast', label: 'View Breakfast Menu' }}
    />
  );
};

export default MenuPage;
