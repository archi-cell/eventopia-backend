import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },
    tickets: {
      type: Number,
      required: true
    },
    catering: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catering",
      default: null
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending"
    },
    stripeSessionId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
