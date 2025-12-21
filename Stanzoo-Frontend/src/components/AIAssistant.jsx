import React, { useState } from "react";
import { FiSend, FiX } from "react-icons/fi";
import API_BASE from "../api";

const bubbleBase = {
  borderRadius: 16,
  padding: "8px 12px",
  fontSize: 13,
  maxWidth: "85%",
  lineHeight: 1.4,
};

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm Stanzoo's AI concierge. Ask me about rooms, pricing, amenities, or how to book your stay!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");

    // Add user message to chat
    const nextMessages = [...messages, { role: "user", content: userText }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch("https://https://stanzo.onrender.com//api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting. Please try again later!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      // Around line 33-40, find this section:
<button
  onClick={() => setOpen((o) => !o)}
  style={{
    position: "fixed",
    right: window.innerWidth < 640 ? 15 : 20,
    bottom: window.innerWidth < 640 ? 15 : 20,
    zIndex: 50,
    borderRadius: 999,
    border: "none",
    padding: window.innerWidth < 640 ? "10px 15px" : "12px 20px",
    background: "linear-gradient(135deg, #f97316, #fb923c)",
    color: "#0b1120",
    fontSize: window.innerWidth < 640 ? 11 : 13,
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 20px 40px rgba(15,23,42,0.8)",
    transition: "all 0.3s",
  }}
  onMouseEnter={(e) =>
    (e.target.style.transform = "scale(1.05)")
  }
  onMouseLeave={(e) =>
    (e.target.style.transform = "scale(1)")
  }
>
  {open ? "Close" : "Ask Stanzoo AI"}
</button>


      {/* Chat window */}
      {open && (
  <div
    style={{
      position: "fixed",
      right: window.innerWidth < 640 ? 10 : 20,
      bottom: window.innerWidth < 640 ? 70 : 80,
      width: window.innerWidth < 640 ? "calc(100% - 20px)" : 340,
      maxHeight: window.innerWidth < 640 ? "60vh" : 500,
      maxWidth: 340,
      display: "flex",
      flexDirection: "column",
      borderRadius: 20,
      background: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.85))",
      border: "1px solid rgba(249,115,22,0.4)",
      boxShadow: "0 20px 60px rgba(15,23,42,0.95)",
      zIndex: 50,
      animation: "slideUp 0.3s ease",
    }}
  >
    {/* Rest of the chat content stays the same */}

          {/* Header */}
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid rgba(249,115,22,0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#e5e7eb" }}>
                Stanzoo Concierge
              </div>
              <div style={{ fontSize: 10, color: "#9ca3af" }}>
                Online • Instant replies
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9ca3af",
                padding: 4,
              }}
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              padding: "12px",
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    ...bubbleBase,
                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg, #f97316, #fb923c)"
                        : "rgba(248,250,252,0.1)",
                    color: m.role === "user" ? "#0b1120" : "#e5e7eb",
                    fontWeight: m.role === "user" ? 500 : 400,
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    ...bubbleBase,
                    background: "rgba(248,250,252,0.1)",
                    color: "#9ca3af",
                  }}
                >
                  <span style={{ animation: "pulse 1.5s infinite" }}>
                    Thinking...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            style={{
              display: "flex",
              gap: 6,
              padding: "12px",
              borderTop: "1px solid rgba(249,115,22,0.2)",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about rooms..."
              disabled={loading}
              style={{
                flex: 1,
                borderRadius: 999,
                border: "1px solid rgba(249,115,22,0.4)",
                background: "rgba(15,23,42,0.8)",
                color: "#e5e7eb",
                fontSize: 12,
                padding: "8px 12px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                borderRadius: 999,
                border: "none",
                padding: "8px 12px",
                fontSize: 12,
                fontWeight: 600,
                background: "#f97316",
                color: "#0b1120",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FiSend size={14} />
            </button>
          </form>

          <style>{`
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
