import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { defaultSiteContent, SITE_CONTENT_VERSION } from '../constants/siteDefaults';
import { normalizeDashesDeep } from '../utils/normalizeText';

const STORAGE_KEY = 'prosperity_site_content_v2';

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function withNormalizedCopy(content) {
  return normalizeDashesDeep(clone(content));
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return withNormalizedCopy(defaultSiteContent);
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== SITE_CONTENT_VERSION) return withNormalizedCopy(defaultSiteContent);
    if (!Array.isArray(parsed.workingHours) || !parsed.featuredMenu || !Array.isArray(parsed.fullMenu)) {
      return withNormalizedCopy(defaultSiteContent);
    }
    return normalizeDashesDeep({
      ...clone(defaultSiteContent),
      ...parsed,
      workingHours: parsed.workingHours,
      featuredMenu: {
        ...defaultSiteContent.featuredMenu,
        ...parsed.featuredMenu,
        sectionSubTitle:
          parsed.featuredMenu.sectionSubTitle || defaultSiteContent.featuredMenu.sectionSubTitle,
        sectionTitle: parsed.featuredMenu.sectionTitle || defaultSiteContent.featuredMenu.sectionTitle,
        leftTitle: parsed.featuredMenu.leftTitle || defaultSiteContent.featuredMenu.leftTitle,
        rightTitle: parsed.featuredMenu.rightTitle || defaultSiteContent.featuredMenu.rightTitle,
        leftItems: parsed.featuredMenu.leftItems || defaultSiteContent.featuredMenu.leftItems,
        rightItems: parsed.featuredMenu.rightItems || defaultSiteContent.featuredMenu.rightItems,
      },
      fullMenu: parsed.fullMenu,
      menuIntro: typeof parsed.menuIntro === 'string' ? parsed.menuIntro : defaultSiteContent.menuIntro,
      breakfastMenu: Array.isArray(parsed.breakfastMenu) ? parsed.breakfastMenu : defaultSiteContent.breakfastMenu,
      breakfastIntro:
        typeof parsed.breakfastIntro === 'string' ? parsed.breakfastIntro : defaultSiteContent.breakfastIntro,
      breakfastBadge:
        typeof parsed.breakfastBadge === 'string' ? parsed.breakfastBadge : defaultSiteContent.breakfastBadge,
      drinksMenu: Array.isArray(parsed.drinksMenu) ? parsed.drinksMenu : defaultSiteContent.drinksMenu,
      drinksIntro: typeof parsed.drinksIntro === 'string' ? parsed.drinksIntro : defaultSiteContent.drinksIntro,
    });
  } catch {
    return withNormalizedCopy(defaultSiteContent);
  }
}

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => loadFromStorage());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {
      /* ignore quota */
    }
  }, [content]);

  const patchContent = useCallback((partial) => {
    setContent((prev) => normalizeDashesDeep({ ...prev, ...partial }));
  }, []);

  const resetContent = useCallback(() => {
    setContent(withNormalizedCopy(defaultSiteContent));
  }, []);

  const replaceContent = useCallback((next) => {
    setContent(
      normalizeDashesDeep({
        ...clone(defaultSiteContent),
        ...next,
        version: SITE_CONTENT_VERSION,
      })
    );
  }, []);

  const value = useMemo(
    () => ({
      content,
      patchContent,
      resetContent,
      replaceContent,
    }),
    [content, patchContent, resetContent, replaceContent]
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent must be used within SiteContentProvider');
  }
  return ctx;
}
