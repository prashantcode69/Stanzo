import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    console.log("📨 Received user message");

    const systemPrompt = `You are Stanzoo's friendly hotel concierge AI assistant. Keep responses short and friendly.

Rooms:
1. Oceanfront Suite - $320/night
2. Verdant Garden Loft - $240/night
3. Skyline Penthouse - $540/night
4. Beachfront Bungalow - $180/night
5. Cliffside Villa - $450/night`;

    const userMessage = messages[messages.length - 1].content;

    console.log("🤖 Calling TinyLlama...");

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "tinyllama",
        prompt: systemPrompt + "\n\nUser: " + userMessage + "\n\nAssistant:",
        stream: false,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error(`HTTP ${response.status}:`, await response.text());
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const reply = data.response ? data.response.trim() : "I couldn't generate a response.";

    console.log("✅ TinyLlama response:", reply.substring(0, 100));
    res.json({ reply });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({
      reply: "Sorry, I'm having trouble responding!",
    });
  }
});

export default router;
