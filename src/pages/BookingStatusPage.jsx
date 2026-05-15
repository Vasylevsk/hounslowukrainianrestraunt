import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { SubHeading } from '../components';
import { fetchBookingStatus, isBookingApiConfigured } from '../services/bookingApi';
import './BookingPage.css';
import './BookingStatusPage.css';

const STATUS_LABELS = {
  pending: { label: 'Pending confirmation', className: 'booking-status--pending' },
  confirmed: { label: 'Confirmed', className: 'booking-status--confirmed' },
  rejected: { label: 'Not available', className: 'booking-status--rejected' },
};

const BookingStatusPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!id) {
        setError('Missing booking reference.');
        setLoading(false);
        return;
      }
      if (!isBookingApiConfigured()) {
        setError('Booking status is not available online yet.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const data = await fetchBookingStatus(id);
        if (!cancelled) {
          setBooking(data.booking);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Could not load booking.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const statusKey = booking?.status?.toLowerCase() || 'pending';
  const statusMeta = STATUS_LABELS[statusKey] || STATUS_LABELS.pending;

  return (
    <div className="app__booking-page">
      <div className="app__booking-page_container app__bg section__padding">
        <div className="app__booking-page_content app__booking-page_content--narrow">
          <div className="app__booking-page_info">
            <SubHeading title="Reservation" />
            <h1 className="headtext__cormorant">Booking status</h1>

            {loading ? (
              <p className="p__opensans booking-status-message">Loading…</p>
            ) : null}

            {!loading && error ? (
              <div className="booking-status-card">
                <p className="p__opensans booking-status-message" role="alert">
                  {error}
                </p>
                <Link to="/booking" className="custom__button booking-status-cta">
                  Make a new request
                </Link>
              </div>
            ) : null}

            {!loading && !error && booking ? (
              <div className="booking-status-card">
                <p className="p__opensans booking-status-ref">
                  Reference: <strong>{booking.id}</strong>
                </p>
                <span className={`booking-status-badge ${statusMeta.className}`}>{statusMeta.label}</span>
                <dl className="booking-status-details">
                  <div>
                    <dt>Name</dt>
                    <dd>{booking.name}</dd>
                  </div>
                  <div>
                    <dt>Date</dt>
                    <dd>{booking.date}</dd>
                  </div>
                  <div>
                    <dt>Time</dt>
                    <dd>{booking.time}</dd>
                  </div>
                  <div>
                    <dt>Guests</dt>
                    <dd>{booking.guests}</dd>
                  </div>
                </dl>
                {statusKey === 'pending' ? (
                  <p className="p__opensans booking-status-message">
                    We are reviewing your request and will email you when it is confirmed.
                  </p>
                ) : null}
                {statusKey === 'confirmed' ? (
                  <p className="p__opensans booking-status-message">
                    Your table is confirmed. We look forward to seeing you at Prosperity.
                  </p>
                ) : null}
                {statusKey === 'rejected' ? (
                  <p className="p__opensans booking-status-message">
                    We could not confirm this reservation. Please contact us or submit a new request.
                  </p>
                ) : null}
                <div className="app__booking-form_actions">
                  <Link to="/booking" className="custom__button booking-status-cta">
                    New reservation
                  </Link>
                  <Link to="/" className="app__booking-link">
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStatusPage;
