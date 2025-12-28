import React, { useState } from "react";
import { FiCalendar, FiUsers, FiMoon, FiChevronRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const BookingCard = ({ onSearch }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
    roomType: "ocean-suite",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create booking data from form state
    const roomTypeMap = {
      "ocean-suite": "Ocean suite • $320 / night",
      "garden-loft": "Garden loft • $240 / night", 
      "penthouse": "Skyline penthouse • $540 / night",
      "bungalow": "Beachfront bungalow • $180 / night",
      "villa": "Cliffside villa • $450 / night",
    };

    const bookingData = {
      roomType: roomTypeMap[form.roomType] || "Ocean suite • $320 / night",
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: parseInt(form.guests),
      price: parseInt(roomTypeMap[form.roomType]?.match(/\$(\d+)/)?.[1]) || 320,
      nights: Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24))
    };

    // Both actions: filter rooms AND navigate to confirmation
    const roomNameMap = {
      "ocean-suite": "Oceanfront Suite",
      "garden-loft": "Verdant Garden Loft",
      "penthouse": "Skyline Penthouse",
      "bungalow": "Beachfront Bungalow",
      "villa": "Cliffside Villa",
    };
    
    onSearch({
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: form.guests,
      roomType: roomNameMap[form.roomType] || form.roomType,
    });

    // Navigate to confirmation with booking data
    navigate('/booking-confirm', { state: bookingData });
  };

  return (
    <aside
      className="glass"
      style={{
        padding: 18,
        alignSelf: "flex-start",
        position: "sticky",
        top: 90,
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              background: "rgba(248,250,252,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiMoon size={14} />
          </span>
          <h2 style={{ fontSize: 16 }}>Plan your stay</h2>
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af" }}>
          Real‑time availability, flexible check‑in, and late checkout on weekends.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ fontSize: 11, color: "#9ca3af" }}>
          Check‑in
          <div
            style={{
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 10px",
              borderRadius: 999,
              border: "1px solid rgba(148,163,184,0.6)",
              background: "#020617",
            }}
          >
            <FiCalendar size={14} />
            <input
              type="date"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#e5e7eb",
                fontSize: 12,
              }}
            />
          </div>
        </label>

        <label style={{ fontSize: 11, color: "#9ca3af" }}>
          Check‑out
          <div
            style={{
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 10px",
              borderRadius: 999,
              border: "1px solid rgba(148,163,184,0.6)",
              background: "#020617",
            }}
          >
            <FiCalendar size={14} />
            <input
              type="date"
              name="checkOut"
              value={form.checkOut}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#e5e7eb",
                fontSize: 12,
              }}
            />
          </div>
        </label>

        <label style={{ fontSize: 11, color: "#9ca3af" }}>
          Guests
          <div
            style={{
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 10px",
              borderRadius: 999,
              border: "1px solid rgba(148,163,184,0.6)",
              background: "#020617",
            }}
          >
            <FiUsers size={14} />
            <input
              type="number"
              min={1}
              max={6}
              name="guests"
              value={form.guests}
              onChange={handleChange}
              style={{
                width: 40,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#e5e7eb",
                fontSize: 12,
              }}
            />
          </div>
        </label>

        <label style={{ fontSize: 11, color: "#9ca3af" }}>
          Room type
          <select
            name="roomType"
            value={form.roomType}
            onChange={handleChange}
            style={{
              marginTop: 4,
              width: "100%",
              padding: "8px 10px",
              borderRadius: 999,
              border: "1px solid rgba(148,163,184,0.6)",
              background: "#020617",
              color: "#e5e7eb",
              fontSize: 12,
            }}
          >
            <option value="ocean-suite">Ocean suite • $320 / night</option>
            <option value="garden-loft">Garden loft • $240 / night</option>
            <option value="penthouse">Skyline penthouse • $540 / night</option>
            <option value="bungalow">Beachfront bungalow • $180 / night</option>
            <option value="villa">Cliffside villa • $450 / night</option>
          </select>
        </label>

        <button
          type="submit"
          style={{
            marginTop: 4,
            padding: "10px 14px",
            borderRadius: 999,
            border: "none",
            background:
              "linear-gradient(135deg, #f97316, #fb923c 40%, #22c55e 120%)",
            color: "#0b1120",
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
          }}
        >
          Check availability
          <FiChevronRight size={16} />
        </button>
        
        <button
          type="button"
          onClick={() => onSearch(null)}
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid rgba(248,250,252,0.2)",
            background: "transparent",
            color: "#9ca3af",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          View all rooms
        </button>
        
        <p
          style={{
            margin: 0,
            marginTop: 4,
            fontSize: 10,
            color: "#6b7280",
            textAlign: "center",
          }}
        >
          No prepayment needed • Free cancellation up to 7 days before arrival
        </p>
      </form>
    </aside>
  );
};

export default BookingCard;
