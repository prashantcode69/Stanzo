import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    pricePerNight: { type: Number, required: true },
    size: String,
    maxGuests: { type: Number, default: 2 },
    amenities: [String],
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
