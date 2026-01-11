import express from "express";
import {
  getAll,
  getOne,
  create,
  update,
  remove
} from "../controllers/eventController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getAll);
router.get("/:id", getOne);

// Admin routes
router.post("/", protect, admin, create);
router.put("/:id", protect, admin, update);
router.delete("/:id", protect, admin, remove);

export default router;
