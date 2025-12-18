import express from "express";
import Room from "../models/Room.js";

const router = express.Router();

// GET /api/rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
});

// POST /api/rooms
router.post("/", async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: "Error creating room" });
  }
});
router.get("/", (req, res) => {
  res.json([]);
});

// DELETE /api/rooms/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByIdAndDelete(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted", room });
  } catch (err) {
    res.status(500).json({ message: "Error deleting room" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByIdAndUpdate(id, req.body, { new: true });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: "Error updating room" });
  }
});


export default router;

