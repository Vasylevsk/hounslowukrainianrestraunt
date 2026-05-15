/**
 * Prosperity — table reservations API (Google Apps Script Web App)
 *
 * Setup: see google-apps-script/README.md
 * Script Properties: ADMIN_PASSWORD, ADMIN_EMAIL, SITE_URL, SPREADSHEET_ID (optional)
 */

var SHEET_NAME = 'Bookings';
var HEADERS = [
  'id',
  'createdAt',
  'name',
  'email',
  'phone',
  'date',
  'time',
  'guests',
  'message',
  'status',
  'token',
  'adminNote',
];

function prop_(key, fallback) {
  var v = PropertiesService.getScriptProperties().getProperty(key);
  return v && String(v).trim() ? String(v).trim() : fallback || '';
}

function jsonResponse_(obj, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
  return output;
}

function corsHeaders_() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function doOptions(e) {
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT);
}

function getSheet_() {
  var ss;
  var sheetId = prop_('SPREADSHEET_ID');
  if (sheetId) {
    ss = SpreadsheetApp.openById(sheetId);
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }
  if (!ss) {
    throw new Error('No spreadsheet. Set SPREADSHEET_ID or bind script to a sheet.');
  }
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function rowToBooking_(row, rowIndex) {
  var o = {};
  for (var i = 0; i < HEADERS.length; i++) {
    o[HEADERS[i]] = row[i] != null ? String(row[i]) : '';
  }
  o.rowIndex = rowIndex;
  delete o.token;
  return o;
}

function findRowById_(sheet, id) {
  var data = sheet.getDataRange().getValues();
  for (var r = 1; r < data.length; r++) {
    if (String(data[r][0]) === String(id)) {
      return { row: data[r], rowIndex: r + 1 };
    }
  }
  return null;
}

function generateId_() {
  return Utilities.getUuid().replace(/-/g, '').slice(0, 12);
}

function generateToken_() {
  return Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '').slice(0, 16);
}

function formatGuests_(n) {
  return n >= 7 ? '7+' : String(n);
}

function siteUrl_() {
  return prop_('SITE_URL', 'https://example.com').replace(/\/$/, '');
}

function webAppUrl_() {
  return ScriptApp.getService().getUrl();
}

function bookingFromRow_(row) {
  return {
    id: String(row[0]),
    name: String(row[2]),
    email: String(row[3]),
    phone: String(row[4]),
    date: String(row[5]),
    time: String(row[6]),
    guests: String(row[7]),
    message: String(row[8]),
    status: String(row[9]),
  };
}

/** Optional script properties: INSTAGRAM_URL, PHONE_LABEL, PHONE_TEL, CONTACT_EMAIL */
function contactFooterHtml_() {
  var site = siteUrl_();
  var ig = prop_('INSTAGRAM_URL', 'https://www.instagram.com/prosperity_restaurant/');
  var phoneLabel = prop_('PHONE_LABEL', '020 4568 0606');
  var phoneTel = prop_('PHONE_TEL', 'tel:+442045680606');
  var contactEmail = prop_('CONTACT_EMAIL', '');

  var btn =
    'display:inline-block;padding:12px 20px;margin:4px 6px 4px 0;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.02em;';
  var rowHtml =
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px auto 0;max-width:520px;">' +
    '<tr><td style="text-align:center;padding:8px 0;">';

  rowHtml +=
    '<a href="' +
    site +
    '/" style="' +
    btn +
    'background:#1a1a1a;color:#e8d5a3;border:1px solid #3d3528;">Website</a>';
  rowHtml +=
    '<a href="' +
    ig +
    '" style="' +
    btn +
    'background:linear-gradient(135deg,#833AB4,#E1306C,#F77737);color:#fff;border:none;">Instagram</a>';
  rowHtml +=
    '<a href="' +
    phoneTel +
    '" style="' +
    btn +
    'background:#2d6a3e;color:#fff;border:none;">' +
    escapeHtml_(phoneLabel) +
    '</a>';
  if (contactEmail) {
    rowHtml +=
      '<a href="mailto:' +
      String(contactEmail).replace(/"/g, '') +
      '" style="' +
      btn +
      'background:#2c5282;color:#fff;border:none;">Email</a>';
  }
  rowHtml += '</td></tr></table>';
  rowHtml +=
    '<p style="margin:20px 0 0;font-size:13px;color:#888;line-height:1.5;text-align:center;">59 York Street, Twickenham TW1 3LP</p>';
  return rowHtml;
}

function escapeHtml_(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function emailLayout_(title, innerBlocksHtml) {
  var gold = '#dccca7';
  var dark = '#0a0a0a';
  var cream = '#faf8f5';
  return (
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' +
    escapeHtml_(title) +
    '</title></head><body style="margin:0;padding:0;background:#ede8df;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ede8df;padding:32px 16px;">' +
    '<tr><td align="center">' +
    '<table role="presentation" width="100%" style="max-width:580px;background:' +
    cream +
    ';border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.12);">' +
    '<tr><td style="background:' +
    dark +
    ';padding:28px 24px;text-align:center;border-bottom:3px solid #9a7b2e;">' +
    '<p style="margin:0;font-size:11px;letter-spacing:0.35em;color:' +
    gold +
    ';text-transform:uppercase;">Prosperity</p>' +
    '<h1 style="margin:8px 0 0;font-family:Georgia,\'Times New Roman\',serif;font-size:24px;font-weight:400;color:' +
    gold +
    ';">Ukrainian Restaurant</h1>' +
    '</td></tr>' +
    '<tr><td style="padding:32px 28px;font-family:Georgia,\'Times New Roman\',serif;color:#1a1a1a;">' +
    innerBlocksHtml +
    contactFooterHtml_() +
    '</td></tr>' +
    '<tr><td style="padding:16px;background:#eee;text-align:center;font-size:11px;color:#888;">Twickenham, London</td></tr>' +
    '</table></td></tr></table></body></html>'
  );
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    return {};
  }
}

function checkAdmin_(body) {
  var expected = prop_('ADMIN_PASSWORD');
  if (!expected) {
    throw new Error('ADMIN_PASSWORD not configured in Script Properties');
  }
  if (!body.password || String(body.password) !== expected) {
    throw new Error('Unauthorized');
  }
}

function sendMail_(to, subject, htmlBody) {
  var name = prop_('FROM_NAME', 'Prosperity Ukrainian Restaurant');
  var adminEmail = prop_('ADMIN_EMAIL');
  MailApp.sendEmail({
    to: to,
    subject: subject,
    htmlBody: htmlBody,
    name: name,
    replyTo: adminEmail || undefined,
  });
}

function buildCustomerPendingEmail_(b) {
  var statusUrl = siteUrl_() + '/booking/status/' + encodeURIComponent(b.id);
  var inner =
    '<p style="margin:0 0 16px;font-size:17px;line-height:1.5;">Dear ' +
    escapeHtml_(b.name) +
    ',</p>' +
    '<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#333;">Thank you for choosing <strong>Prosperity</strong>. We have received your table request and our team will review it shortly.</p>' +
    '<table role="presentation" width="100%" style="background:#fff;border:1px solid #e8e2d6;border-radius:8px;margin:0 0 24px;">' +
    '<tr><td style="padding:20px 22px;">' +
    '<p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;color:#9a7b2e;">Reservation details</p>' +
    '<p style="margin:0;font-size:16px;line-height:1.7;"><strong>Date &amp; time:</strong> ' +
    escapeHtml_(b.date) +
    ' at ' +
    escapeHtml_(b.time) +
    '<br><strong>Guests:</strong> ' +
    escapeHtml_(b.guests) +
    '</p></td></tr></table>' +
    '<p style="margin:0 0 20px;font-size:15px;color:#6b5c32;">Status: <strong style="color:#9a7b2e;">Pending confirmation</strong></p>' +
    '<p style="margin:0;text-align:center;">' +
    '<a href="' +
    statusUrl +
    '" style="display:inline-block;padding:14px 28px;background:#1a1a1a;color:#e8d5a3;text-decoration:none;border-radius:8px;font-size:15px;font-weight:600;">View booking status</a>' +
    '</p>';
  return emailLayout_('Reservation received', inner);
}

function buildCustomerConfirmedEmail_(b) {
  var inner =
    '<p style="margin:0 0 16px;font-size:17px;line-height:1.5;">Dear ' +
    escapeHtml_(b.name) +
    ',</p>' +
    '<p style="margin:0 0 24px;font-size:18px;line-height:1.55;color:#2d6a3e;font-weight:600;">Your table is confirmed — we look forward to seeing you.</p>' +
    '<table role="presentation" width="100%" style="background:#f0f7f1;border:1px solid #c3e0c8;border-radius:8px;margin:0 0 24px;">' +
    '<tr><td style="padding:22px 24px;">' +
    '<p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;color:#2d6a3e;">Confirmed reservation</p>' +
    '<p style="margin:0;font-size:17px;line-height:1.7;color:#1a1a1a;"><strong>When:</strong> ' +
    escapeHtml_(b.date) +
    ' at ' +
    escapeHtml_(b.time) +
    '<br><strong>Guests:</strong> ' +
    escapeHtml_(b.guests) +
    '</p></td></tr></table>' +
    '<p style="margin:0;font-size:15px;line-height:1.65;color:#444;">If your plans change, please call us as soon as possible so we can offer your table to another guest.</p>';
  return emailLayout_('Booking confirmed', inner);
}

function buildCustomerRejectedEmail_(b, note) {
  var inner =
    '<p style="margin:0 0 16px;font-size:17px;line-height:1.5;">Dear ' +
    escapeHtml_(b.name) +
    ',</p>' +
    '<p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#333;">We are sorry we are unable to accommodate your request for <strong>' +
    escapeHtml_(b.date) +
    '</strong> at <strong>' +
    escapeHtml_(b.time) +
    '</strong>.</p>';
  if (note) {
    inner +=
      '<div style="background:#faf6f2;border-left:4px solid #9a7b2e;padding:16px 18px;margin:0 0 24px;border-radius:0 8px 8px 0;">' +
      '<p style="margin:0;font-size:14px;color:#555;"><em>From our team:</em> ' +
      escapeHtml_(note) +
      '</p></div>';
  }
  inner +=
    '<p style="margin:0;font-size:15px;line-height:1.65;color:#444;">We would love to welcome you on another date — please book again on our website or get in touch.</p>';
  return emailLayout_('Booking update', inner);
}

function buildAdminNewEmail_(b, token) {
  var base = webAppUrl_();
  var confirmUrl =
    base + '?action=confirm&id=' + encodeURIComponent(b.id) + '&token=' + encodeURIComponent(token);
  var rejectUrl = base + '?action=reject&id=' + encodeURIComponent(b.id) + '&token=' + encodeURIComponent(token);
  var adminUrl = siteUrl_() + '/admin';
  var btnYes =
    'display:inline-block;padding:14px 28px;margin:8px 10px 8px 0;background:#2d6a3e;color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:600;';
  var btnNo =
    'display:inline-block;padding:14px 28px;margin:8px 0 8px 0;background:#8b3a3a;color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:600;';
  var inner =
    '<p style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;color:#9a7b2e;">Action required</p>' +
    '<p style="margin:0 0 20px;font-size:17px;line-height:1.5;">New table reservation — please choose <strong>Confirm</strong> or <strong>Decline</strong>. You can use each link safely more than once: if a decision was already recorded, the page will say so and no duplicate emails are sent.</p>' +
    '<table role="presentation" width="100%" style="background:#fff;border:1px solid #e8e2d6;border-radius:8px;margin:0 0 28px;">' +
    '<tr><td style="padding:20px 22px;font-size:15px;line-height:1.65;">' +
    '<strong>Guest:</strong> ' +
    escapeHtml_(b.name) +
    '<br><strong>Email:</strong> ' +
    escapeHtml_(b.email) +
    '<br><strong>Phone:</strong> ' +
    escapeHtml_(b.phone) +
    '<br><strong>When:</strong> ' +
    escapeHtml_(b.date) +
    ' at ' +
    escapeHtml_(b.time) +
    '<br><strong>Guests:</strong> ' +
    escapeHtml_(b.guests) +
    (b.message
      ? '<br><strong>Notes:</strong> ' + escapeHtml_(b.message)
      : '') +
    '</td></tr></table>' +
    '<p style="margin:0 0 8px;text-align:center;">' +
    '<a href="' +
    confirmUrl +
    '" style="' +
    btnYes +
    '">Confirm reservation</a>' +
    '<a href="' +
    rejectUrl +
    '" style="' +
    btnNo +
    '">Decline</a>' +
    '</p>' +
    '<p style="margin:20px 0 0;font-size:14px;text-align:center;color:#666;">Or use the <a href="' +
    adminUrl +
    '" style="color:#9a7b2e;font-weight:600;">admin panel</a> → Bookings.</p>';
  return emailLayout_('New booking request', inner);
}

function updateStatus_(id, token, newStatus, adminNote, skipTokenCheck) {
  var sheet = getSheet_();
  var found = findRowById_(sheet, id);
  if (!found) {
    throw new Error('Booking not found');
  }
  var row = found.row;
  var rowIndex = found.rowIndex;
  var storedToken = String(row[10]);
  if (!skipTokenCheck && storedToken !== String(token)) {
    throw new Error('Invalid or expired link');
  }
  var currentStatus = String(row[9] || '').toLowerCase();
  var ns = String(newStatus || '').toLowerCase();

  if (currentStatus === 'confirmed' && ns === 'confirmed') {
    return { booking: bookingFromRow_(row), skippedNotification: true };
  }
  if (currentStatus === 'rejected' && ns === 'rejected') {
    return { booking: bookingFromRow_(row), skippedNotification: true };
  }
  if (currentStatus === 'confirmed') {
    throw new Error('This booking is already confirmed.');
  }
  if (currentStatus === 'rejected') {
    throw new Error('This booking was already declined.');
  }
  if (currentStatus !== 'pending') {
    throw new Error('This request has already been processed.');
  }

  sheet.getRange(rowIndex, 10).setValue(newStatus);
  if (adminNote != null && String(adminNote) !== '') {
    sheet.getRange(rowIndex, 12).setValue(adminNote);
  }

  var booking = bookingFromRow_(row);
  booking.status = newStatus;

  if (ns === 'confirmed') {
    sendMail_(booking.email, 'Your table is confirmed — Prosperity', buildCustomerConfirmedEmail_(booking));
  } else if (ns === 'rejected') {
    sendMail_(
      booking.email,
      'Update on your reservation — Prosperity',
      buildCustomerRejectedEmail_(booking, adminNote || '')
    );
  }

  return { booking: booking, skippedNotification: false };
}

function actionCreate_(body) {
  var name = String(body.name || '').trim();
  var email = String(body.email || '').trim();
  var phone = String(body.phone || '').trim();
  var date = String(body.date || '').trim();
  var time = String(body.time || '').trim();
  var guests = String(body.guests || '').trim();
  var message = String(body.message || '').trim();

  if (!name || !email || !phone || !date || !time || !guests) {
    throw new Error('Please fill in all required fields.');
  }

  var id = generateId_();
  var token = generateToken_();
  var createdAt = new Date().toISOString();
  var sheet = getSheet_();
  sheet.appendRow([id, createdAt, name, email, phone, date, time, guests, message, 'pending', token, '']);

  var booking = { id: id, name: name, email: email, phone: phone, date: date, time: time, guests: guests, message: message };

  try {
    sendMail_(email, 'We received your reservation — Prosperity', buildCustomerPendingEmail_(booking));
  } catch (mailErr) {
    Logger.log('Customer mail error: ' + mailErr);
  }

  var adminEmail = prop_('ADMIN_EMAIL');
  if (adminEmail) {
    try {
      sendMail_(adminEmail, 'New booking: ' + name + ' · ' + date + ' ' + time, buildAdminNewEmail_(booking, token));
    } catch (mailErr2) {
      Logger.log('Admin mail error: ' + mailErr2);
    }
  }

  return { ok: true, id: id, status: 'pending' };
}

function actionList_(body) {
  checkAdmin_(body);
  var sheet = getSheet_();
  var data = sheet.getDataRange().getValues();
  var list = [];
  for (var r = 1; r < data.length; r++) {
    list.push(rowToBooking_(data[r], r + 1));
  }
  list.sort(function (a, b) {
    return String(b.createdAt).localeCompare(String(a.createdAt));
  });
  return { ok: true, bookings: list };
}

function actionUpdate_(body) {
  checkAdmin_(body);
  var id = String(body.id || '');
  var status = String(body.status || '');
  var adminNote = body.adminNote != null ? String(body.adminNote) : '';
  if (!id || (status !== 'confirmed' && status !== 'rejected')) {
    throw new Error('Invalid update');
  }
  var result = updateStatus_(id, '', status, adminNote, true);
  return { ok: true, booking: result.booking };
}

function actionGetStatus_(body) {
  var id = String(body.id || body.bookingId || '').trim();
  if (!id) {
    throw new Error('Missing booking id');
  }
  var sheet = getSheet_();
  var found = findRowById_(sheet, id);
  if (!found) {
    throw new Error('Booking not found');
  }
  var b = rowToBooking_(found.row, found.rowIndex);
  return {
    ok: true,
    booking: {
      id: b.id,
      status: b.status,
      date: b.date,
      time: b.time,
      guests: b.guests,
      name: b.name,
      createdAt: b.createdAt,
    },
  };
}

function doPost(e) {
  try {
    var body = parseBody_(e);
    var action = String(body.action || '').toLowerCase();
    var result;

    if (action === 'create') {
      result = actionCreate_(body);
    } else if (action === 'list') {
      result = actionList_(body);
    } else if (action === 'update') {
      result = actionUpdate_(body);
    } else if (action === 'getstatus' || action === 'get') {
      result = actionGetStatus_(body);
    } else {
      throw new Error('Unknown action');
    }

    return jsonResponse_(result);
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err.message || err) });
  }
}

function htmlPage_(title, message, isSuccess, kind) {
  kind = kind || 'default';
  var gold = '#dccca7';
  var accent = isSuccess ? '#2d6a3e' : '#8b3a3a';
  var ig = prop_('INSTAGRAM_URL', 'https://www.instagram.com/prosperity_restaurant/');
  var phoneLabel = prop_('PHONE_LABEL', '020 4568 0606');
  var phoneTel = prop_('PHONE_TEL', 'tel:+442045680606');
  var contactEmail = prop_('CONTACT_EMAIL', '');
  var site = siteUrl_();
  var btn =
    'display:inline-block;margin:8px;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;color:#fff;';
  var contacts =
    '<div style="margin-top:32px;padding-top:24px;border-top:1px solid #333;">' +
    '<p style="margin:0 0 12px;font-size:12px;letter-spacing:0.15em;color:#888;text-transform:uppercase;">Contact</p>' +
    '<a href="' +
    site +
    '/" style="' +
    btn +
    'background:#3d3528;margin:4px;">Website</a>' +
    '<a href="' +
    ig +
    '" style="' +
    btn +
    'background:linear-gradient(135deg,#833AB4,#E1306C);margin:4px;">Instagram</a>' +
    '<a href="' +
    phoneTel +
    '" style="' +
    btn +
    'background:#2d6a3e;margin:4px;">' +
    escapeHtml_(phoneLabel) +
    '</a>';
  if (contactEmail) {
    contacts +=
      '<a href="mailto:' + contactEmail.replace(/"/g, '') + '" style="' + btn + 'background:#2c5282;margin:4px;">Email</a>';
  }
  contacts += '</div>';

  var extra = '';
  if (kind === 'repeat') {
    extra =
      '<p style="color:#9a7b2e;font-size:15px;margin:16px 0 0;">No further action is needed — you can close this page.</p>';
  } else if (kind === 'done') {
    extra =
      '<p style="color:' +
      accent +
      ';font-size:15px;margin:16px 0 0;">The guest has been notified by email.</p>';
  }

  var html =
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' +
    escapeHtml_(title) +
    '</title></head><body style="margin:0;font-family:Georgia,serif;background:#0a0a0a;color:' +
    gold +
    ';min-height:100vh;">' +
    '<div style="max-width:520px;margin:0 auto;padding:48px 24px;text-align:center;">' +
    '<p style="margin:0 0 12px;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#9a7b2e;">Prosperity</p>' +
    '<h1 style="font-size:26px;font-weight:400;margin:0 0 24px;line-height:1.3;">' +
    escapeHtml_(title) +
    '</h1>' +
    '<p style="color:#ccc;font-size:16px;line-height:1.65;margin:0 0 8px;">' +
    message +
    '</p>' +
    extra +
    contacts +
    '<p style="margin-top:32px;"><a href="' +
    site +
    '" style="color:' +
    gold +
    ';font-size:15px;">← Back to website</a></p>' +
    '</div></body></html>';
  return HtmlService.createHtmlOutput(html);
}

function doGet(e) {
  var p = e && e.parameter ? e.parameter : {};
  var action = String(p.action || '').toLowerCase();
  var id = String(p.id || '');
  var token = String(p.token || '');

  if (action === 'confirm' || action === 'reject') {
    try {
      if (!id || !token) {
        throw new Error('Invalid link.');
      }
      var newStatus = action === 'confirm' ? 'confirmed' : 'rejected';
      var result = updateStatus_(id, token, newStatus, '', false);
      if (result.skippedNotification) {
        if (action === 'confirm') {
          return htmlPage_(
            'Already confirmed',
            'This reservation was already confirmed. The confirmation email was sent earlier.',
            true,
            'repeat'
          );
        }
        return htmlPage_(
          'Already declined',
          'This request was already declined. The guest was notified earlier.',
          true,
          'repeat'
        );
      }
      if (action === 'confirm') {
        return htmlPage_(
          'Booking confirmed',
          'Thank you. The table is now confirmed and the guest has received an email.',
          true,
          'done'
        );
      }
      return htmlPage_(
        'Booking declined',
        'The request has been marked as declined and the guest has received an email.',
        true,
        'done'
      );
    } catch (err) {
      return htmlPage_('Unable to update', String(err.message || err), false, 'error');
    }
  }

  return htmlPage_(
    'Prosperity reservations',
    'Use the booking form on our website or the admin panel to manage reservations.',
    true,
    'info'
  );
}
