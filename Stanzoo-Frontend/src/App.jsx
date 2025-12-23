import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FiPhoneCall, FiMenu, FiX } from "react-icons/fi";
import Hero from "./components/Hero";
import BookingCard from "./components/BookingCard";
import RoomGrid from "./components/RoomGrid";
import RoomCarousel from "./components/RoomCarousel";
import AmenitiesPage from "./pages/AmenitiesPage";
import AboutPage from "./pages/AboutPage";
import AIAssistant from "./components/AIAssistant";
import "./index.css";

const HomePage = () => {
  const [filteredRoom, setFilteredRoom] = useState(null);
  return (
    <main className="app-main">
      <Hero />
      <RoomCarousel />
      <div className="rooms-booking-container">
        <RoomGrid filteredRoom={filteredRoom} />
        <BookingCard onSearch={setFilteredRoom} />
      </div>
    </main>
  );
};

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="app">
      <header className="app-header">
        <nav className="app-nav">
          <div className="nav-logo">
            <div className="logo-badge">
              <div className="logo-inner">
                <span className="logo-text">S</span>
              </div>
            </div>
            <div className="logo-info">
              <div className="logo-title">Stanzoo</div>
              <div className="logo-subtitle">Coastal luxury hotel</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links-desktop">
            <Link to="/" className="nav-link">
              Rooms
            </Link>
            <Link to="/amenities" className="nav-link">
              Amenities
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </div>

          <button className="concierge-btn">
            <FiPhoneCall size={16} />
            <span className="concierge-text">24/7 Concierge</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <Link
              to="/"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rooms
            </Link>
            <Link
              to="/amenities"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Amenities
            </Link>
            <Link
              to="/about"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <button className="mobile-concierge-btn">
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
      </Routes>

      <AIAssistant />

      <footer className="app-footer">
        © {new Date().getFullYear()} Stanzoo. Crafted in React.
      </footer>
    </div>
  );
};

export default App;
