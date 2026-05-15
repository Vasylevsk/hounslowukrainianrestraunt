import React, { useMemo } from 'react';

import MenuCatalogView from '../components/MenuCatalogView/MenuCatalogView';
import { defaultBreakfastMenu, sortBreakfastCategories } from '../constants/siteDefaults';
import { useSiteContent } from '../context/SiteContentContext';

const BREAKFAST_NAV_LABELS = {
  'House Breakfasts': 'Plates',
  'Skillets & Eggs': 'Skillets',
  'Pancakes / Benderyky': 'Pancakes',
  'Burgers & More': 'Burgers',
};

const BreakfastPage = () => {
  const { content } = useSiteContent();
  const categories = useMemo(() => {
    const source =
      Array.isArray(content.breakfastMenu) && content.breakfastMenu.length > 0
        ? content.breakfastMenu
        : defaultBreakfastMenu;
    return sortBreakfastCategories(source);
  }, [content.breakfastMenu]);

  return (
    <MenuCatalogView
      subHeading="Breakfast"
      title="Breakfast Menu"
      badge={content.breakfastBadge || 'Until 4:00 PM'}
      intro={content.breakfastIntro}
      categories={categories}
      navShortLabels={BREAKFAST_NAV_LABELS}
      sectionIdPrefix="breakfast-cat"
      navAriaLabel="Breakfast menu sections"
      secondaryLink={{ to: '/menu', label: 'View Full Menu' }}
    />
  );
};

export default BreakfastPage;
