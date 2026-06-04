/** Replace typographic dashes with ASCII hyphen (site-wide copy). */
const DASH_RE = /\u2013|\u2014|\u2212|\u2010/g;

export function normalizeDashes(text) {
  if (typeof text !== 'string') return text;
  return text.replace(DASH_RE, '-');
}

export function normalizeDashesDeep(value) {
  if (typeof value === 'string') return normalizeDashes(value);
  if (Array.isArray(value)) return value.map(normalizeDashesDeep);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, normalizeDashesDeep(v)]));
  }
  return value;
}
