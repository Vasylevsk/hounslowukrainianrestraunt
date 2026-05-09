import React from 'react';
import { Link } from 'react-router-dom';

import { SubHeading } from '../components';
import { images } from '../constants';
import { useSiteContent } from '../context/SiteContentContext';
import { formatPriceDisplay } from '../utils/priceFormat';
import './MenuPage.css';

const MenuPage = () => {
  const { content } = useSiteContent();
  const menuCategories = content.fullMenu;
  const menuIntro = content.menuIntro;

  return (
    <div className="app__menu-page">
      <div className="app__menu-page_container app__bg section__padding">
        <div className="app__menu-page_content">
          <div className="app__menu-page_header">
            <SubHeading title="Menu" />
            <h1 className="headtext__cormorant app__menu-page_h1">Our Menu</h1>
            <img src={images.spoon} alt="" className="spoon__img app__menu-page_spoon" />
            <p className="p__opensans app__menu-page_intro">{menuIntro}</p>
          </div>

          <div className="app__menu-categories">
            {menuCategories.map((category, categoryIndex) => (
              <section key={categoryIndex} className="app__menu-category">
                <div className="app__menu-category-head">
                  <h2 className="app__menu-category-title">{category.title}</h2>
                  <span className="app__menu-category-accent" aria-hidden />
                </div>

                <div className="app__menu-rows">
                  {category.items.map((item, itemIndex) => (
                    <article
                      key={`${item.name}-${itemIndex}`}
                      className={`app__menu-row ${itemIndex % 2 === 1 ? 'app__menu-row--reverse' : ''}`}
                    >
                      <div className="app__menu-row-text">
                        <h3 className="app__menu-item-name">{item.name}</h3>
                        {item.description ? <p className="app__menu-item-description">{item.description}</p> : null}
                        <p className="app__menu-item-price">{formatPriceDisplay(item.price)}</p>
                      </div>
                      <div className="app__menu-row-visual">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="app__menu-row-img" loading="lazy" />
                        ) : (
                          <div className="app__menu-row-placeholder" aria-hidden>
                            <span className="app__menu-row-placeholder-inner" />
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="app__menu-page_actions">
            <Link to="/booking" className="custom__button app__menu-button">
              Book a Table
            </Link>
            <Link to="/" className="app__menu-link">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
