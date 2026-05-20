import React, { useCallback, useEffect, useState } from 'react';

import { isBookingApiConfigured, listBookings, updateBookingStatus } from '../../services/bookingApi';
import { adminPassword } from '../../utils/adminAuth';

const STATUS_FILTER = ['all', 'pending', 'confirmed', 'rejected'];

function statusClass(status) {
  const s = String(status || '').toLowerCase();
  if (s === 'confirmed') return 'adm-booking-status adm-booking-status--ok';
  if (s === 'rejected') return 'adm-booking-status adm-booking-status--no';
  return 'adm-booking-status adm-booking-status--pending';
}

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('pending');
  const [notes, setNotes] = useState({});
  const [actingId, setActingId] = useState('');

  const load = useCallback(async () => {
    if (!isBookingApiConfigured()) {
      setError('Set REACT_APP_BOOKING_API_URL to your Google Apps Script web app URL.');
      setBookings([]);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await listBookings(adminPassword());
      setBookings(data.bookings || []);
    } catch (err) {
      setError(err.message || 'Could not load bookings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = bookings.filter((b) => {
    if (filter === 'all') return true;
    return String(b.status).toLowerCase() === filter;
  });

  const handleUpdate = async (id, status) => {
    setActingId(id);
    setError('');
    try {
      await updateBookingStatus({
        password: adminPassword(),
        id,
        status,
        adminNote: notes[id] || '',
      });
      await load();
    } catch (err) {
      setError(err.message || 'Update failed.');
    } finally {
      setActingId('');
    }
  };

  return (
    <div className="adm-card">
      <div className="adm-toolbar adm-toolbar--wrap">
        <div>
          <h2 className="adm-panel-title" style={{ marginBottom: '0.35rem' }}>
            Table reservations
          </h2>
          <p className="adm-lead adm-lead--tight">
            New requests arrive as <strong>pending</strong>. Confirm or decline here or via the links in your admin
            email. Guests receive email updates automatically.
          </p>
        </div>
        <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={load} disabled={loading}>
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {!isBookingApiConfigured() ? (
        <p className="adm-lead adm-lead--warn">
          Add <code>REACT_APP_BOOKING_API_URL</code> to your <code>.env</code> file (see <code>.env.example</code>).
        </p>
      ) : null}

      {error ? (
        <p className="adm-lead adm-lead--warn" role="alert">
          {error}
        </p>
      ) : null}

      <div className="adm-row adm-row--filters" style={{ marginTop: '1rem' }}>
        {STATUS_FILTER.map((f) => (
          <button
            key={f}
            type="button"
            className={`adm-btn adm-btn--ghost adm-btn--sm ${filter === f ? 'adm-btn--on' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="adm-table-scroll" style={{ marginTop: '1rem' }}>
        <table className="adm-table adm-table--bookings">
          <thead>
            <tr>
              <th>When</th>
              <th>Guest</th>
              <th>Contact</th>
              <th>Guests</th>
              <th>Area</th>
              <th>Status</th>
              <th>Note to guest (decline)</th>
              <th className="adm-th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="adm-empty-cell">
                  {loading ? 'Loading…' : 'No bookings in this view.'}
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.id}>
                  <td>
                    <strong>{b.date}</strong>
                    <br />
                    {b.time}
                  </td>
                  <td>{b.name}</td>
                  <td>
                    <a href={`mailto:${b.email}`}>{b.email}</a>
                    <br />
                    <a href={`tel:${b.phone}`}>{b.phone}</a>
                  </td>
                  <td>{b.guests}</td>
                  <td>{b.area || '—'}</td>
                  <td>
                    <span className={statusClass(b.status)}>{b.status}</span>
                    {b.message ? (
                      <p className="adm-booking-msg" title="Guest message">
                        {b.message}
                      </p>
                    ) : null}
                  </td>
                  <td>
                    <input
                      className="adm-input adm-input--table"
                      value={notes[b.id] || ''}
                      onChange={(e) => setNotes((prev) => ({ ...prev, [b.id]: e.target.value }))}
                      placeholder="Optional"
                      disabled={String(b.status).toLowerCase() !== 'pending'}
                    />
                  </td>
                  <td className="adm-td-actions adm-td-actions--stack">
                    {String(b.status).toLowerCase() === 'pending' ? (
                      <>
                        <button
                          type="button"
                          className="adm-btn adm-btn--gold adm-btn--sm"
                          disabled={actingId === b.id}
                          onClick={() => handleUpdate(b.id, 'confirmed')}
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          className="adm-btn adm-btn--danger adm-btn--sm"
                          disabled={actingId === b.id}
                          onClick={() => handleUpdate(b.id, 'rejected')}
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <span className="adm-muted">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
