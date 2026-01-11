import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    date: {
      type: Date
    },
    venue: {
      name: String,
      capacity: Number,
      price: Number
    },
    cateringOptions: [optionSchema],
    ticketPrice: {
      type: Number,
      default: 0
    },
    image: {
      type: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
