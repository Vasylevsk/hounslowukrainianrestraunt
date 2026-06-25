import React from 'react';
import { Link } from 'react-router-dom';

import { SubHeading, MenuItem } from '../../components';
import { images } from '../../constants';
import { useSiteContent } from '../../context/SiteContentContext';
import './SpecialMenu.css';

const SpecialMenu = () => {
  const { content } = useSiteContent();
  const { sectionTitle, leftTitle, rightTitle, leftItems, rightItems } =
    content.featuredMenu;

  return (
    <div className="app__specialMenu flex__center section__padding" id="menu">
      <div className="app__specialMenu-title">
        <SubHeading title="Menu" />
        <h1 className="headtext__cormorant app__specialMenu-heading">
          {sectionTitle || 'Prosperity Classics'}
        </h1>
      </div>

      <div className="app__specialMenu-menu">
        <div className="app__specialMenu-menu_wine flex__center">
          <p className="app__specialMenu-menu_heading">{leftTitle}</p>
          <div className="app__specialMenu_menu_items">
            {leftItems.map((wine, index) => (
              <MenuItem key={wine.title + index} title={wine.title} price={wine.price} tags={wine.tags} />
            ))}
          </div>
        </div>

        <div className="app__specialMenu-menu_img">
          <img src={images.menu} alt="Prosperity Ukrainian Restaurant menu" />
        </div>

        <div className="app__specialMenu-menu_cocktails flex__center">
          <p className="app__specialMenu-menu_heading">{rightTitle}</p>
          <div className="app__specialMenu_menu_items">
            {rightItems.map((cocktail, index) => (
              <MenuItem
                key={cocktail.title + index}
                title={cocktail.title}
                price={cocktail.price}
                tags={cocktail.tags}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="app__specialMenu-cta">
        <Link to="/menu" className="custom__button app__specialMenu-cta-btn">
          View Full Menu
        </Link>
      </div>
    </div>
  );
};

export default SpecialMenu;
