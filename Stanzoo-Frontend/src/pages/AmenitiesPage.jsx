import React from "react";
import { FiWifi, FiCoffee, FiDroplet, FiWind, FiTv } from "react-icons/fi";

const tagStyle = {
  padding: "4px 10px",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.4)",
  fontSize: 11,
  color: "#e5e7eb",
  background: "rgba(15,23,42,0.85)",
};

const AmenitiesPage = () => {
  return (
    <main className="app-main">
      <section
        className="glass"
        style={{
          padding: 24,
          marginBottom: 24,
        }}
      >
        <h1 style={{ fontSize: 26, marginBottom: 6 }}>Amenities at Stanzoo</h1>
        <p style={{ fontSize: 14, color: "#9ca3af", maxWidth: 540 }}>
          Thoughtfully curated comforts so you can unplug, unwind, and stay a little longer.
        </p>
      </section>

      <section
        className="glass"
        style={{
          padding: 20,
          display: "grid",
          gap: 18,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 16,
          }}
        >
          {/* Room amenities */}
          <div>
            <h2 style={{ fontSize: 16, marginBottom: 6 }}>In‑room</h2>
            <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>
              Designed for slow mornings, late‑night movies, and everything in between.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <span style={tagStyle}>
                <FiWifi size={12} style={{ marginRight: 6 }} />
                High‑speed Wi‑Fi
              </span>
              <span style={tagStyle}>
                <FiTv size={12} style={{ marginRight: 6 }} />
                55&quot; smart TV
              </span>
              <span style={tagStyle}>
                <FiCoffee size={12} style={{ marginRight: 6 }} />
                Specialty coffee station
              </span>
              <span style={tagStyle}>
                <FiWind size={12} style={{ marginRight: 6 }} />
                Climate control
              </span>
            </div>
          </div>

          {/* Wellness */}
          <div>
            <h2 style={{ fontSize: 16, marginBottom: 6 }}>Wellness</h2>
            <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>
              Restore body and mind with ocean‑facing wellness spaces.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <span style={tagStyle}>Infinity pool access</span>
              <span style={tagStyle}>Ocean‑view yoga deck</span>
              <span style={tagStyle}>On‑call spa therapists</span>
              <span style={tagStyle}>Sauna &amp; steam rooms</span>
            </div>
          </div>

          {/* Dining */}
          <div>
            <h2 style={{ fontSize: 16, marginBottom: 6 }}>Dining</h2>
            <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>
              Local flavors, slow‑crafted menus, and all‑day bites.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <span style={tagStyle}>Breakfast in suite</span>
              <span style={tagStyle}>Rooftop restaurant</span>
              <span style={tagStyle}>Poolside bar</span>
              <span style={tagStyle}>24/7 in‑room dining</span>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 6,
            fontSize: 11,
            color: "#6b7280",
            textAlign: "right",
          }}
        >
          Need something specific for your stay? Contact the Stanzoo concierge any time.
        </div>
      </section>
    </main>
  );
};

export default AmenitiesPage;
