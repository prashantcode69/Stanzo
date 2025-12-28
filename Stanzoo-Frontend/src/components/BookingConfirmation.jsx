import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiUser, FiMail, FiPhone, FiMapPin, FiEdit3, FiMoon } from 'react-icons/fi';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state || {};
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Booking confirmed:', { ...bookingData, ...formData });
    setIsSubmitting(false);
    navigate('/');
     const fullBooking = {
    ...bookingData,
    ...formData,
    status: 'confirmed',
    bookingId: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    bookingDate: new Date().toLocaleDateString(),
    total: (bookingData.price || 320) * (bookingData.nights || 2)
  };
  try {
    // Call YOUR BACKEND
    const response = await fetch('http://localhost:3001/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullBooking)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    
    // Also save locally
    const existingBookings = JSON.parse(localStorage.getItem('stanzooBookings') || '[]');
    existingBookings.push(fullBooking);
    localStorage.setItem('stanzooBookings', JSON.stringify(existingBookings));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => navigate('/bookings'), 2000);
  } catch (error) {
    console.error('Booking error:', error);
    alert('Booking failed: ' + error.message);
    setIsSubmitting(false);
  }
};

  const nights = bookingData.nights || 2;
  const totalPrice = (bookingData.price || 320) * nights;

  if (!bookingData.roomType) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem'
      }}>
        <div style={{ 
          textAlign: 'center', maxWidth: 400, padding: '3rem 2rem', 
          background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', 
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px'
        }}>
          <FiEdit3 style={{ width: 48, height: 48, margin: '0 auto 1.5rem', color: '#6366f1' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1rem' }}>No booking selected</h2>
          <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1rem' }}>Please select dates and room type first</p>
          <button 
            onClick={() => navigate('/')} 
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '12px 28px',
              borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', color: 'white',
              border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(99,102,241,0.4)'
            }}
          >
            <FiArrowLeft style={{ width: 18, height: 18 }} /> Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  const glassCard = {
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
  };

  const inputBase = {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#f8fafc',
    padding: '14px 16px',
    borderRadius: '12px',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    width: '100%'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 40%, #16213e 100%)',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')} 
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, color: '#cbd5e1',
            padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.02)', fontSize: '0.9rem', marginBottom: '2.5rem',
            cursor: 'pointer', transition: 'all 0.2s ease'
          }}
        >
          <FiArrowLeft style={{ width: 16, height: 16 }} />
          Back to Stanzoo
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700,
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '0.75rem', letterSpacing: '-0.025em'
          }}>
            Confirm Your Stay
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', fontWeight: 400 }}>
            Complete your Stanzoo reservation
          </p>
        </div>

        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr', '@media(max-width:768px)': '1fr' }}>
          {/* Summary Card */}
          <div style={{ ...glassCard, padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{
                width: 40, height: 40, background: 'linear-gradient(135deg, #10b981, #34d399)',
                borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <FiCheckCircle style={{ width: 20, height: 20, color: 'white' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>Booking Summary</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>Review details</p>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ 
                color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.75rem',
                fontWeight: 500, letterSpacing: '0.025em' 
              }}>
                {bookingData.roomType}
              </div>
              <div style={{
                fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc',
                marginBottom: '1.25rem'
              }}>
                {bookingData.guests || 2} Guests • {nights} Nights
              </div>
              <div style={{
                fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 700,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                ₹{totalPrice.toLocaleString()}
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                Includes all taxes & fees
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div style={{ ...glassCard, padding: '2rem' }}>
            <h3 style={{ 
              fontSize: '1.25rem', fontWeight: 600, color: '#f8fafc', 
              marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              <FiUser style={{ width: 22, height: 22 }} />
              Guest Information
            </h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <label style={{ 
                    display: 'flex', alignItems: 'center', gap: '6px', 
                    color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem'
                  }}>
                    <FiUser style={{ width: 14, height: 14 }} />
                    First name *
                  </label>
                  <input 
                    name="firstName" required placeholder="John" 
                    style={inputBase} onChange={handleChange}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'flex', alignItems: 'center', gap: '6px', 
                    color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem'
                  }}>
                    <FiUser style={{ width: 14, height: 14 }} />
                    Last name *
                  </label>
                  <input 
                    name="lastName" required placeholder="Doe" 
                    style={inputBase} onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label style={{ 
                  display: 'flex', alignItems: 'center', gap: '6px', 
                  color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem'
                }}>
                  <FiMail style={{ width: 14, height: 14 }} />
                  Email address *
                </label>
                <input 
                  name="email" type="email" required 
                  placeholder="john.doe@email.com" style={inputBase} onChange={handleChange}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'flex', alignItems: 'center', gap: '6px', 
                  color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem'
                }}>
                  <FiPhone style={{ width: 14, height: 14 }} />
                  Phone number *
                </label>
                <input 
                  name="phone" type="tel" required 
                  placeholder="+91 98765 43210" style={inputBase} onChange={handleChange}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'flex', alignItems: 'center', gap: '6px', 
                  color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem'
                }}>
                  <FiMapPin style={{ width: 14, height: 14 }} />
                  Billing address
                </label>
                <textarea 
                  name="address" style={{ ...inputBase, height: '90px', resize: 'vertical' }} 
                  placeholder="123 Ocean Drive, Coastal City..." onChange={handleChange}
                />
              </div>

              <div style={{ 
                display: 'flex', flexDirection: 'column', gap: '1rem', 
                paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)'
              }}>
                <button 
                  type="button" onClick={() => navigate('/')}
                  style={{
                    padding: '14px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.02)', color: '#cbd5e1', fontWeight: 500,
                    fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <FiArrowLeft style={{ width: 16, height: 16 }} />
                  Back to rooms
                </button>
                
                <button 
                  type="submit" disabled={isSubmitting}
                  style={{
                    padding: '16px 24px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                    color: 'white', fontWeight: 600, fontSize: '1rem',
                    border: 'none', cursor: 'pointer', boxShadow: '0 8px 25px rgba(99,102,241,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite'
                      }} />
                      Confirming...
                    </>
                  ) : (
                    <>
                      Confirm booking
                      <FiCheckCircle style={{ width: 18, height: 18 }} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          [style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default BookingConfirmation;
