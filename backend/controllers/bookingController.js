const Booking = require('../models/Booking');
const Event = require('../models/Event');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create booking and Stripe checkout session
exports.createCheckout = async (req, res, next) => {
    try {
        const { eventId, tickets, selectedCateringId } = req.body;
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // compute amount
        const ticketAmount = (event.ticketPrice || 0) * tickets;
        const catering = event.cateringOptions?.find(c => c._id.toString() === selectedCateringId);
        const cateringAmount = catering ? catering.price : 0;
        const total = ticketAmount + cateringAmount + (event.venue?.price || 0);

        const booking = await Booking.create({
            user: req.user._id,
            event: event._id,
            date: event.date,
            tickets,
            totalAmount: total,
            paymentStatus: 'pending'
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: `${event.title} - ${tickets} tickets` },
                        unit_amount: Math.round(total * 100)
                    }, quantity: 1
                }
            ],
            success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&bookingId=${booking._id}`,
            cancel_url: `${process.env.CLIENT_URL}/checkout/cancel?bookingId=${booking._id}`,
            metadata: { bookingId: booking._id.toString() }
        });

        booking.stripeSessionId = session.id;
        await booking.save();

        res.json({ url: session.url });
    } catch (err) { next(err); }
};

// webhook endpoint to update booking status (recommended to implement)
exports.webhook = async (req, res) => {
    // implement webhook handler using Stripe signature verification for production
    res.json({ received: true });
};

exports.getUserBookings = async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    res.json(bookings);
};
