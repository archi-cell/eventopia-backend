import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaMusic, FaTheaterMasks, FaCalendarAlt } from "react-icons/fa";
import API from "../services/api";
import "./Home.css"; // 👈 we’ll create this for custom styling

export default function Home() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        API.get("/events")
            .then((res) => setEvents(res.data))
            .catch(console.error);
    }, []);

    return (
        <div className="home-page">

            {/* HERO SECTION */}
            <section className="hero-section text-center text-white d-flex align-items-center justify-content-center">
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="display-4 fw-bold">Welcome to <span className="brand-text">Eventopia</span></h1>
                    <p className="lead">
                        Discover & Book the Best Events Around You – Concerts, Festivals, Parties & More!
                    </p>
                    <Link to="/events" className="btn btn-lg btn-primary mt-3">Explore Events</Link>
                </motion.div>
            </section>

            {/* FEATURE HIGHLIGHTS */}
            <section className="features container py-5 text-center">
                <div className="row">
                    <motion.div className="col-md-4" whileHover={{ scale: 1.05 }}>
                        <FaMusic className="feature-icon" />
                        <h5>Live Concerts</h5>
                        <p>Experience electrifying performances by your favorite artists and bands.</p>
                    </motion.div>

                    <motion.div className="col-md-4" whileHover={{ scale: 1.05 }}>
                        <FaTheaterMasks className="feature-icon" />
                        <h5>Exclusive Events</h5>
                        <p>From theatre plays to private parties, enjoy unforgettable experiences.</p>
                    </motion.div>

                    <motion.div className="col-md-4" whileHover={{ scale: 1.05 }}>
                        <FaCalendarAlt className="feature-icon" />
                        <h5>Easy Booking</h5>
                        <p>Book your tickets in seconds and manage all your events effortlessly.</p>
                    </motion.div>
                </div>
            </section>

            {/* UPCOMING EVENTS */}
            <section className="container py-5">
                <motion.h2
                    className="text-center mb-4 fw-bold"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Upcoming Events
                </motion.h2>

                <div className="row">
                    {events.length > 0 ? (
                        events.map((ev) => (
                            <motion.div
                                key={ev._id}
                                className="col-md-4 mb-4"
                                whileHover={{ scale: 1.03 }}
                            >
                                <div className="card shadow border-0">
                                    {ev.image && (
                                        <img
                                            src={ev.image}
                                            className="card-img-top"
                                            alt={ev.title}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{ev.title}</h5>
                                        <p className="card-text">
                                            {ev.description?.slice(0, 100)}...
                                        </p>
                                        <p className="card-text fw-bold text-primary">
                                            ₹{ev.ticketPrice}
                                        </p>
                                        <Link
                                            to={`/events/${ev._id}`}
                                            className="btn btn-outline-primary w-100"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-muted">No upcoming events found.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
