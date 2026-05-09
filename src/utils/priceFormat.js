/** UK menu prices: store as "£12.50"; admin inputs digits only with visible £ prefix. */

export function stripPriceToNumericString(raw) {
  if (raw == null) return '';
  return String(raw)
    .replace(/£/g, '')
    .replace(/[^\d.]/g, '')
    .replace(/^\.+/, '')
    .replace(/(\..*)\./g, '$1');
}

/** Value for price <input> (no £ in the field). */
export function priceInputValue(stored) {
  return stripPriceToNumericString(stored);
}

/** Persisted price string from typed digits. */
export function priceFromInput(typed) {
  const n = stripPriceToNumericString(typed);
  return n ? `£${n}` : '';
}

/** Public display: ensure leading £ when value is numeric; keep free text (e.g. "MP") as-is. */
export function formatPriceDisplay(stored) {
  if (stored == null) return '';
  const s = String(stored).trim();
  if (s === '') return '';
  if (s.startsWith('£')) return s;
  const n = stripPriceToNumericString(s);
  if (n !== '' && n !== '.') return `£${n}`;
  return s;
}
