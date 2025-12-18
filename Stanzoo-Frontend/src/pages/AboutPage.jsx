import React from "react";

const AboutPage = () => {
  return (
    <main className="app-main">
      <section
        className="glass"
        style={{
          padding: 24,
          marginBottom: 24,
        }}
      >
        <h1 style={{ fontSize: 26, marginBottom: 6 }}>About Stanzoo</h1>
        <p style={{ fontSize: 14, color: "#9ca3af", maxWidth: 560 }}>
          Stanzoo is a coastal boutique hideaway crafted for slow stays, ocean
          sunrises, and unhurried evenings by the water.
        </p>
      </section>

      <section
        className="glass"
        style={{
          padding: 20,
          display: "grid",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
            gap: 18,
          }}
        >
          <div style={{ fontSize: 13, color: "#e5e7eb", lineHeight: 1.6 }}>
            <p style={{ marginTop: 0 }}>
              Every suite at Stanzoo is designed around light, texture, and the
              sound of the sea. Natural materials, warm lighting, and curated
              amenities create a calm, modern space to unplug.
            </p>
            <p>
              Our team is on‑site 24/7 with a concierge desk that can help you
              plan day trips, private dinners, and wellness experiences tailored
              to your stay.
            </p>
          </div>

          <div
            style={{
              borderRadius: 18,
              border: "1px solid rgba(148,163,184,0.5)",
              padding: 14,
              background:
                "radial-gradient(circle at 0 0, rgba(56,189,248,0.16), rgba(15,23,42,0.98))",
              fontSize: 12,
              color: "#d1d5db",
            }}
          >
            <h2 style={{ fontSize: 14, marginTop: 0, marginBottom: 6 }}>
              Why guests love Stanzoo
            </h2>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              <li>Ocean‑view suites with private terraces.</li>
              <li>Thoughtful service and flexible check‑in.</li>
              <li>Access to pool, spa, and rooftop dining.</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: 4,
            fontSize: 11,
            color: "#6b7280",
            textAlign: "right",
          }}
        >
          Stanzoo · Miramar Coastline, Portugal · Est. 2025
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
