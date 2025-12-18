import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import aiRoutes from "./src/routes/aiRoutes.js";
import roomRoutes from "./src/routes/roomRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";

console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("DEBUG: Gemini API Key loaded:", !!process.env.GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/stanzoo";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error", err));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "stanzoo-backend" });
});

app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(PORT, () => {
  console.log(`Stanzoo backend running on http://localhost:${PORT}`);
});
