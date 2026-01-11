import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { CheckCircle } from 'lucide-react'; // nice icon (optional)
import "./Confirmation.css";

export default function Confirmation() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) return <div className="text-center mt-5">No booking data found. Please go back and try again.</div>;

    const { event, tickets, catering } = state;
    const total = event.ticketPrice * tickets + (catering ? catering.price : 0);

    return (
        <div className="container my-5">
            <Card className="shadow-lg p-4 text-center border-success" style={{ borderRadius: '15px' }}>
                <div className="d-flex justify-content-center mb-3">
                    <CheckCircle size={80} color="green" />
                </div>
                <h2 className="text-success mb-3">Booking Confirmed 🎉</h2>
                <p className="text-muted">Thank you for booking with <strong>Eventopia</strong>!</p>

                <hr />

                <div className="text-start px-4">
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                    <p><strong>Venue:</strong> {event.venue?.name}</p>
                    <p><strong>Tickets:</strong> {tickets}</p>
                    {catering && (
                        <p><strong>Catering:</strong> {catering.name} - ${catering.price}</p>
                    )}
                    <h5 className="mt-3"><strong>Total:</strong> ${total}</h5>
                </div>

                <hr />

                <div className="mt-4">
                    <Button
                        variant="primary"
                        className="me-3"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </Button>
                    <Button
                        variant="outline-success"
                        onClick={() => navigate('/events')}
                    >
                        Explore More Events
                    </Button>
                </div>
            </Card>
        </div>
    );
}
