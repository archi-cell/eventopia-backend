import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create booking & Stripe checkout session
export const createCheckout = async (req, res, next) => {
  try {
    const { eventId, tickets, selectedCateringId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 💰 Calculate total amount
    const ticketAmount = (event.ticketPrice || 0) * tickets;

    const catering = event.cateringOptions?.find(
      (c) => c._id.toString() === selectedCateringId
    );
    const cateringAmount = catering ? catering.price : 0;

    const venueAmount = event.venue?.price || 0;
    const total = ticketAmount + cateringAmount + venueAmount;

    // 📦 Create booking
    const booking = await Booking.create({
      user: req.user._id,
      event: event._id,
      date: event.date,
      tickets,
      totalAmount: total,
      paymentStatus: "pending"
    });

    // 💳 Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${event.title} - ${tickets} tickets`
            },
            unit_amount: Math.round(total * 100)
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&bookingId=${booking._id}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/cancel?bookingId=${booking._id}`,
      metadata: {
        bookingId: booking._id.toString()
      }
    });

    booking.stripeSessionId = session.id;
    await booking.save();

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
};

// ✅ Stripe webhook placeholder
export const webhook = async (req, res) => {
  res.json({ received: true });
};

// ✅ Get logged-in user's bookings
export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("event");

    res.json(bookings);
  } catch (err) {
    next(err);
  }
};
