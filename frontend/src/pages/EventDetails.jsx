import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function EventDetails() {
    const { id } = useParams();
    const [ev, setEv] = useState(null);
    const [tickets, setTickets] = useState(1);
    const [cateringId, setCateringId] = useState('');
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    // Fetch Event
    useEffect(() => {
        API.get(`/events/${id}`).then(res => setEv(res.data)).catch(console.error);
    }, [id]);

    // Fetch Reviews
    useEffect(() => {
        API.get(`/reviews/${id}`)
            .then(res => setReviews(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const checkout = () => {
        navigate('/confirmation', {
            state: {
                event: ev,
                tickets,
                catering: ev.cateringOptions?.find(c => c._id === cateringId) || null
            }
        });
    };

    // Submit Review
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            await API.post('/reviews', { eventId: id, rating, comment });
            setComment('');
            setRating(0);
            const res = await API.get(`/reviews/${id}`);
            setReviews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (!ev) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-3">{ev.title}</h2>
            <p>{ev.description}</p>
            <p><strong>Venue:</strong> {ev.venue?.name} - ${ev.venue?.price}</p>
            <p><strong>Ticket price:</strong> ${ev.ticketPrice}</p>

            <div>
                <label>Tickets</label>
                <input
                    type="number"
                    min="1"
                    value={tickets}
                    onChange={e => setTickets(e.target.value)}
                    className="form-control mb-2"
                    style={{ width: 120 }}
                />
            </div>

            <div>
                <label>Catering</label>
                <select
                    className="form-select mb-3"
                    value={cateringId}
                    onChange={e => setCateringId(e.target.value)}
                >
                    <option value="">None</option>
                    {ev.cateringOptions?.map(c => (
                        <option key={c._id} value={c._id}>
                            {c.name} - ${c.price}
                        </option>
                    ))}
                </select>
            </div>

            <button className="btn btn-success mb-4" onClick={checkout}>Book Now</button>

            {/* ---------------- REVIEWS SECTION ---------------- */}
            <div className="mt-4 border-top pt-4">
                <h4>⭐ Reviews & Ratings</h4>

                {/* Review Form */}
                <form onSubmit={handleSubmitReview} className="mb-3">
                    <div className="mb-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            <span
                                key={star}
                                onClick={() => setRating(star)}
                                style={{
                                    cursor: 'pointer',
                                    color: rating >= star ? 'gold' : 'gray',
                                    fontSize: '1.5rem'
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <textarea
                        className="form-control mb-2"
                        placeholder="Write your review..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        required
                    ></textarea>

                    <button className="btn btn-primary">Submit Review</button>
                </form>

                {/* Display Reviews */}
                {reviews.length === 0 ? (
                    <p>No reviews yet. Be the first to review this event!</p>
                ) : (
                    reviews.map((r, i) => (
                        <div key={i} className="border rounded p-2 mb-2 bg-light">
                            <strong>{r.user || 'Anonymous'}</strong> –{' '}
                            <span style={{ color: 'gold' }}>
                                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                            </span>
                            <p className="mb-0">{r.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
