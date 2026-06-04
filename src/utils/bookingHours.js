const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const CLOSED_RE = /closed/i;

/** @param {string} dateStr YYYY-MM-DD */
export function dayNameForDate(dateStr) {
  const d = parseLocalDate(dateStr);
  if (!d) return '';
  return DAY_NAMES[d.getDay()];
}

/** @param {string} dateStr */
export function parseLocalDate(dateStr) {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
  const [y, m, day] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, day);
}

/** @param {{ day: string, hours: string }[]} workingHours */
export function hoursRowForDay(workingHours, dayName) {
  if (!Array.isArray(workingHours) || !dayName) return null;
  return workingHours.find((r) => r.day && r.day.toLowerCase() === dayName.toLowerCase()) || null;
}

/** @returns {{ openMin: number, closeMin: number } | null } */
export function parseHoursRange(hoursText) {
  if (!hoursText || CLOSED_RE.test(hoursText)) return null;
  const m = String(hoursText).match(/(\d{1,2})\s*:\s*(\d{2})\s*[---]\s*(\d{1,2})\s*:\s*(\d{2})/);
  if (!m) return null;
  const openMin = Number(m[1]) * 60 + Number(m[2]);
  const closeMin = Number(m[3]) * 60 + Number(m[4]);
  if (closeMin <= openMin) return null;
  return { openMin, closeMin };
}

/** Min/max for native time input (HH:MM). */
export function getTimeBoundsForDate(workingHours, dateStr) {
  const dayName = dayNameForDate(dateStr);
  const row = hoursRowForDay(workingHours, dayName);
  const range = row ? parseHoursRange(row.hours) : null;
  if (!range) return null;

  let minMin = range.openMin;
  const maxMin = Math.max(range.openMin, range.closeMin - 30);

  if (dateStr === todayDateString()) {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes() + 30;
    minMin = Math.max(minMin, Math.ceil(nowMin / 30) * 30);
  }

  if (minMin > maxMin) return null;

  return {
    min: formatMinutesAsTime(minMin),
    max: formatMinutesAsTime(maxMin),
  };
}

export function isOpenOnDate(workingHours, dateStr) {
  const dayName = dayNameForDate(dateStr);
  const row = hoursRowForDay(workingHours, dayName);
  if (!row) return false;
  return parseHoursRange(row.hours) != null;
}

export function formatMinutesAsTime(totalMin) {
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Half-hour slots from opening until 30 minutes before closing.
 * @param {{ day: string, hours: string }[]} workingHours
 * @param {string} dateStr
 * @param {number} [stepMin]
 */
export function timeSlotsForDate(workingHours, dateStr, stepMin = 30) {
  const dayName = dayNameForDate(dateStr);
  const row = hoursRowForDay(workingHours, dayName);
  if (!row) return [];
  const range = parseHoursRange(row.hours);
  if (!range) return [];

  const slots = [];
  const lastStart = range.closeMin - stepMin;
  for (let t = range.openMin; t <= lastStart; t += stepMin) {
    slots.push(formatMinutesAsTime(t));
  }
  return slots;
}

export function todayDateString() {
  const now = new Date();
  return formatDateInput(now);
}

export function formatDateInput(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * @returns {string | null} error message or null if valid
 */
export function validateBookingDateTime(workingHours, dateStr, timeStr) {
  if (!dateStr || !timeStr) {
    return 'Please choose a date and time.';
  }

  const bookingDate = parseLocalDate(dateStr);
  if (!bookingDate) {
    return 'Invalid date.';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (bookingDate < today) {
    return 'Please choose today or a future date.';
  }

  const dayName = dayNameForDate(dateStr);
  const row = hoursRowForDay(workingHours, dayName);
  if (!row) {
    return 'We are closed on this day.';
  }

  const range = parseHoursRange(row.hours);
  if (!range) {
    return `We are closed on ${dayName}.`;
  }

  const normalizedTime = String(timeStr).slice(0, 5);
  const tm = normalizedTime.match(/^(\d{1,2}):(\d{2})$/);
  if (!tm) {
    return 'Invalid time.';
  }

  const chosenMin = Number(tm[1]) * 60 + Number(tm[2]);
  if (chosenMin < range.openMin || chosenMin > range.closeMin - 30) {
    return `Please choose a time during our opening hours (${row.hours}).`;
  }

  const slots = timeSlotsForDate(workingHours, dateStr);
  if (slots.length && !slots.includes(normalizedTime)) {
    return 'Please choose an available time slot.';
  }

  if (dateStr === todayDateString()) {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    if (chosenMin <= nowMin) {
      return 'Please choose a time later today.';
    }
  }

  return null;
}

export function hoursHintForDate(workingHours, dateStr) {
  if (!dateStr) return '';
  const dayName = dayNameForDate(dateStr);
  const row = hoursRowForDay(workingHours, dayName);
  if (!row) return '';
  if (CLOSED_RE.test(row.hours)) {
    return `${dayName}: closed - please pick another date.`;
  }
  return `${dayName}: ${row.hours}`;
}
