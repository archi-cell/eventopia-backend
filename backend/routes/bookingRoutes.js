import express from "express";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// ✅ Create booking (without Stripe – simple booking)
router.post("/", protect, async (req, res) => {
  try {
    const { eventId, tickets, cateringId } = req.body;

    // Fetch event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 💰 Calculate cost
    const ticketCost = (event.ticketPrice || 0) * tickets;

    let cateringCost = 0;
    if (cateringId) {
      const cateringOption = event.cateringOptions.find(
        (c) => c._id.toString() === cateringId
      );
      cateringCost = cateringOption ? cateringOption.price : 0;
    }

    const totalAmount = ticketCost + cateringCost;

    // 📦 Create booking
    const booking = await Booking.create({
      user: req.user._id,
      event: event._id,
      tickets,
      catering: cateringId || null,
      totalAmount
    });

    res.status(201).json({ booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all bookings (admin/debug)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("event")
      .populate("user", "name email");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

export default router;
