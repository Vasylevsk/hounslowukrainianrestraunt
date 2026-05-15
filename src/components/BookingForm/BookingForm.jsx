import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { defaultWorkingHours } from '../../constants/siteDefaults';
import { useSiteContent } from '../../context/SiteContentContext';
import { createBooking, isBookingApiConfigured } from '../../services/bookingApi';
import {
  getTimeBoundsForDate,
  hoursHintForDate,
  isOpenOnDate,
  timeSlotsForDate,
  todayDateString,
  validateBookingDateTime,
} from '../../utils/bookingHours';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '',
  message: '',
};

function TimeField({ form, timeSlots, timeBounds, submitting, onChange, id, label, compact }) {
  const common = {
    name: 'time',
    value: form.time,
    onChange,
    required: true,
    className: 'app__booking-input',
    disabled: submitting || !form.date,
  };

  if (!form.date) {
    return compact ? (
      <select {...common} value="" disabled className="app__booking-input">
        <option value="">Select date first</option>
      </select>
    ) : (
      <select id={id} {...common} value="" disabled className="app__booking-input">
        <option value="">Select a date first</option>
      </select>
    );
  }

  if (timeSlots.length > 0) {
    const selectEl = (
      <select {...common} id={compact ? undefined : id}>
        <option value="">Select a time</option>
        {timeSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
    );
    return compact ? selectEl : (
      <div className="app__booking-form_field">
        <label className="app__booking-label" htmlFor={id}>
          {label}
        </label>
        {selectEl}
      </div>
    );
  }

  if (timeBounds) {
    const inputEl = (
      <input
        {...common}
        id={compact ? undefined : id}
        type="time"
        min={timeBounds.min}
        max={timeBounds.max}
        step={1800}
      />
    );
    return compact ? inputEl : (
      <div className="app__booking-form_field">
        <label className="app__booking-label" htmlFor={id}>
          {label}
        </label>
        {inputEl}
      </div>
    );
  }

  const closedEl = (
    <select {...common} value="" disabled className="app__booking-input">
      <option value="">Closed on this day</option>
    </select>
  );
  return compact ? closedEl : (
    <div className="app__booking-form_field">
      <label className="app__booking-label" htmlFor={id}>
        {label}
      </label>
      {closedEl}
    </div>
  );
}

const GUEST_OPTIONS = [
  { value: '1', label: '1 Guest' },
  { value: '2', label: '2 Guests' },
  { value: '3', label: '3 Guests' },
  { value: '4', label: '4 Guests' },
  { value: '5', label: '5 Guests' },
  { value: '6', label: '6 Guests' },
  { value: '7', label: '7+ Guests' },
];

const BookingForm = ({ variant = 'full', showBackLink = false }) => {
  const { content } = useSiteContent();
  const workingHours = useMemo(() => {
    if (Array.isArray(content.workingHours) && content.workingHours.length > 0) {
      return content.workingHours;
    }
    return defaultWorkingHours;
  }, [content.workingHours]);
  const compact = variant === 'compact';

  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const minDate = todayDateString();
  const dateHint = useMemo(() => hoursHintForDate(workingHours, form.date), [workingHours, form.date]);

  const timeSlots = useMemo(() => {
    if (!form.date || !isOpenOnDate(workingHours, form.date)) return [];
    return timeSlotsForDate(workingHours, form.date);
  }, [workingHours, form.date]);

  const timeBounds = useMemo(
    () => (form.date ? getTimeBoundsForDate(workingHours, form.date) : null),
    [workingHours, form.date]
  );

  useEffect(() => {
    if (!form.time || timeSlots.length === 0) return;
    const normalized = form.time.slice(0, 5);
    if (!timeSlots.includes(normalized)) {
      setForm((prev) => ({ ...prev, time: '' }));
    }
  }, [timeSlots, form.time]);

  const onChange = (e) => {
    let { name, value } = e.target;
    if (name === 'time' && value) {
      value = value.slice(0, 5);
    }
    setError('');
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'date') {
        next.time = '';
      }
      return next;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const hoursError = validateBookingDateTime(workingHours, form.date, form.time);
    if (hoursError) {
      setError(hoursError);
      return;
    }

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.guests) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const result = await createBooking({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        date: form.date,
        time: form.time,
        guests: form.guests,
        message: form.message.trim(),
      });
      setSuccess({
        id: result.id,
        status: result.status || 'pending',
        name: form.name.trim(),
      });
      setForm(EMPTY);
    } catch (err) {
      setError(err.message || 'Could not submit your request. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="app__booking-success" role="status">
        <p className="app__booking-success-title">Request received</p>
        <p className="p__opensans app__booking-success-text">
          Thank you, {success.name || 'guest'}. Your table request is{' '}
          <strong style={{ color: '#DCCA87' }}>pending confirmation</strong>. We have sent a confirmation email
          with next steps.
        </p>
        <p className="p__opensans app__booking-success-meta">
          Reference: <strong>{success.id}</strong>
        </p>
        <div className="app__booking-form_actions">
          <Link to={`/booking/status/${success.id}`} className="custom__button app__booking-success-btn">
            Check status
          </Link>
          {showBackLink ? (
            <Link to="/" className="app__booking-link">
              Back to Home
            </Link>
          ) : null}
        </div>
      </div>
    );
  }

  const apiReady = isBookingApiConfigured();

  return (
    <form className="app__booking-form" onSubmit={onSubmit} noValidate>
      {!apiReady ? (
        <p className="app__booking-notice p__opensans" role="note">
          Online booking is being set up. Please call us to reserve a table.
        </p>
      ) : null}

      {error ? (
        <p className="app__booking-error p__opensans" role="alert">
          {error}
        </p>
      ) : null}

      <div className="app__booking-form_row">
        {compact ? (
          <>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={onChange}
              required
              className="app__booking-input"
              disabled={submitting}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={onChange}
              required
              className="app__booking-input"
              disabled={submitting}
            />
          </>
        ) : (
          <>
            <div className="app__booking-form_field">
              <label className="app__booking-label" htmlFor="booking-name">
                Your Name
              </label>
              <input
                id="booking-name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={onChange}
                required
                className="app__booking-input"
                disabled={submitting}
              />
            </div>
            <div className="app__booking-form_field">
              <label className="app__booking-label" htmlFor="booking-email">
                Your Email
              </label>
              <input
                id="booking-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={onChange}
                required
                className="app__booking-input"
                disabled={submitting}
              />
            </div>
          </>
        )}
      </div>

      <div className="app__booking-form_row">
        {compact ? (
          <>
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={form.phone}
              onChange={onChange}
              required
              className="app__booking-input"
              disabled={submitting}
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              min={minDate}
              required
              className="app__booking-input"
              disabled={submitting}
            />
          </>
        ) : (
          <>
            <div className="app__booking-form_field">
              <label className="app__booking-label" htmlFor="booking-phone">
                Your Phone
              </label>
              <input
                id="booking-phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={onChange}
                required
                className="app__booking-input"
                disabled={submitting}
              />
            </div>
            <div className="app__booking-form_field">
              <label className="app__booking-label" htmlFor="booking-date">
                Date
              </label>
              <input
                id="booking-date"
                type="date"
                name="date"
                value={form.date}
                onChange={onChange}
                min={minDate}
                required
                className="app__booking-input"
                disabled={submitting}
              />
            </div>
          </>
        )}
      </div>

      {dateHint ? (
        <p className={`app__booking-hours-hint p__opensans ${!isOpenOnDate(workingHours, form.date) && form.date ? 'app__booking-hours-hint--warn' : ''}`}>
          {dateHint}
        </p>
      ) : null}

      <div className="app__booking-form_row">
        {compact ? (
          <>
            <TimeField
              compact
              form={form}
              timeSlots={timeSlots}
              timeBounds={timeBounds}
              submitting={submitting}
              onChange={onChange}
            />
            <select
              name="guests"
              value={form.guests}
              onChange={onChange}
              required
              className="app__booking-input"
              disabled={submitting}
            >
              <option value="">Number of Guests</option>
              {GUEST_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <TimeField
              form={form}
              timeSlots={timeSlots}
              timeBounds={timeBounds}
              submitting={submitting}
              onChange={onChange}
              id="booking-time"
              label="Time"
            />
            <div className="app__booking-form_field">
              <label className="app__booking-label" htmlFor="booking-guests">
                Number of Guests
              </label>
              <select
                id="booking-guests"
                name="guests"
                value={form.guests}
                onChange={onChange}
                required
                className="app__booking-input"
                disabled={submitting}
              >
                <option value="">Select number of guests</option>
                {GUEST_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      {compact ? (
        <textarea
          name="message"
          placeholder="Special Requests (Optional)"
          value={form.message}
          onChange={onChange}
          rows="4"
          className="app__booking-textarea"
          disabled={submitting}
        />
      ) : (
        <div className="app__booking-form_field">
          <label className="app__booking-label" htmlFor="booking-message">
            Special Requests (Optional)
          </label>
          <textarea
            id="booking-message"
            name="message"
            placeholder="Any special requests or notes..."
            value={form.message}
            onChange={onChange}
            rows="4"
            className="app__booking-textarea"
            disabled={submitting}
          />
        </div>
      )}

      <div className={compact ? undefined : 'app__booking-form_actions'}>
        <button type="submit" className="custom__button" disabled={submitting || !apiReady} style={compact ? { marginTop: '2rem' } : undefined}>
          {submitting ? 'Sending…' : 'Book Table'}
        </button>
        {showBackLink ? (
          <Link to="/" className="app__booking-link">
            Back to Home
          </Link>
        ) : null}
      </div>
    </form>
  );
};

export default BookingForm;
