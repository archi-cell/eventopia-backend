const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    date: Date,
    venue: { name: String, capacity: Number, price: Number },
    cateringOptions: [optionSchema],
    ticketPrice: { type: Number, default: 0 },
    image: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
