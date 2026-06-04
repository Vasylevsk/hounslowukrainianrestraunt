import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import DrinksCategoryList, { drinksCategoryId } from '../DrinksCategoryList/DrinksCategoryList';
import SubHeading from '../SubHeading/SubHeading';
import menuDishImages from '../../constants/menuImages';
import { formatPriceDisplay } from '../../utils/priceFormat';
import { scrollMenuNavTabIntoView } from '../../utils/scrollMenuNavTab';
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

/** Defer ResizeObserver work to the next frame and skip no-op updates (avoids RO loop errors). */
function observeResize(element, onResize) {
  let rafId = null;
  let lastHeight = -1;

  const schedule = () => {
    if (rafId != null) return;
    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      const height = element.offsetHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      onResize(height);
    });
  };

  schedule();
  const observer = new ResizeObserver(schedule);
  observer.observe(element);
  return () => {
    if (rafId != null) window.cancelAnimationFrame(rafId);
    observer.disconnect();
  };
}

const MenuCatalogView = ({
  subHeading,
  title,
  intro,
  badge,
  categories,
  navShortLabels = {},
  drinksCategories = null,
  drinksNavShortLabels = {},
  drinksSectionIdPrefix = 'menu-drink',
  sectionIdPrefix = 'menu-cat',
  navAriaLabel = 'Menu sections',
  secondaryLink,
  footerLinks,
}) => {
  const location = useLocation();
  const hasDrinks = Array.isArray(drinksCategories) && drinksCategories.length > 0;
  const [menuZone, setMenuZone] = useState('food');

  const foodCategoryIds = useMemo(
    () => categories.map((cat, i) => categoryId(sectionIdPrefix, i, cat.title)),
    [categories, sectionIdPrefix]
  );

  const drinksCategoryIds = useMemo(
    () =>
      hasDrinks
        ? drinksCategories.map((cat, i) => drinksCategoryId(drinksSectionIdPrefix, i, cat.title))
        : [],
    [drinksCategories, drinksSectionIdPrefix, hasDrinks]
  );

  const zoneCategories = menuZone === 'food' ? categories : drinksCategories;
  const zoneCategoryIds = menuZone === 'food' ? foodCategoryIds : drinksCategoryIds;
  const zoneNavLabels = menuZone === 'food' ? navShortLabels : drinksNavShortLabels;

  const navPinRef = useRef(null);
  const navAnchorRef = useRef(null);
  const isNavFixedRef = useRef(false);
  const chipRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [anchorHeight, setAnchorHeight] = useState(0);

  const getScrollOffset = useCallback(() => {
    const header = readHeaderOffsetPx();
    const menuNav = navPinRef.current?.offsetHeight ?? 0;
    return header + menuNav + 8;
  }, []);

  useEffect(() => {
    const nav = navPinRef.current;
    const anchor = navAnchorRef.current;
    const navbar = document.querySelector('.app__navbar');
    if (!nav || !anchor || !navbar) return undefined;

    let ticking = false;

    const updateLayout = () => {
      ticking = false;

      const headerBottom = Math.round(navbar.getBoundingClientRect().bottom);
      if (headerBottom > 0) {
        document.documentElement.style.setProperty('--site-header-height', `${headerBottom}px`);
      }

      const shouldFix = anchor.getBoundingClientRect().top <= headerBottom + 1;

      if (shouldFix !== isNavFixedRef.current) {
        if (shouldFix) {
          setAnchorHeight(nav.offsetHeight);
        }
        isNavFixedRef.current = shouldFix;
        setIsNavFixed(shouldFix);
      } else if (shouldFix) {
        setAnchorHeight((prev) => {
          const next = nav.offsetHeight;
          return prev === next ? prev : next;
        });
      }
    };

    const scheduleUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateLayout);
    };

    updateLayout();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    const ro = new ResizeObserver(scheduleUpdate);
    ro.observe(navbar);
    ro.observe(nav);
    ro.observe(anchor);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      ro.disconnect();
    };
  }, [zoneCategories, menuZone, hasDrinks]);

  useEffect(() => {
    const navEl = navPinRef.current;
    if (!navEl) return undefined;

    return observeResize(navEl, (height) => {
      document.documentElement.style.setProperty('--menu-nav-height', `${height}px`);
    });
  }, [zoneCategories, menuZone, hasDrinks]);

  useEffect(() => {
    if (!hasDrinks) return;
    const hash = location.hash.replace('#', '');
    if (hash === 'menu-bar' || hash.startsWith('menu-drink')) {
      setMenuZone('drinks');
    }
  }, [hasDrinks, location.hash]);

  const scrollToSectionId = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const top = el.getBoundingClientRect().top + window.scrollY - getScrollOffset();
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    },
    [getScrollOffset]
  );

  const scrollToCategory = useCallback(
    (index) => {
      const id = zoneCategoryIds[index];
      if (!id) return;
      scrollToSectionId(id);
      setActiveIndex(index);
    },
    [zoneCategoryIds, scrollToSectionId]
  );

  const switchMenuZone = useCallback((zone) => {
    setMenuZone(zone);
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
    chipRefs.current = [];
  }, [menuZone]);

  useEffect(() => {
    scrollMenuNavTabIntoView(chipRefs.current[activeIndex]);
  }, [activeIndex, menuZone]);

  useEffect(() => {
    const sections = zoneCategoryIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const idx = zoneCategoryIds.indexOf(visible[0].target.id);
        if (idx >= 0) setActiveIndex(idx);
      },
      {
        rootMargin: `-${getScrollOffset()}px 0px -55% 0px`,
        threshold: [0, 0.15, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [zoneCategoryIds, getScrollOffset, menuZone]);

  const actionLinks =
    footerLinks?.length > 0
      ? footerLinks
      : secondaryLink
        ? [{ ...secondaryLink, variant: 'secondary' }]
        : [];

  return (
    <div className="app__menu-page">
      <div className="app__menu-page_container app__bg section__padding">
        <div className="app__menu-page_content">
          <header className="app__menu-page_header">
            <SubHeading title={subHeading} />
            <h1 className="headtext__cormorant app__menu-page_h1">{title}</h1>
            {badge ? <p className="app__menu-page_badge">{badge}</p> : null}
            {!hasDrinks && intro ? <p className="p__opensans app__menu-page_intro">{intro}</p> : null}
          </header>

          {hasDrinks ? (
            <div
              id="menu-bar"
              className="app__menu-zone-toggle app__menu-zone-toggle--bar"
              role="tablist"
              aria-label="Food or drinks menu"
            >
              <button
                type="button"
                role="tab"
                aria-selected={menuZone === 'food'}
                className={`app__menu-zone-toggle__btn${
                  menuZone === 'food' ? ' app__menu-zone-toggle__btn--active' : ''
                }`}
                onClick={() => switchMenuZone('food')}
              >
                Food
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={menuZone === 'drinks'}
                className={`app__menu-zone-toggle__btn${
                  menuZone === 'drinks' ? ' app__menu-zone-toggle__btn--active' : ''
                }`}
                onClick={() => switchMenuZone('drinks')}
              >
                Drinks
              </button>
            </div>
          ) : null}

          <div
            ref={navAnchorRef}
            className="app__menu-nav-anchor"
            style={isNavFixed && anchorHeight > 0 ? { height: anchorHeight } : undefined}
          >
            <nav
              ref={navPinRef}
              className={`app__menu-nav${isNavFixed ? ' app__menu-nav--fixed' : ''}`}
              aria-label={navAriaLabel}
            >
              <div className="app__menu-nav-inner">
                <div className="app__menu-nav-scroll">
                  {zoneCategories.map((category, categoryIndex) => (
                    <button
                      key={zoneCategoryIds[categoryIndex]}
                      type="button"
                      ref={(el) => {
                        chipRefs.current[categoryIndex] = el;
                      }}
                      className={`app__menu-nav-chip ${
                        activeIndex === categoryIndex ? 'app__menu-nav-chip--active' : ''
                      }`}
                      onClick={() => scrollToCategory(categoryIndex)}
                      aria-current={activeIndex === categoryIndex ? 'true' : undefined}
                    >
                      {zoneNavLabels[category.title] || category.title}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          <div className={`app__menu-zone-panel${menuZone === 'food' ? '' : ' app__menu-zone-panel--hidden'}`}>
            <div className="app__menu-categories">
              {categories.map((category, categoryIndex) => (
                <section
                  key={foodCategoryIds[categoryIndex]}
                  id={foodCategoryIds[categoryIndex]}
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
                      const hasPrice = Boolean(item.price && String(item.price).trim());

                      return (
                        <article
                          key={`${item.name}-${itemIndex}`}
                          className={`app__menu-row ${itemIndex % 2 === 1 ? 'app__menu-row--reverse' : ''}`}
                        >
                          <div className="app__menu-row-text">
                            <div className="app__menu-item-head">
                              <h3 className="app__menu-item-name">{item.name}</h3>
                              {hasPrice && !hasVariants ? (
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
                            ) : hasPrice ? (
                              <p className="app__menu-item-price app__menu-item-price--below">
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
                                    alt={photo.label ? `${item.name} - ${photo.label}` : item.name}
                                    className="app__menu-row-img"
                                    loading="lazy"
                                  />
                                  {photo.label ? (
                                    <figcaption className="app__menu-row-photo-label">{photo.label}</figcaption>
                                  ) : null}
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
          </div>

          {hasDrinks ? (
            <div
              className={`app__menu-zone-panel${
                menuZone === 'drinks' ? '' : ' app__menu-zone-panel--hidden'
              }`}
            >
              <DrinksCategoryList categories={drinksCategories} sectionIdPrefix={drinksSectionIdPrefix} />
            </div>
          ) : null}

          <footer className="app__menu-page_actions">
            <div className="app__menu-page_buttons">
              <Link to="/booking" className="custom__button app__menu-button">
                Book a Table
              </Link>
              {actionLinks.map((link) => (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  className={`custom__button app__menu-button${
                    link.variant === 'secondary' ? ' app__menu-button--secondary' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link to="/" className="app__menu-link">
              Back to Home
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MenuCatalogView;
