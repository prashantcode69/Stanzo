import React, { useEffect, useState } from "react";
import { FiWifi, FiCoffee, FiWind } from "react-icons/fi";
import API_BASE from "../api";

const RoomGrid = ({ filteredRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [displayRooms, setDisplayRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch rooms from API
        const res = await fetch(`${API_BASE}/api/rooms`);

        // ✅ CHECK: Response status BEFORE parsing JSON
        if (!res.ok) {
          const text = await res.text();
          console.error(`HTTP ${res.status}:`, text.slice(0, 200));
          throw new Error(`HTTP Error ${res.status}`);
        }

        // ✅ CHECK: Content-Type is JSON
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Non-JSON response:", text.slice(0, 200));
          throw new Error("Response is not JSON");
        }

        // ✅ NOW safely parse JSON
        const data = await res.json();
        console.log("All rooms loaded:", data); // DEBUG

        // Ensure data is an array
        if (Array.isArray(data)) {
          setRooms(data);
          setDisplayRooms(data); // Show all initially
        } else {
          console.warn("Expected array, got:", typeof data);
          setRooms([]);
          setDisplayRooms([]);
        }
      } catch (err) {
        console.error("Error loading rooms:", err.message);
        setError(err.message);
        setRooms([]);
        setDisplayRooms([]);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  // Filter rooms when search changes
  useEffect(() => {
    if (filteredRoom && filteredRoom.roomType) {
      const filtered = rooms.filter(
        (room) => room.name === filteredRoom.roomType
      );
      setDisplayRooms(filtered);
      console.log("Filtered rooms:", filtered); // DEBUG
    } else {
      setDisplayRooms(rooms); // Show all when no filter
    }
  }, [filteredRoom, rooms]);

  // Loading state
  if (loading) {
    return (
      <section id="rooms">
        <h2 style={{ fontSize: 18 }}>Suites & residences</h2>
        <div style={{ padding: "20px", color: "#9ca3af", textAlign: "center" }}>
          Loading rooms...
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="rooms">
        <h2 style={{ fontSize: 18 }}>Suites & residences</h2>
        <div style={{ padding: "20px", color: "#ef4444", textAlign: "center" }}>
          Error: {error}
        </div>
      </section>
    );
  }

  return (
    <section id="rooms">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
          alignItems: "baseline",
        }}
      >
        <h2 style={{ fontSize: 18 }}>
          Suites & residences
          {filteredRoom?.roomType && (
            <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 8 }}>
              (Showing {displayRooms.length} available)
            </span>
          )}
        </h2>
        <div style={{ fontSize: 11, color: "#9ca3af" }}>
          Hand‑picked rooms for long, slow stays.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: 14,
        }}
      >
        {displayRooms && displayRooms.length > 0 ? (
          displayRooms.map((room) => (
            <article
              key={room._id}
              className="glass"
              style={{
                padding: 10,
                display: "grid",
                gridTemplateColumns: "120px minmax(0, 1fr)",
                gap: 12,
                alignItems: "center",
              }}
            >
              {/* Room image */}
              <div
                style={{
                  position: "relative",
                  height: 90,
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(148,163,184,0.6)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${
                      room.images?.[0] ||
                      "https://images.pexels.com/photos/96444/pexels-photo-96444.jpeg?auto=compress&cs=tinysrgb&w=1200"
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
                      "linear-gradient(to top, rgba(15,23,42,0.9), transparent 55%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 10,
                    bottom: 8,
                    fontSize: 11,
                    color: "#e5e7eb",
                  }}
                >
                  from{" "}
                  <span style={{ fontWeight: 600 }}>
                    ${room.pricePerNight}
                  </span>{" "}
                  <span style={{ color: "#9ca3af" }}>/ night</span>
                </div>
              </div>

              {/* Room info */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 4,
                  }}
                >
                  <h3 style={{ fontSize: 14 }}>{room.name}</h3>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>
                    {room.size || "–"}
                  </span>
                </div>

                {/* Amenities icons */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 6,
                    fontSize: 11,
                    color: "#9ca3af",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <FiWifi size={12} /> Wi‑Fi
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <FiCoffee size={12} /> Breakfast
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <FiWind size={12} /> Sea breeze
                  </span>
                </div>

                {/* Amenity tags */}
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                    fontSize: 11,
                  }}
                >
                  {(room.amenities || []).map((perk) => (
                    <span
                      key={perk}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 999,
                        background: "rgba(148,163,184,0.08)",
                        color: "#e5e7eb",
                      }}
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div
            style={{
              padding: 20,
              textAlign: "center",
              color: "#9ca3af",
              fontSize: 14,
            }}
          >
            No rooms available for your search criteria.
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomGrid;
