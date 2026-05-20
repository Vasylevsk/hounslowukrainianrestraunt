const API_URL = (process.env.REACT_APP_BOOKING_API_URL || '').replace(/\/$/, '');

function bookingConfigured() {
  return Boolean(API_URL);
}

async function postAction(payload) {
  if (!bookingConfigured()) {
    throw new Error('Online booking is not configured yet. Please call the restaurant.');
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Unexpected response from booking server.');
  }

  if (!data || !data.ok) {
    throw new Error((data && data.error) || 'Booking request failed.');
  }

  return data;
}

export function isBookingApiConfigured() {
  return bookingConfigured();
}

export function createBooking(fields) {
  return postAction({
    action: 'create',
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    area: fields.area,
    date: fields.date,
    time: fields.time,
    guests: fields.guests,
    message: fields.message || '',
  });
}

export function fetchBookingStatus(id) {
  return postAction({ action: 'getStatus', id });
}

export function listBookings(password) {
  return postAction({ action: 'list', password });
}

export function updateBookingStatus({ password, id, status, adminNote }) {
  return postAction({
    action: 'update',
    password,
    id,
    status,
    adminNote: adminNote || '',
  });
}
