import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import Hero from "./components/Hero";
import BookingCard from "./components/BookingCard";
import RoomGrid from "./components/RoomGrid";
import RoomCarousel from "./components/RoomCarousel";
import AmenitiesPage from "./pages/AmenitiesPage";
import AboutPage from "./pages/AboutPage";
import BookingConfirmation from "./components/BookingConfirmation"; // New import
import AIAssistant from "./components/AIAssistant";
import "./index.css";

const HomePage = () => {
  const [filteredRoom, setFilteredRoom] = useState(null);
  return (
    <main className="app-main">
      <Hero />
      <RoomCarousel />
      <div
        style={{
          marginTop: 28,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: 24,
        }}
      >
        <RoomGrid filteredRoom={filteredRoom} />
        <BookingCard onSearch={setFilteredRoom} />
      </div>
    </main>
  );
};

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app">
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          backdropFilter: "blur(18px)",
          background:
            "linear-gradient(to bottom, rgba(2,6,23,0.96), rgba(2,6,23,0.7), transparent)",
          borderBottom: "1px solid rgba(148,163,184,0.35)",
        }}
      >
        <nav
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "18px 20px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "999px",
                background:
                  "conic-gradient(from 160deg, #f97316, #fb923c, #22d3ee, #4f46e5, #f97316)",
                padding: 2,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "999px",
                  background:
                    "radial-gradient(circle at 30% 0, #020617 0, #020617 55%, #020617 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: -1,
                    color: "#f9fafb",
                  }}
                >
                  S
                </span>
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: -0.03,
                }}
              >
                Stanzoo
              </div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>
                Coastal luxury hotel
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div
            className="nav-links-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              fontSize: 13,
            }}
          >
            <Link to="/" style={{ color: "#e5e7eb", textDecoration: "none" }}>
              Rooms
            </Link>
            <Link
              to="/amenities"
              style={{ color: "#9ca3af", textDecoration: "none" }}
            >
              Amenities
            </Link>
            <Link
              to="/about"
              style={{ color: "#9ca3af", textDecoration: "none" }}
            >
              About
            </Link>
          </div>

          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid rgba(249,115,22,0.45)",
              background:
                "radial-gradient(circle at 0 0, rgba(249,115,22,0.18), transparent 55%)",
              color: "#fed7aa",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            <FiPhoneCall size={16} />
            <span className="concierge-text">24/7 Concierge</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#e5e7eb",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "8px",
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu" style={{ display: "none" }}>
            <Link
              to="/"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                color: "#e5e7eb",
                textDecoration: "none",
                borderBottom: "1px solid rgba(148,163,184,0.2)",
                fontSize: "14px",
              }}
            >
              Rooms
            </Link>
            <Link
              to="/amenities"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                color: "#e5e7eb",
                textDecoration: "none",
                borderBottom: "1px solid rgba(148,163,184,0.2)",
                fontSize: "14px",
              }}
            >
              Amenities
            </Link>
            <Link
              to="/about"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                color: "#e5e7eb",
                textDecoration: "none",
                borderBottom: "1px solid rgba(148,163,184,0.2)",
                fontSize: "14px",
              }}
            >
              About
            </Link>
            <button
              className="mobile-concierge-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                padding: "12px 14px",
                marginTop: 8,
                borderRadius: 8,
                border: "1px solid rgba(249,115,22,0.45)",
                background:
                  "radial-gradient(circle at 0 0, rgba(249,115,22,0.18), transparent 55%)",
                color: "#fed7aa",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <FiPhoneCall size={16} />
              24/7 Concierge
            </button>
          </div>
        )}
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/amenities" element={<AmenitiesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking-confirm" element={<BookingConfirmation />} /> {/* New route */}
      </Routes>

      <AIAssistant />

      <footer
        style={{
          borderTop: "1px solid rgba(148,163,184,0.3)",
          padding: "16px 20px 24px",
          fontSize: 12,
          color: "#6b7280",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} Stanzoo. Crafted in React.
      </footer>
    </div>
  );
};

export default App;
