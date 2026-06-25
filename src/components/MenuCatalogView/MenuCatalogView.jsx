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

function MenuFoodCategories({ categories, categoryIds }) {
  return (
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
  );
}

const MenuCatalogView = ({
  subHeading,
  title = null,
  intro,
  badge,
  categories,
  navShortLabels = {},
  drinksCategories = null,
  drinksNavShortLabels = {},
  drinksSectionIdPrefix = 'menu-drink',
  breakfastCategories = null,
  breakfastNavShortLabels = {},
  breakfastSectionIdPrefix = 'breakfast-cat',
  breakfastBadge = null,
  sectionIdPrefix = 'menu-cat',
  navAriaLabel = 'Menu sections',
  secondaryLink,
  footerLinks,
}) => {
  const location = useLocation();
  const hasDrinks = Array.isArray(drinksCategories) && drinksCategories.length > 0;
  const hasBreakfast = Array.isArray(breakfastCategories) && breakfastCategories.length > 0;
  const showZoneToggle = hasDrinks || hasBreakfast;
  const [menuZone, setMenuZone] = useState(() => {
    if (typeof window === 'undefined') return 'food';
    const hash = window.location.hash.replace('#', '');
    if (hash === 'menu-bar' || hash.startsWith('menu-drink')) return 'drinks';
    if (hash === 'breakfast' || hash.startsWith('breakfast-cat')) return 'breakfast';
    return 'food';
  });

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

  const breakfastCategoryIds = useMemo(
    () =>
      hasBreakfast
        ? breakfastCategories.map((cat, i) => categoryId(breakfastSectionIdPrefix, i, cat.title))
        : [],
    [breakfastCategories, breakfastSectionIdPrefix, hasBreakfast]
  );

  const zoneCategories = useMemo(() => {
    if (menuZone === 'drinks') return drinksCategories || [];
    if (menuZone === 'breakfast') return breakfastCategories || [];
    return categories;
  }, [menuZone, categories, drinksCategories, breakfastCategories]);

  const zoneCategoryIds = useMemo(() => {
    if (menuZone === 'drinks') return drinksCategoryIds;
    if (menuZone === 'breakfast') return breakfastCategoryIds;
    return foodCategoryIds;
  }, [menuZone, foodCategoryIds, drinksCategoryIds, breakfastCategoryIds]);

  const zoneNavLabels = useMemo(() => {
    if (menuZone === 'drinks') return drinksNavShortLabels;
    if (menuZone === 'breakfast') return breakfastNavShortLabels;
    return navShortLabels;
  }, [menuZone, navShortLabels, drinksNavShortLabels, breakfastNavShortLabels]);

  const navPinRef = useRef(null);
  const navAnchorRef = useRef(null);
  const chipRefs = useRef([]);
  const scrollLockRef = useRef(false);
  const scrollUnlockTimerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const lockScrollSpy = useCallback((ms = 750) => {
    scrollLockRef.current = true;
    if (scrollUnlockTimerRef.current) {
      window.clearTimeout(scrollUnlockTimerRef.current);
    }
    scrollUnlockTimerRef.current = window.setTimeout(() => {
      scrollLockRef.current = false;
      scrollUnlockTimerRef.current = null;
    }, ms);
  }, []);

  const getScrollOffset = useCallback(() => {
    const header = readHeaderOffsetPx();
    const menuNav = navPinRef.current?.offsetHeight ?? 0;
    return header + menuNav + 12;
  }, []);

  useEffect(() => {
    const navbar = document.querySelector('.app__navbar');
    if (!navbar) return undefined;

    const syncHeader = () => {
      const headerBottom = Math.round(navbar.getBoundingClientRect().bottom);
      if (headerBottom > 0) {
        document.documentElement.style.setProperty('--site-header-height', `${headerBottom}px`);
      }
    };

    syncHeader();
    const ro = new ResizeObserver(() => {
      window.requestAnimationFrame(syncHeader);
    });
    ro.observe(navbar);
    window.addEventListener('resize', syncHeader);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', syncHeader);
    };
  }, []);

  useEffect(() => {
    const navEl = navPinRef.current;
    if (!navEl) return undefined;

    return observeResize(navEl, (height) => {
      document.documentElement.style.setProperty('--menu-nav-height', `${height}px`);
    });
  }, [zoneCategories, menuZone, hasDrinks, hasBreakfast]);

  useEffect(() => {
    if (!showZoneToggle) return;
    const hash = location.hash.replace('#', '');
    if (hasDrinks && (hash === 'menu-bar' || hash.startsWith('menu-drink'))) {
      setMenuZone('drinks');
    } else if (hasBreakfast && (hash === 'breakfast' || hash.startsWith('breakfast-cat'))) {
      setMenuZone('breakfast');
    } else if (hash === 'food') {
      setMenuZone('food');
    }
  }, [showZoneToggle, location.hash, hasDrinks, hasBreakfast]);

  const scrollToSectionId = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;

      lockScrollSpy(900);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [lockScrollSpy]
  );

  const scrollToCategory = useCallback(
    (index) => {
      const id = zoneCategoryIds[index];
      if (!id) return;
      setActiveIndex(index);
      scrollMenuNavTabIntoView(chipRefs.current[index]);
      scrollToSectionId(id);
    },
    [zoneCategoryIds, scrollToSectionId]
  );

  const switchMenuZone = useCallback(
    (zone) => {
      if (zone === menuZone) return;

      lockScrollSpy(600);
      setMenuZone(zone);
      setActiveIndex(0);
      chipRefs.current = [];

      window.requestAnimationFrame(() => {
        const anchor = navAnchorRef.current || document.getElementById('menu-bar');
        anchor?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    [lockScrollSpy, menuZone]
  );

  useEffect(() => {
    setActiveIndex(0);
    chipRefs.current = [];
  }, [menuZone]);

  useEffect(() => {
    const sections = zoneCategoryIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLockRef.current) return;

        const offset = getScrollOffset();
        let nextIndex = -1;
        let nearestTop = Infinity;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = zoneCategoryIds.indexOf(entry.target.id);
          if (idx < 0) return;

          const top = entry.boundingClientRect.top;
          const distance = Math.abs(top - offset);
          if (distance < nearestTop) {
            nearestTop = distance;
            nextIndex = idx;
          }
        });

        if (nextIndex >= 0) {
          setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
        }
      },
      {
        rootMargin: `-${getScrollOffset()}px 0px -55% 0px`,
        threshold: [0, 0.12, 0.3, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [zoneCategoryIds, getScrollOffset, menuZone]);

  useEffect(
    () => () => {
      if (scrollUnlockTimerRef.current) {
        window.clearTimeout(scrollUnlockTimerRef.current);
      }
    },
    []
  );

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
            {title ? <h1 className="headtext__cormorant app__menu-page_h1">{title}</h1> : null}
            {menuZone === 'breakfast' && breakfastBadge ? (
              <p className="app__menu-page_badge">{breakfastBadge}</p>
            ) : null}
            {badge && !showZoneToggle ? <p className="app__menu-page_badge">{badge}</p> : null}
            {!showZoneToggle && intro ? <p className="p__opensans app__menu-page_intro">{intro}</p> : null}
          </header>

          {showZoneToggle ? (
            <div
              id="menu-bar"
              className={`app__menu-zone-toggle app__menu-zone-toggle--bar${
                hasDrinks && hasBreakfast ? ' app__menu-zone-toggle--triple' : ''
              }`}
              role="tablist"
              aria-label="Food, drinks, or breakfast menu"
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
              {hasDrinks ? (
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
              ) : null}
              {hasBreakfast ? (
                <button
                  type="button"
                  role="tab"
                  aria-selected={menuZone === 'breakfast'}
                  className={`app__menu-zone-toggle__btn${
                    menuZone === 'breakfast' ? ' app__menu-zone-toggle__btn--active' : ''
                  }`}
                  onClick={() => switchMenuZone('breakfast')}
                >
                  Breakfast
                </button>
              ) : null}
            </div>
          ) : null}

          <div ref={navAnchorRef} className="app__menu-nav-anchor">
            <nav
              ref={navPinRef}
              className="app__menu-nav"
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
            <MenuFoodCategories categories={categories} categoryIds={foodCategoryIds} />
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

          {hasBreakfast ? (
            <div
              className={`app__menu-zone-panel${
                menuZone === 'breakfast' ? '' : ' app__menu-zone-panel--hidden'
              }`}
            >
              <MenuFoodCategories categories={breakfastCategories} categoryIds={breakfastCategoryIds} />
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
