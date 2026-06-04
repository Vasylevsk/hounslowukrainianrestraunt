import React from 'react';

import { formatPriceDisplay } from '../../utils/priceFormat';

export function drinksCategoryId(prefix, index, title) {
  const slug = String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${prefix}-${index}-${slug || 'section'}`;
}

const DrinksCategoryList = ({ categories, sectionIdPrefix = 'menu-drink' }) => (
  <>
    {categories.map((category, categoryIndex) => {
      const columns = Array.isArray(category.columns) ? category.columns : null;
      const useColumns = columns?.length > 0;
      const sectionId = drinksCategoryId(sectionIdPrefix, categoryIndex, category.title);

      return (
        <section
          key={sectionId}
          id={sectionId}
          className="app__menu-category app__menu-category--drinks"
        >
          <div className="app__menu-category-head">
            <h2 className="app__menu-category-title">{category.title}</h2>
            <span className="app__menu-category-accent" aria-hidden />
          </div>

          <div
            className="app__menu-rows app__menu-rows--drinks"
            style={useColumns ? { '--drinks-cols': columns.length } : undefined}
          >
            {useColumns ? (
              <>
                <div className="app__drinks-table-head" aria-hidden="true">
                  <span className="app__drinks-table-head__item">Item</span>
                  {columns.map((col) => (
                    <span key={col} className="app__drinks-table-head__col">
                      {col}
                    </span>
                  ))}
                </div>
                {category.items.map((item, itemIndex) => (
                  <article key={`${item.name}-${itemIndex}`} className="app__drinks-table-row">
                    <div className="app__drinks-table-row__item">
                      <h3 className="app__menu-item-name">{item.name}</h3>
                      {item.detail ? (
                        <p className="app__menu-item-description">{item.detail}</p>
                      ) : null}
                    </div>
                    {columns.map((col, ci) => (
                      <span key={col} className="app__drinks-table-row__price">
                        <span className="app__drinks-table-row__price-label">{col}</span>
                        <span className="app__menu-item-price">
                          {formatPriceDisplay(item.prices?.[ci] ?? '')}
                        </span>
                      </span>
                    ))}
                  </article>
                ))}
              </>
            ) : (
              category.items.map((item, itemIndex) => (
                <article key={`${item.name}-${itemIndex}`} className="app__menu-row app__menu-row--drink">
                  <div className="app__menu-row-text">
                    <div className="app__menu-item-head">
                      <h3 className="app__menu-item-name">{item.name}</h3>
                      <p className="app__menu-item-price app__menu-item-price--head">
                        {formatPriceDisplay(item.price)}
                      </p>
                    </div>
                    {item.detail ? (
                      <p className="app__menu-item-description">{item.detail}</p>
                    ) : null}
                    <p className="app__menu-item-price app__menu-item-price--below">
                      {formatPriceDisplay(item.price)}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      );
    })}
  </>
);

export default DrinksCategoryList;
