import React, { useEffect, useState } from "react";
import { FiWifi, FiCoffee, FiWind } from "react-icons/fi";

const RoomGrid = ({ filteredRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [displayRooms, setDisplayRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/rooms");
        const data = await res.json();
        console.log("All rooms loaded:", data); // DEBUG
        setRooms(data); // SET ALL ROOMS - NO LIMIT
        setDisplayRooms(data); // SHOW ALL INITIALLY
      } catch (err) {
        console.error("Error loading rooms", err);
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
    } else {
      setDisplayRooms(rooms); // SHOW ALL WHEN NO FILTER
    }
  }, [filteredRoom, rooms]);

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
        {displayRooms.length > 0 ? (
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
