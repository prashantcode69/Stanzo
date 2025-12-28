import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { createBooking } from '../api';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state || {};
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const fullBooking = {
        roomType: bookingData.roomType,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        nights: bookingData.nights || 2,
        guests: bookingData.guests || 2,
        price: bookingData.price || 320,
        totalPrice: (bookingData.price || 320) * (bookingData.nights || 2),
        guestFirstName: formData.firstName,
        guestLastName: formData.lastName,
        guestEmail: formData.email,
        guestPhone: formData.phone,
        guestAddress: formData.address,
        specialRequests: formData.specialRequests,
        status: 'confirmed'
      };
      
      const response = await createBooking(fullBooking);
      
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
    } catch (err) {
      setIsSubmitting(false);
      setError(err.message || 'Error creating booking. Please try again.');
    }
  };
  
  if (showSuccess) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '20px', maxWidth: 400 }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>✅</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#f8fafc', marginBottom: 12 }}>Booking Confirmed!</h2>
          <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 24 }}>Your reservation has been successfully booked. Redirecting to your bookings...</p>
          <div style={{ display: 'inline-block', padding: '12px 24px', background: 'linear-gradient(135deg, #10b981, #34d399)', borderRadius: '8px', color: 'white', fontWeight: 600 }}>
            Booking Confirmed
          </div>
        </div>
      </div>
    );
  }
  
  if (!bookingData.roomType) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f8fafc', marginBottom: 16 }}>No booking selected</h2>
          <p style={{ color: '#94a3b8', marginBottom: 32 }}>Please select dates and room type first</p>
          <button onClick={() => navigate('/')} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 14px rgba(99,102,241,0.4)' }}>
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }
  
  const nights = bookingData.nights || 2;
  const totalPrice = (bookingData.price || 320) * nights;
  
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 40%, #16213e 100%)', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <button onClick={() => navigate('/')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#cbd5e1', padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', fontSize: 14, marginBottom: 32, cursor: 'pointer' }}>
          <FiArrowLeft size={16} /> Back to Home
        </button>
        
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 40, fontWeight: 700, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 12 }}>Confirm Your Booking</h1>
          <p style={{ color: '#94a3b8', fontSize: 18 }}>Complete your Stanzoo reservation</p>
        </div>
        
        <div style={{ display: 'grid', gap: 32, gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #10b981, #34d399)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiCheckCircle style={{ width: 20, height: 20, color: 'white' }} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: '#f8fafc', margin: 0 }}>Booking Summary</h3>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8 }}>{bookingData.roomType}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#f8fafc', marginBottom: 20 }}>
                {bookingData.guests || 2} Guests • {nights} Nights
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, background: 'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {totalPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </div>
              <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 8 }}>Includes all taxes & fees</p>
            </div>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: '#f8fafc', marginBottom: 24 }}>Guest Information</h3>
            
            {error && <div style={{ color: '#ef4444', marginBottom: 16, padding: '12px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}>{error}</div>}
            
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input name='firstName' required placeholder='First name' value={formData.firstName} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)', color: '#f8fafc', padding: '14px 16px', borderRadius: '12px', fontSize: 14 }} onChange={handleChange} />
                <input name='lastName' required placeholder='Last name' value={formData.lastName} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)', color: '#f8fafc', padding: '14px 16px', borderRadius: '12px', fontSize: 14 }} onChange={handleChange} />
              </div>
              <input name='email' type='email' required placeholder='Email' value={formData.email} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)', color: '#f8fafc', padding: '14px 16px', borderRadius: '12px', fontSize: 14 }} onChange={handleChange} />
              <input name='phone' type='tel' required placeholder='Phone' value={formData.phone} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)', color: '#f8fafc', padding: '14px 16px', borderRadius: '12px', fontSize: 14 }} onChange={handleChange} />
              <textarea name='address' placeholder='Address' value={formData.address} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)', color: '#f8fafc', padding: '14px 16px', borderRadius: '12px', fontSize: 14, height: 80, resize: 'vertical' }} onChange={handleChange} />
              <textarea name='specialRequests' placeholder='Special Requests (Optional)' value={formData.specialRequests} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)', color: '#f8fafc', padding: '14px 16px', borderRadius: '12px', fontSize: 14, height: 60, resize: 'vertical' }} onChange={handleChange} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button type='button' onClick={() => navigate('/')} style={{ padding: '16px 20px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.02)', color: '#cbd5e1', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                  Back
                </button>
                <button type='submit' disabled={isSubmitting} style={{ padding: '16px 20px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)', color: 'white', fontWeight: 600, fontSize: 14, border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 8px 25px rgba(99,102,241,0.4)', opacity: isSubmitting ? 0.6 : 1 }}>
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
