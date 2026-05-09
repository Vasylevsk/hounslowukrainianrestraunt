import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { DEFAULT_DESCRIPTION, getSeoForPath, KEYWORDS, ORGANIZATION, SITE_NAME } from '../../constants/seo';

function setMeta(name, content, isProperty = false) {
  if (!content) return;
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function injectJsonLd(id, data) {
  const json = JSON.stringify(data);
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = json;
}

const SEO = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const origin = window.location.origin;
    const url = `${origin}${pathname === '/' ? '/' : pathname}`;
    const { title, description } = getSeoForPath(pathname);
    const desc = description || DEFAULT_DESCRIPTION;
    const imageUrl = `${origin}/favicon.webp`;

    document.title = title;

    setMeta('description', desc);
    setMeta('keywords', KEYWORDS);
    setMeta('author', SITE_NAME);
    setMeta('geo.region', 'GB-TWH');
    setMeta('geo.placename', 'Twickenham');
    setMeta('robots', isAdmin ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    setMeta('og:type', 'website', true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:title', title, true);
    setMeta('og:description', desc, true);
    setMeta('og:url', url, true);
    setMeta('og:locale', 'en_GB', true);
    setMeta('og:image', imageUrl, true);
    setMeta('og:image:alt', `${SITE_NAME} logo`, true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', imageUrl);

    setLink('canonical', url);

    if (!isAdmin) {
      injectJsonLd('seo-restaurant-jsonld', {
        '@context': 'https://schema.org',
        '@type': ['Restaurant', 'LocalBusiness'],
        '@id': `${origin}/#restaurant`,
        name: SITE_NAME,
        url: origin,
        image: [imageUrl],
        telephone: ORGANIZATION.telephone,
        servesCuisine: 'Ukrainian',
        priceRange: '££',
        address: {
          '@type': 'PostalAddress',
          streetAddress: ORGANIZATION.streetAddress,
          addressLocality: ORGANIZATION.addressLocality,
          postalCode: ORGANIZATION.postalCode,
          addressCountry: ORGANIZATION.addressCountry,
        },
      });

      injectJsonLd('seo-website-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: SITE_NAME,
        url: origin,
        publisher: { '@id': `${origin}/#restaurant` },
        inLanguage: 'en-GB',
      });
    } else {
      const r = document.getElementById('seo-restaurant-jsonld');
      const w = document.getElementById('seo-website-jsonld');
      if (r) r.remove();
      if (w) w.remove();
    }
  }, [pathname, isAdmin]);

  return null;
};

export default SEO;
