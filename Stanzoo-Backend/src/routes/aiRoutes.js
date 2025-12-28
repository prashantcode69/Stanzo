import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// ✅ FIX: Verify API key exists at startup
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ ERROR: GEMINI_API_KEY is not set in .env");
} else {
  console.log("✅ GEMINI_API_KEY loaded successfully");
}

// Initialize Gemini API
let genAI;
try {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log("✅ Gemini AI initialized");
} catch (err) {
  console.error("❌ Failed to initialize Gemini:", err.message);
}

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    // ✅ FIX: Validate request body
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        reply: "Invalid request: messages array is required",
      });
    }

    if (messages.length === 0) {
      return res.status(400).json({
        reply: "Invalid request: messages array is empty",
      });
    }

    console.log("📨 Received user message:", messages[messages.length - 1].content);

    // ✅ FIX: Verify API key before making request
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        reply: "Server configuration error: API key not found",
      });
    }

    if (!genAI) {
      return res.status(500).json({
        reply: "Server error: AI service not initialized",
      });
    }

    const systemPrompt = `You are Stanzoo's friendly hotel concierge AI assistant. You help guests with hotel services.

🏨 Stanzoo - Miramar, Portugal
Rating: 4.9 ⭐ | 320+ happy guests | Available Rooms

Featured Rooms:
1. Oceanfront Suite - $320/night
   - 54m² | 2 guests | Wi-Fi, Breakfast, Infinity pool
   
2. Verdant Garden Loft - $240/night
   - 42m² | 2 guests | Wi-Fi, Breakfast
   
3. Skyline Penthouse - $540/night
   - 78m² | 4 guests | Wi-Fi, Breakfast, In-suite spa
   
4. Beachfront Bungalow - $180/night
   - 38m² | 2 guests | Wi-Fi, Breakfast, Beach access
   
5. Cliffside Villa - $450/night
   - 65m² | 4 guests | Wi-Fi, Breakfast, Private pool

Services:
- 24/7 Concierge
- Real-time availability
- Flexible check-in/checkout
- Free cancellation (7 days before)
- Spa, Dining, Water sports

Keep responses short (2-3 sentences), friendly, and suggest rooms based on guest needs.`;

    console.log("🤖 Calling Gemini API...");

    // ✅ FIX: Properly format messages for Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Convert messages to proper format
    let prompt = systemPrompt + "\n\n";
    for (const msg of messages) {
      prompt += `${msg.role === "user" ? "Guest" : "Concierge"}: ${msg.content}\n`;
    }
    prompt += "Concierge:";

    console.log("📝 Prompt length:", prompt.length);

    const result = await model.generateContent(prompt);

    if (!result.response) {
      return res.status(500).json({
        reply: "No response from AI service. Please try again.",
      });
    }

    const reply = result.response.text();

    if (!reply) {
      return res.status(500).json({
        reply: "Failed to generate response. Please try again.",
      });
    }

    console.log("✅ Gemini response:", reply.substring(0, 100));
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("❌ Error in /api/ai:", err.message);
    console.error("Stack:", err.stack);

    // ✅ FIX: Return specific error messages for debugging
    let errorMessage = "Sorry, I'm having trouble responding!";

    if (err.message.includes("API_KEY")) {
      errorMessage = "Server configuration error. Please contact support.";
    } else if (err.message.includes("rate limit")) {
      errorMessage = "Too many requests. Please wait a moment and try again.";
    } else if (err.message.includes("network")) {
      errorMessage = "Network error. Please check your connection.";
    }

    return res.status(500).json({ reply: errorMessage });
  }
});

export default router;
