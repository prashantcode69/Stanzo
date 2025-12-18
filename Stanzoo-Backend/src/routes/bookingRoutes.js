import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// POST /api/bookings
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: "Error creating booking" });
  }
});

// GET /api/bookings/my?email=...
router.get("/my", async (req, res) => {
  const { email } = req.query;
  try {
    const bookings = await Booking.find({ guestEmail: email }).populate("room");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

export default router;
