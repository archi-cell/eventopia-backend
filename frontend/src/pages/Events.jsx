import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Events.css";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/events");
                setEvents(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch events. Please try again later.");
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Group events by category if available (optional field)
    const groupedEvents = events.reduce((acc, event) => {
        const category = event.category || "All Events";
        if (!acc[category]) acc[category] = [];
        acc[category].push(event);
        return acc;
    }, {});

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading events...</p>
            </div>
        );
    }

    if (error) {
        return <p className="text-danger text-center py-5">{error}</p>;
    }

    return (
        <div className="events-page">
            {/* HERO SECTION */}
            <section className="events-hero text-center text-white d-flex align-items-center justify-content-center">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="fw-bold display-4">Explore Events by Category</h1>
                    <p className="lead">From music to sports, discover experiences made for you.</p>
                </motion.div>
            </section>

            {/* CATEGORY SECTIONS */}
            {Object.keys(groupedEvents).map((category, index) => (
                <section key={index} className="container py-5">
                    <motion.h2
                        className="text-center mb-5 fw-bold text-primary"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {category}
                    </motion.h2>

                    <div className="row">
                        {groupedEvents[category].map((event) => (
                            <motion.div
                                key={event._id}
                                className="col-md-4 mb-4"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="event-card card border-0 shadow-sm h-100 hover-scale">
                                    <img
                                        src={event.image}
                                        className="card-img-top"
                                        alt={event.title}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">{event.title}</h5>
                                        <p className="card-text text-muted">{event.description}</p>
                                        <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>

                                        {/* ✅ FIXED VENUE OBJECT DISPLAY */}
                                        {event.venue && (
                                            <p>
                                                <strong>Venue:</strong> {event.venue.name} <br />
                                                <strong>Capacity:</strong> {event.venue.capacity} <br />
                                                <strong>Venue Price:</strong> ₹{event.venue.price}
                                            </p>
                                        )}

                                        {/* ✅ Show catering options */}
                                        {event.cateringOptions && event.cateringOptions.length > 0 && (
                                            <p>
                                                <strong>Catering Options:</strong>{" "}
                                                {event.cateringOptions
                                                    .map((opt) => `${opt.name} (₹${opt.price})`)
                                                    .join(", ")}
                                            </p>
                                        )}

                                        <p><strong>Ticket Price:</strong> ₹{event.ticketPrice}</p>

                                        <Link
                                            to={`/events/${event._id}`}
                                            className="btn btn-primary w-100"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
