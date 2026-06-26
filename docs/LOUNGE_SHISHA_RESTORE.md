# Lounge & Shisha — temporary removal (Google Ads)

**Disabled:** `LOUNGE_SHISHA_ENABLED = false` in `src/constants/features.js`

**To restore everything:** set `LOUNGE_SHISHA_ENABLED = true`, rebuild, deploy.

---

## What was hidden

### Homepage (`src/pages/Home.jsx`)
- Section **LoungePromo** after Banquet, before Chef
- Anchor: `id="lounge"` on section

### Navigation (`src/constants/navigation.js`)
- Link: **Lounge** → `#lounge` (between Banquet and Events)

### Lounge section content (`src/components/LoungePromo/LoungePromo.jsx`)
- **SubHeading:** Lounge
- **Title:** Premium Shisha
- **Lead:** Unwind after dinner in our lounge with premium shisha, a calm atmosphere, and attentive service.
- **Details:** Price £27 · Setting: Lounge area · Booking: Select Lounge
- **CTA:** Book the Lounge → `/booking`

### Inline card on booking (`variant="inline"`)
- **Title:** Shisha available
- **Text:** Premium shisha in our lounge. Ask when you book or speak to our team on arrival.
- **Price:** £27

### Booking page (`src/pages/BookingPage.jsx`)
- Inline LoungePromo card above the form

### Booking form (`src/components/BookingForm/BookingForm.jsx`)
- Dining area dropdown: **Restaurant** | **Lounge**
- Placeholders: "Restaurant or Lounge" / "Select Restaurant or Lounge"
- Inline LoungePromo when compact form + area = Lounge

### SEO (`src/constants/seo.js` — `/booking`)
- Was: `Reserve a table at … — restaurant or lounge. Shisha in the lounge £27. …`
- While disabled: restaurant-only copy (no lounge/shisha)

---

## Files kept (not deleted)

- `src/components/LoungePromo/LoungePromo.jsx`
- `src/components/LoungePromo/LoungePromo.css`
- Exported from `src/components/index.js`

---

## Google Apps Script

`google-apps-script/Code.gs` still accepts `area: Lounge` for old bookings. No change required unless you want to remove Lounge from the sheet validation later.

---

## History note

- Originally branded **Hookah**, renamed to **Shisha** across the site.
- Lounge section layout: centered copy, three detail cards, CTA button.
