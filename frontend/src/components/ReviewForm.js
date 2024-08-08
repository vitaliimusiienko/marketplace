import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ productId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                http://localhost:8000/api/reviews/,
                { product: productId, rating, comment },
                { headers: { Authorization: Bearer ${token} } }
            );
            alert('Review submitted successfully');
        } catch (error) {
            console.error('There was an error!', error);
            alert('Failed to submit review');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Rating:</label>
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required min="1" max="5" />
            </div>
            <div>
                <label>Comment:</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
            </div>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;