import React, { useState, useEffect } from 'react';
import { FiCalendar, FiUsers, FiCheck, FiX, FiClock } from 'react-icons/fi';
import { getUserBookings } from '../api';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Try to get email from localStorage or use a default
        const userEmail = localStorage.getItem('userEmail') || 'user@stanzoo.com';
        
        const data = await getUserBookings(userEmail);
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FiCheck style={{ color: '#10b981', width: 20, height: 20 }} />;
      case 'pending':
        return <FiClock style={{ color: '#f97316', width: 20, height: 20 }} />;
      case 'cancelled':
        return <FiX style={{ color: '#ef4444', width: 20, height: 20 }} />;
      default:
        return null;
    }
  };

  return (
    <main style={{ padding: '40px 20px', maxWidth: 1120, margin: '0 auto' }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#f8fafc', marginBottom: 12 }}>
          My Bookings
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16 }}>
          Track and manage your Stanzoo reservations
        </p>
      </div>

      {error && (
        <div
          style={{
            padding: '16px',
            marginBottom: '20px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px',
            color: '#ef4444',
            fontSize: 14
          }}
        >
          {error}
        </div>
      )}

      {loading && (
        <div
          style={{
            padding: 60,
            textAlign: 'center',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ fontSize: 24, color: '#94a3b8' }}>Loading bookings...</div>
        </div>
      )}

      {!loading && bookings.length === 0 && !error && (
        <div
          style={{
            padding: 60,
            textAlign: 'center',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ fontSize: 60, marginBottom: 20 }}>📭</div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: '#f8fafc', marginBottom: 8 }}>
            No bookings yet
          </h3>
          <p style={{ color: '#94a3b8' }}>
            Start planning your coastal luxury getaway by booking a room!
          </p>
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div style={{ display: 'grid', gap: 20 }}>
          {bookings.map((booking, idx) => (
            <div
              key={booking._id || idx}
              style={{
                padding: 24,
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                    {booking.roomType}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, margin: '6px 0 0 0' }}>
                    Booking ID: {booking._id ? booking._id.substring(0, 8).toUpperCase() : 'N/A'}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: booking.status === 'confirmed' ? 'rgba(16,185,129,0.1)' : 'rgba(249,115,22,0.1)', borderRadius: 8 }}>
                  {getStatusIcon(booking.status)}
                  <span style={{ color: booking.status === 'confirmed' ? '#10b981' : '#f97316', fontWeight: 600, fontSize: 14, textTransform: 'capitalize' }}>
                    {booking.status}
                  </span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>
                    <FiCalendar style={{ width: 16, height: 16 }} />
                    Check-in
                  </div>
                  <p style={{ color: '#f8fafc', fontWeight: 600, margin: 0 }}>{booking.checkIn || 'N/A'}</p>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>
                    <FiCalendar style={{ width: 16, height: 16 }} />
                    Check-out
                  </div>
                  <p style={{ color: '#f8fafc', fontWeight: 600, margin: 0 }}>{booking.checkOut || 'N/A'}</p>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>
                    <FiUsers style={{ width: 16, height: 16 }} />
                    Guests
                  </div>
                  <p style={{ color: '#f8fafc', fontWeight: 600, margin: 0 }}>{booking.guests || 'N/A'}</p>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>Total Price</div>
                  <p style={{ color: '#10b981', fontWeight: 700, fontSize: 18, margin: 0 }}>
                    {booking.totalPrice ? `₹${booking.totalPrice.toLocaleString('en-IN')}` : 'N/A'}
                  </p>
                </div>
              </div>
              {booking.guestEmail && (
                <div style={{ paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: 13, color: '#94a3b8' }}>
                  Guest Email: {booking.guestEmail}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default BookingsPage;
