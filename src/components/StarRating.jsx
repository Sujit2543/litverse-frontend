import React, { useState } from 'react';

// --- StarRating Component (NEW) ---
export default function StarRating({ rating, setRating }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="star-rating flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={(hoverRating || rating) >= star ? 'filled' : ''}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}