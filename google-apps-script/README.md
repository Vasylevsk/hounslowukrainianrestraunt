# Prosperity table booking (Google Apps Script)

Stores reservations in Google Sheets and sends email to guests and admin. Works on static hosting (no backend server).

## 1. Create the spreadsheet

1. Create a new Google Sheet (or use an existing one).
2. Copy the spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

## 2. Add the script

1. Open [Google Apps Script](https://script.google.com) → **New project**.
2. Paste the contents of `Code.gs` into the editor.
3. **Project Settings** → note the project; optionally bind the script to your sheet: **Extensions → Apps Script** from the sheet menu and paste `Code.gs` there instead (then you can skip `SPREADSHEET_ID`).

## 3. Script properties

**Project Settings → Script properties** - add:

| Property | Example | Required |
|----------|---------|----------|
| `ADMIN_PASSWORD` | Same as `REACT_APP_ADMIN_PASSWORD` on the site | Yes |
| `ADMIN_EMAIL` | owner@restaurant.com | Yes (new booking alerts) |
| `SITE_URL` | `https://prosperityua.uk` | Yes (links in emails) |
| `SPREADSHEET_ID` | From step 1 | If script is not bound to a sheet |
| `FROM_NAME` | `Prosperity Ukrainian Restaurant` | Optional |
| `INSTAGRAM_URL` | `https://www.instagram.com/prosperity_restaurant/` | Optional (footer buttons in emails) |
| `PHONE_LABEL` | `020 4568 0606` | Optional (shown on Call button) |
| `PHONE_TEL` | `tel:+442045680606` | Optional (`href` for Call) |
| `CONTACT_EMAIL` | Public enquiries e.g. `hello@…` | Optional (hides Email button if empty) |

## 4. Authorize and test

1. Run `getSheet_` once from the editor (select function → Run) and approve Gmail + Sheets access.
2. A **Bookings** sheet tab will be created with headers (including **area**: Restaurant or Lounge).

If you already have a **Bookings** sheet from an older script: on **row 1**, columns must be exactly (A→M):  
`id | createdAt | name | email | phone | date | time | guests | message | status | token | adminNote | area`  
**`area` must be column M (13th), after `adminNote`.** Do not insert `area` in the middle - values will land in the wrong column. The script can fix the header row automatically; redeploy after updating `Code.gs`.

**Website:** the live site must include the “Dining area” dropdown (deploy latest `main` from Git). Old builds do not send `area` to Apps Script.

## 5. Deploy as web app

1. **Deploy → New deployment** → type **Web app**.
2. **Execute as:** Me  
3. **Who has access:** Anyone  
4. Deploy and copy the **Web app URL** (ends with `/exec`).

## 6. Connect the React site

In the project root, copy `.env.example` to `.env`:

```bash
REACT_APP_BOOKING_API_URL=https://script.google.com/macros/s/.../exec
REACT_APP_ADMIN_PASSWORD=same-as-ADMIN_PASSWORD
```

Rebuild and deploy the site. After changing the script, create a **new deployment version** so the `/exec` URL picks up changes.

## Flow

1. Guest submits the form → row with status `pending` → emails to guest + admin.
2. Admin clicks **Confirm** / **Decline** in email, or uses **Admin → Bookings**.
3. Guest receives confirmed or declined email; can check `/booking/status/:id`.

## API (POST JSON)

| action | Who | Body fields |
|--------|-----|-------------|
| `create` | Public | `name`, `email`, `phone`, `date`, `time`, `guests`, `message?` |
| `getStatus` | Public | `id` |
| `list` | Admin | `password` |
| `update` | Admin | `password`, `id`, `status` (`confirmed` \| `rejected`), `adminNote?` |

Email links use `doGet`: `?action=confirm&id=...&token=...` or `reject`.
