// backend/routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Event = require("../models/Event");

router.post("/", async (req, res) => {
    try {
        const { userId, eventId, tickets, cateringId } = req.body;

        // ✅ Fetch event to calculate total cost
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        const ticketCost = event.ticketPrice * tickets;
        let cateringCost = 0;

        if (cateringId) {
            const cateringOption = event.cateringOptions.find(
                c => c._id.toString() === cateringId
            );
            cateringCost = cateringOption ? cateringOption.price : 0;
        }

        const totalPrice = ticketCost + cateringCost;

        // ✅ Create a booking
        const booking = new Booking({
            userId,
            eventId,
            tickets,
            cateringId,
            totalPrice,
        });

        await booking.save();
        res.status(201).json({ booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find().populate("eventId userId");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings" });
    }
});

module.exports = router;
