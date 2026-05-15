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

function emailWrapper_(title, lines) {
  var html = '<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1a1a;">';
  html += '<div style="background:#0c0c0c;padding:24px;text-align:center;">';
  html += '<h1 style="color:#dccca7;margin:0;font-size:22px;letter-spacing:0.08em;">PROSPERITY</h1>';
  html += '</div><div style="padding:28px 24px;background:#faf8f5;">';
  html += '<h2 style="margin:0 0 16px;font-size:20px;color:#1a1a1a;">' + title + '</h2>';
  for (var i = 0; i < lines.length; i++) {
    if (lines[i]) {
      html += '<p style="margin:0 0 12px;line-height:1.55;font-size:15px;">' + lines[i] + '</p>';
    }
  }
  html += '</div><div style="padding:16px;text-align:center;font-size:12px;color:#888;background:#eee;">';
  html += 'Prosperity Ukrainian Restaurant · Twickenham</div></div>';
  return html;
}

function buildCustomerPendingEmail_(b) {
  var statusUrl = siteUrl_() + '/booking/status/' + encodeURIComponent(b.id);
  var lines = [
    'Dear ' + b.name + ',',
    'Thank you for your reservation request.',
    '<strong>Date:</strong> ' + b.date + ' at ' + b.time + '<br><strong>Guests:</strong> ' + b.guests,
    'Your booking is <strong style="color:#9a7b2e;">pending confirmation</strong>. We will email you shortly once our team has reviewed it.',
    '<a href="' + statusUrl + '" style="color:#9a7b2e;">Check your booking status</a>',
  ];
  return emailWrapper_('Reservation received', lines);
}

function buildCustomerConfirmedEmail_(b) {
  var lines = [
    'Dear ' + b.name + ',',
    'Great news — your table is <strong style="color:#2d6a3e;">confirmed</strong>.',
    '<strong>Date:</strong> ' + b.date + ' at ' + b.time + '<br><strong>Guests:</strong> ' + b.guests,
    'We look forward to welcoming you to Prosperity.',
    'If your plans change, please call us as soon as possible.',
  ];
  return emailWrapper_('Booking confirmed', lines);
}

function buildCustomerRejectedEmail_(b, note) {
  var lines = [
    'Dear ' + b.name + ',',
    'Unfortunately we are unable to confirm your reservation for <strong>' + b.date + '</strong> at <strong>' + b.time + '</strong>.',
  ];
  if (note) {
    lines.push('<em>Message from our team:</em> ' + note);
  }
  lines.push('Please contact us or submit a new request for another date and time.');
  return emailWrapper_('Booking update', lines);
}

function buildAdminNewEmail_(b, token) {
  var base = webAppUrl_();
  var confirmUrl =
    base + '?action=confirm&id=' + encodeURIComponent(b.id) + '&token=' + encodeURIComponent(token);
  var rejectUrl = base + '?action=reject&id=' + encodeURIComponent(b.id) + '&token=' + encodeURIComponent(token);
  var adminUrl = siteUrl_() + '/admin';

  var lines = [
    '<strong>New table reservation (pending)</strong>',
    '<strong>Name:</strong> ' + b.name + '<br><strong>Email:</strong> ' + b.email + '<br><strong>Phone:</strong> ' + b.phone,
    '<strong>When:</strong> ' + b.date + ' at ' + b.time + '<br><strong>Guests:</strong> ' + b.guests,
    b.message ? '<strong>Notes:</strong> ' + b.message : '',
    '<a href="' + confirmUrl + '" style="display:inline-block;margin:8px 8px 8px 0;padding:12px 20px;background:#2d6a3e;color:#fff;text-decoration:none;border-radius:6px;">Confirm</a>',
    '<a href="' + rejectUrl + '" style="display:inline-block;margin:8px 0;padding:12px 20px;background:#6b2d2d;color:#fff;text-decoration:none;border-radius:6px;">Decline</a>',
    'Or manage in <a href="' + adminUrl + '">Admin panel</a> → Bookings tab.',
  ];
  return emailWrapper_('New booking request', lines);
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
    throw new Error('Invalid token');
  }
  var currentStatus = String(row[9]);
  if (currentStatus !== 'pending' && newStatus !== currentStatus) {
    /* allow re-send emails if needed */
  }

  sheet.getRange(rowIndex, 10).setValue(newStatus);
  if (adminNote != null) {
    sheet.getRange(rowIndex, 12).setValue(adminNote);
  }

  var booking = {
    id: String(row[0]),
    name: String(row[2]),
    email: String(row[3]),
    phone: String(row[4]),
    date: String(row[5]),
    time: String(row[6]),
    guests: String(row[7]),
    message: String(row[8]),
    status: newStatus,
  };

  if (newStatus === 'confirmed') {
    sendMail_(booking.email, 'Your table is confirmed — Prosperity', buildCustomerConfirmedEmail_(booking));
  } else if (newStatus === 'rejected') {
    sendMail_(
      booking.email,
      'Update on your reservation — Prosperity',
      buildCustomerRejectedEmail_(booking, adminNote || '')
    );
  }

  return booking;
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
  var booking = updateStatus_(id, '', status, adminNote, true);
  return { ok: true, booking: booking };
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

function htmlPage_(title, message, isSuccess) {
  var color = isSuccess ? '#2d6a3e' : '#6b2d2d';
  var html =
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' +
    title +
    '</title></head><body style="font-family:Georgia,serif;background:#0c0c0c;color:#dccca7;margin:0;padding:40px 20px;text-align:center;">' +
    '<h1 style="font-size:28px;margin:0 0 16px;">' +
    title +
    '</h1>' +
    '<p style="color:#ccc;max-width:480px;margin:0 auto 24px;line-height:1.6;">' +
    message +
    '</p>' +
    '<p style="color:' +
    color +
    ';font-weight:bold;">' +
    (isSuccess ? 'The guest has been notified by email.' : '') +
    '</p>' +
  '<p><a href="' +
    siteUrl_() +
    '" style="color:#dccca7;">Back to website</a></p></body></html>';
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
        throw new Error('Invalid link');
      }
      var newStatus = action === 'confirm' ? 'confirmed' : 'rejected';
      updateStatus_(id, token, newStatus, '', false);
      if (action === 'confirm') {
        return htmlPage_('Booking confirmed', 'This reservation is now confirmed.', true);
      }
      return htmlPage_('Booking declined', 'The guest has been notified that this request was declined.', true);
    } catch (err) {
      return htmlPage_('Could not update booking', String(err.message || err), false);
    }
  }

  return htmlPage_('Prosperity Reservations', 'Use the restaurant website to manage bookings.', true);
}
