import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiX } from "react-icons/fi";
import API_BASE from "../api";

const bubbleBase = {
  borderRadius: 16,
  padding: "10px 14px",
  fontSize: 13,
  maxWidth: "80%",
  lineHeight: 1.5,
  wordWrap: "break-word",
};

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! 👋 I'm Stanzoo's AI concierge. Ask me about rooms, pricing, amenities, or how to book your stay!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      // ✅ FIX: Use API_BASE instead of hardcoded URL
      // ✅ FIX: Remove duplicate "https://" in URL
      const res = await fetch(`${API_BASE}/api/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      // ✅ FIX: Check response status before parsing
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`HTTP ${res.status}:`, errorText.slice(0, 200));
        throw new Error(`HTTP Error ${res.status}`);
      }

      // ✅ FIX: Verify content type is JSON
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        throw new Error("No reply received from server");
      }
    } catch (err) {
      console.error("Chat error:", err.message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${err.message}. Please try again!`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 50,
          borderRadius: 999,
          border: "none",
          padding: "12px 24px",
          background: open
            ? "rgba(249,115,22,0.8)"
            : "linear-gradient(135deg, #f97316, #fb923c)",
          color: "#0b1120",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(249,115,22,0.3)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
        onMouseEnter={(e) => {
          if (!open) e.target.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
        }}
      >
        {open ? "Close" : "💬 Ask AI"}
      </button>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 20,
            bottom: 90,
            width: 360,
            height: 520,
            display: "flex",
            flexDirection: "column",
            borderRadius: 20,
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(20,30,50,0.95))",
            border: "1px solid rgba(249,115,22,0.3)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            zIndex: 50,
            animation: "slideUp 0.3s ease",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px",
              background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(251,146,60,0.1))",
              borderBottom: "1px solid rgba(249,115,22,0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "20px 20px 0 0",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#f97316",
                  marginBottom: 2,
                }}
              >
                Stanzoo Concierge
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>
                ● Online • Instant replies
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(249,115,22,0.1)",
                border: "1px solid rgba(249,115,22,0.2)",
                cursor: "pointer",
                color: "#f97316",
                padding: "6px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(249,115,22,0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(249,115,22,0.1)";
              }}
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: "16px",
              background: "rgba(15,23,42,0.4)",
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent:
                    m.role === "user" ? "flex-end" : "flex-start",
                  animation: "fadeIn 0.3s ease",
                }}
              >
                <div
                  style={{
                    ...bubbleBase,
                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg, #f97316, #fb923c)"
                        : "rgba(148,163,184,0.12)",
                    color: m.role === "user" ? "#0b1120" : "#e5e7eb",
                    fontWeight: m.role === "user" ? 500 : 400,
                    border:
                      m.role === "user"
                        ? "none"
                        : "1px solid rgba(249,115,22,0.15)",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    ...bubbleBase,
                    background: "rgba(148,163,184,0.12)",
                    color: "#9ca3af",
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#f97316",
                      animation: "bounce 1.4s infinite",
                    }}
                  />
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#f97316",
                      animation: "bounce 1.4s infinite 0.2s",
                    }}
                  />
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#f97316",
                      animation: "bounce 1.4s infinite 0.4s",
                    }}
                  />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={sendMessage}
            style={{
              display: "flex",
              gap: 8,
              padding: "14px",
              background: "rgba(15,23,42,0.4)",
              borderTop: "1px solid rgba(249,115,22,0.2)",
              borderRadius: "0 0 20px 20px",
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
                border: "1px solid rgba(249,115,22,0.3)",
                background: "rgba(30,41,59,0.7)",
                color: "#e5e7eb",
                fontSize: 12,
                padding: "10px 14px",
                outline: "none",
                transition: "all 0.2s",
                cursor: loading ? "not-allowed" : "text",
                opacity: loading ? 0.7 : 1,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(249,115,22,0.6)";
                e.target.style.background = "rgba(30,41,59,0.9)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(249,115,22,0.3)";
                e.target.style.background = "rgba(30,41,59,0.7)";
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                borderRadius: 999,
                border: "none",
                padding: "10px 14px",
                fontSize: 13,
                fontWeight: 600,
                background:
                  loading || !input.trim()
                    ? "rgba(249,115,22,0.4)"
                    : "linear-gradient(135deg, #f97316, #fb923c)",
                color: "#0b1120",
                cursor:
                  loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!loading && input.trim()) {
                  e.target.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
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

            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes bounce {
              0%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-8px); }
            }

            div::-webkit-scrollbar {
              width: 6px;
            }

            div::-webkit-scrollbar-track {
              background: transparent;
            }

            div::-webkit-scrollbar-thumb {
              background: rgba(249,115,22,0.3);
              border-radius: 3px;
            }

            div::-webkit-scrollbar-thumb:hover {
              background: rgba(249,115,22,0.5);
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
