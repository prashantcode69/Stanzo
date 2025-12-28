import React, { useState, useEffect } from "react";
import { FiCalendar, FiUsers, FiCheck, FiX, FiClock } from "react-icons/fi";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = localStorage.getItem("stanzooBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <FiCheck style={{ color: "#10b981", width: 20, height: 20 }} />;
      case "pending":
        return <FiClock style={{ color: "#f97316", width: 20, height: 20 }} />;
      case "cancelled":
        return <FiX style={{ color: "#ef4444", width: 20, height: 20 }} />;
      default:
        return null;
    }
  };

  return (
    <main style={{ padding: "40px 20px", maxWidth: 1120, margin: "0 auto" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: "#f8fafc", marginBottom: 12 }}>
          My Bookings
        </h1>
        <p style={{ color: "#94a3b8", fontSize: 16 }}>
          Track and manage your Stanzoo reservations
        </p>
      </div>

      {bookings.length === 0 ? (
        <div
          style={{
            padding: 60,
            textAlign: "center",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ fontSize: 60, marginBottom: 20 }}>📭</div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: "#f8fafc", marginBottom: 8 }}>
            No bookings yet
          </h3>
          <p style={{ color: "#94a3b8" }}>
            Start planning your coastal luxury getaway by booking a room!
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 20 }}>
          {bookings.map((booking, idx) => (
            <div
              key={idx}
              style={{
                padding: 24,
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: "#f8fafc", margin: 0 }}>
                    {booking.roomType}
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: 14, margin: "6px 0 0 0" }}>
                    Booking ID: {booking.bookingId || `BK${idx + 1001}`}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: booking.status === "confirmed" ? "rgba(16,185,129,0.1)" : "rgba(249,115,22,0.1)", borderRadius: 8 }}>
                  {getStatusIcon(booking.status)}
                  <span style={{ color: booking.status === "confirmed" ? "#10b981" : "#f97316", fontWeight: 600, fontSize: 14, textTransform: "capitalize" }}>
                    {booking.status}
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 12, marginBottom: 4 }}>
                    <FiCalendar style={{ width: 16, height: 16 }} />
                    Check-in
                  </div>
                  <p style={{ color: "#f8fafc", fontWeight: 600, margin: 0 }}>{booking.checkIn}</p>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 12, marginBottom: 4 }}>
                    <FiCalendar style={{ width: 16, height: 16 }} />
                    Check-out
                  </div>
                  <p style={{ color: "#f8fafc", fontWeight: 600, margin: 0 }}>{booking.checkOut}</p>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 12, marginBottom: 4 }}>
                    <FiUsers style={{ width: 16, height: 16 }} />
                    Guests
                  </div>
                  <p style={{ color: "#f8fafc", fontWeight: 600, margin: 0 }}>{booking.guests}</p>
                </div>

                <div>
                  <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 4 }}>Total Price</div>
                  <p style={{ color: "#10b981", fontWeight: 700, fontSize: 18, margin: 0 }}>₹{booking.total?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default BookingsPage;
