import React, { useEffect, useState } from "react";

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:4000/api/rooms");

        // Check HTTP status
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP Error ${res.status}`);
        }

        // Check content type
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        // Parse JSON
        const data = await res.json();
        
        // Only show first 3 rooms, ensure it's an array
        if (Array.isArray(data)) {
          setRooms(data.slice(0, 3));
        } else {
          console.warn("Expected array, got:", typeof data);
          setRooms([]);
        }
      } catch (err) {
        console.error("Error loading rooms:", err.message);
        setError(err.message);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  // Show loading state
  if (loading) {
    return <section style={{ marginBottom: 32 }}>Loading rooms...</section>;
  }

  // Show error state
  if (error) {
    return (
      <section style={{ marginBottom: 32, color: "#ef4444" }}>
        Error: {error}
      </section>
    );
  }

  // Show empty state
  if (rooms.length === 0) {
    return (
      <section style={{ marginBottom: 32 }}>No rooms available</section>
    );
  }

  return (
    <section
      style={{
        marginBottom: 32,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <h2 style={{ fontSize: 18, margin: 0 }}>Featured rooms</h2>
        <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 12 }}>
          Scroll to explore
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          paddingBottom: 8,
          scrollBehavior: "smooth",
        }}
      >
        {rooms.map((room) => (
          <div
            key={room._id}
            style={{
              flex: "0 0 300px",
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid rgba(148,163,184,0.5)",
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.85), rgba(15,23,42,0.6))",
              backdropFilter: "blur(26px)",
              padding: 16,
            }}
          >
            {/* Room image */}
            <div
              style={{
                position: "relative",
                height: 160,
                borderRadius: 16,
                overflow: "hidden",
                marginBottom: 12,
                border: "1px solid rgba(148,163,184,0.4)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${
                    room.images?.[0] ||
                    "https://images.pexels.com/photos/96444/pexels-photo-96444.jpeg"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(15,23,42,0.95), rgba(15,23,42,0.2))",
                }}
              />
              {/* Price badge */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background:
                    "linear-gradient(135deg, #f97316, #fb923c)",
                  color: "#0b1120",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                ${room.pricePerNight}/night
              </div>
            </div>

            {/* Room info */}
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                margin: "0 0 6px 0",
                color: "#e5e7eb",
              }}
            >
              {room.name}
            </h3>

            <p
              style={{
                fontSize: 11,
                color: "#9ca3af",
                margin: "0 0 10px 0",
                lineHeight: 1.4,
              }}
            >
              {room.description || "Luxury accommodation with premium amenities"}
            </p>

            {/* Room size */}
            <div
              style={{
                fontSize: 11,
                color: "#cbd5f5",
                marginBottom: 10,
              }}
            >
              {room.size || "–"} • {room.maxGuests || 2} guests
            </div>

            {/* Amenities */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              {(room.amenities || []).slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  style={{
                    padding: "3px 8px",
                    borderRadius: 999,
                    background: "rgba(249,115,22,0.15)",
                    color: "#fed7aa",
                    fontSize: 10,
                  }}
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomCarousel;
