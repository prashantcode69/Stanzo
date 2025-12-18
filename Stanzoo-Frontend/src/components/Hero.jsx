import React from "react";
import { FiMapPin, FiStar, FiAward, FiUsers } from "react-icons/fi";

const Hero = () => {
  return (
    <section
      className="glass"
      style={{
        padding: 24,
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)",
        gap: 20,
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            borderRadius: 999,
            border: "1px solid rgba(248,250,252,0.12)",
            fontSize: 11,
            color: "#e5e7eb",
            marginBottom: 10,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background:
                "radial-gradient(circle, #22c55e 0, #16a34a 50%, transparent 70%)",
              boxShadow: "0 0 0 6px rgba(34,197,94,0.3)",
            }}
          />
          Est. 2020 • Award-winning
        </div>

        <h1 style={{ fontSize: 34, lineHeight: 1.1, marginBottom: 8 }}>
          Welcome to{" "}
          <span style={{ color: "#fed7aa" }}>Stanzoo Luxury Retreats</span>.
        </h1>

        <p style={{ fontSize: 14, color: "#9ca3af", maxWidth: 460 }}>
          Experience coastal luxury at its finest. Stanzoo is a boutique hotel chain
          dedicated to slow travel, curated experiences, and unforgettable moments
          by the ocean. Every stay is crafted for relaxation and rejuvenation.
        </p>

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            fontSize: 12,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#e5e7eb" }}>
            <FiAward size={16} color="#f97316" />
            5-star rated hotel
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#e5e7eb" }}>
            <FiUsers size={16} color="#f97316" />
            320+ happy guests
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#e5e7eb" }}>
            <FiMapPin size={16} color="#f97316" />
            Miramar, Portugal
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#e5e7eb" }}>
            <FiStar size={16} color="#f97316" />
            4.9 rating
          </span>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          height: 210,
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid rgba(148,163,184,0.4)",
          background:
            "radial-gradient(circle at 0 0, #22d3ee 0, #0f172a 40%, #020617 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(1.15) contrast(1.03)",
            transform: "scale(1.02)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(15,23,42,0.78), rgba(15,23,42,0.07))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 14,
            right: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
            color: "#e5e7eb",
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>Luxury Experiences</div>
            <div style={{ color: "#cbd5f5", fontSize: 11 }}>
              Spa • Dining • Water sports
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>Reserve now</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>
              from
              <span style={{ fontSize: 11, color: "#9ca3af" }}> $240</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
