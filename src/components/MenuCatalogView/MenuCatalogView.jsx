import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import SubHeading from '../SubHeading/SubHeading';
import { images } from '../../constants';
import menuDishImages from '../../constants/menuImages';
import { formatPriceDisplay } from '../../utils/priceFormat';
import '../../pages/MenuPage.css';

function categoryId(prefix, index, title) {
  const slug = String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${prefix}-${index}-${slug || 'section'}`;
}

function readHeaderOffsetPx() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--site-header-height');
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 72;
}

const MenuCatalogView = ({
  subHeading,
  title,
  intro,
  badge,
  categories,
  navShortLabels = {},
  sectionIdPrefix = 'menu-cat',
  navAriaLabel = 'Menu categories',
  secondaryLink,
}) => {
  const navLabel = (label) => navShortLabels[label] || label;

  const categoryIds = useMemo(
    () => categories.map((cat, i) => categoryId(sectionIdPrefix, i, cat.title)),
    [categories, sectionIdPrefix]
  );

  const navRef = useRef(null);
  const chipRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const getScrollOffset = useCallback(() => {
    const header = readHeaderOffsetPx();
    const menuNav = navRef.current?.offsetHeight ?? 0;
    return header + menuNav + 12;
  }, []);

  useEffect(() => {
    const navbar = document.querySelector('.app__navbar');
    if (!navbar) return undefined;

    const syncHeaderHeight = () => {
      document.documentElement.style.setProperty('--site-header-height', `${navbar.offsetHeight}px`);
    };

    syncHeaderHeight();
    const headerObserver = new ResizeObserver(syncHeaderHeight);
    headerObserver.observe(navbar);

    return () => headerObserver.disconnect();
  }, []);

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return undefined;

    const syncNavHeight = () => {
      document.documentElement.style.setProperty('--menu-nav-height', `${navEl.offsetHeight}px`);
    };

    syncNavHeight();
    const navObserver = new ResizeObserver(syncNavHeight);
    navObserver.observe(navEl);

    return () => navObserver.disconnect();
  }, [categories]);

  const scrollToCategory = useCallback(
    (index) => {
      const el = document.getElementById(categoryIds[index]);
      if (!el) return;

      const top = el.getBoundingClientRect().top + window.scrollY - getScrollOffset();

      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      setActiveIndex(index);

      const chip = chipRefs.current[index];
      if (chip && typeof chip.scrollIntoView === 'function') {
        chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    },
    [categoryIds, getScrollOffset]
  );

  useEffect(() => {
    const sections = categoryIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const scrollOffset = () => getScrollOffset();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const id = visible[0].target.id;
        const idx = categoryIds.indexOf(id);
        if (idx >= 0) {
          setActiveIndex(idx);
          const chip = chipRefs.current[idx];
          if (chip && typeof chip.scrollIntoView === 'function') {
            chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
      },
      {
        rootMargin: `-${scrollOffset()}px 0px -55% 0px`,
        threshold: [0, 0.15, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categoryIds, getScrollOffset]);

  return (
    <div className="app__menu-page">
      <div className="app__menu-page_container app__bg section__padding">
        <div className="app__menu-page_content">
          <div className="app__menu-page_header">
            <SubHeading title={subHeading} />
            <h1 className="headtext__cormorant app__menu-page_h1">{title}</h1>
            {badge ? <p className="app__menu-page_badge">{badge}</p> : null}
            <img src={images.spoon} alt="" className="spoon__img app__menu-page_spoon" />
            <p className="p__opensans app__menu-page_intro">{intro}</p>
          </div>

          <nav ref={navRef} className="app__menu-nav" aria-label={navAriaLabel}>
            <p className="app__menu-nav-hint">Jump to section</p>
            <div className="app__menu-nav-scroll">
              {categories.map((category, categoryIndex) => (
                <button
                  key={categoryIds[categoryIndex]}
                  type="button"
                  ref={(el) => {
                    chipRefs.current[categoryIndex] = el;
                  }}
                  className={`app__menu-nav-chip ${activeIndex === categoryIndex ? 'app__menu-nav-chip--active' : ''}`}
                  onClick={() => scrollToCategory(categoryIndex)}
                  aria-current={activeIndex === categoryIndex ? 'true' : undefined}
                >
                  {navLabel(category.title)}
                </button>
              ))}
            </div>
          </nav>
          <div className="app__menu-nav-placeholder" aria-hidden="true" />

          <div className="app__menu-categories">
            {categories.map((category, categoryIndex) => (
              <section
                key={categoryIds[categoryIndex]}
                id={categoryIds[categoryIndex]}
                className="app__menu-category"
              >
                <div className="app__menu-category-head">
                  <h2 className="app__menu-category-title">{category.title}</h2>
                  <span className="app__menu-category-accent" aria-hidden />
                </div>

                <div className="app__menu-rows">
                  {category.items.map((item, itemIndex) => {
                    const gallery = Array.isArray(item.gallery) ? item.gallery.filter((p) => p?.src) : [];
                    const hasGallery = gallery.length > 0;
                    const resolvedImage = item.image || menuDishImages[item.name] || '';
                    const hasImage = Boolean(resolvedImage) || hasGallery;
                    const hasVariants = Array.isArray(item.variants) && item.variants.length > 0;
                    const showInlinePrice = item.price && !hasVariants;

                    return (
                      <article
                        key={`${item.name}-${itemIndex}`}
                        className={`app__menu-row ${itemIndex % 2 === 1 ? 'app__menu-row--reverse' : ''}`}
                      >
                        <div className="app__menu-row-text">
                          <div className="app__menu-item-head">
                            <h3 className="app__menu-item-name">{item.name}</h3>
                            {showInlinePrice ? (
                              <p className="app__menu-item-price app__menu-item-price--head">
                                {formatPriceDisplay(item.price)}
                              </p>
                            ) : null}
                          </div>
                          {item.description ? (
                            <p className="app__menu-item-description">{item.description}</p>
                          ) : null}
                          {hasVariants ? (
                            <ul className="app__menu-item-variants">
                              {item.variants.map((variant, vi) => (
                                <li key={vi} className="app__menu-item-variant">
                                  <span className="app__menu-item-variant-name">{variant.name}</span>
                                  <span className="app__menu-item-variant-price">
                                    {formatPriceDisplay(variant.price)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : item.price && !showInlinePrice ? (
                            <p
                              className={`app__menu-item-price ${
                                showInlinePrice ? 'app__menu-item-price--below' : ''
                              }`}
                            >
                              {formatPriceDisplay(item.price)}
                            </p>
                          ) : null}
                        </div>
                        {hasGallery ? (
                          <div
                            className={`app__menu-row-visual app__menu-row-visual--gallery${
                              gallery.length > 1 ? ' app__menu-row-visual--gallery-duo' : ''
                            }`}
                          >
                            {gallery.map((photo, photoIndex) => (
                              <figure key={photo.label || photoIndex} className="app__menu-row-photo">
                                <img
                                  src={photo.src}
                                  alt={photo.label ? `${item.name} — ${photo.label}` : item.name}
                                  className="app__menu-row-img"
                                  loading="lazy"
                                />
                                {photo.label ? <figcaption className="app__menu-row-photo-label">{photo.label}</figcaption> : null}
                              </figure>
                            ))}
                          </div>
                        ) : hasImage ? (
                          <div className="app__menu-row-visual">
                            <img src={resolvedImage} alt={item.name} className="app__menu-row-img" loading="lazy" />
                          </div>
                        ) : (
                          <div className="app__menu-row-visual app__menu-row-visual--empty" aria-hidden>
                            <span className="app__menu-row-placeholder-inner" />
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="app__menu-page_actions">
            <div className="app__menu-page_buttons">
              <Link to="/booking" className="custom__button app__menu-button">
                Book a Table
              </Link>
              {secondaryLink ? (
                <Link
                  to={secondaryLink.to}
                  className="custom__button app__menu-button app__menu-button--secondary"
                >
                  {secondaryLink.label}
                </Link>
              ) : null}
            </div>
            <Link to="/" className="app__menu-link">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCatalogView;
