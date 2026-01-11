// backend/routes/reviewRoutes.js
import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// POST Review
router.post("/", async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET Reviews by Event ID
router.get("/:eventId", async (req, res) => {
    try {
        const reviews = await Review.find({ eventId: req.params.eventId });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
