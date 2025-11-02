import React, { useState } from 'react';
import StarRating from "../components/StarRating.jsx";

// 7k. BookDetailsPage (NEW)
export default function BookDetailsPage({ 
  book, 
  username,
  onStartReading, 
  onPlayAudiobook, 
  onWishlist, 
  isWishlisted,
  bookReviews = [], // Default to empty array
  onAddReview,
  callGemini, 
  isGeminiLoading
}) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [discussionQuestions, setDiscussionQuestions] = useState([]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || reviewText.trim() === "") {
      alert("Please select a rating and write a review.");
      return;
    }
    onAddReview(book.id, {
      username,
      rating,
      text: reviewText
    });
    // Reset form
    setRating(0);
    setReviewText("");
  };
  
  const handleGenerateQuestions = async () => {
    setIsGeneratingQuestions(true);
    setDiscussionQuestions([]);
    const systemPrompt = "You are a helpful book club assistant. Generate 5 insightful, open-ended discussion questions based on the book's title and author. Return *only* a valid JSON array of strings.";
    const userPrompt = `Title: ${book.title}, Author: ${book.author}`;
    const schema = { type: "ARRAY", items: { type: "STRING" } };
    
    try {
      const result = await callGemini(systemPrompt, userPrompt, schema);
      if (Array.isArray(result) && result.every(item => typeof item === 'string')) {
        setDiscussionQuestions(result);
      } else {
        // Handle case where API didn't return an array of strings
        console.warn("Gemini response was not an array of strings:", result);
        setDiscussionQuestions(["AI response was in an unexpected format. Please try again."]);
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      setDiscussionQuestions(["Could not generate questions at this time."]);
    }
    setIsGeneratingQuestions(false);
  };
  
  const averageRating = bookReviews.length > 0
    ? (bookReviews.reduce((acc, r) => acc + r.rating, 0) / bookReviews.length).toFixed(1)
    : "N/A";

  return (
    <div className="space-y-8">
      {/* Book Info Header */}
      <section className="mx-auto w-full max-w-7xl rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
        <div className="flex flex-col gap-6 md:flex-row">
          <img 
            src={book.imageUrl} 
            alt={`Cover of ${book.title}`} 
            className="mx-auto h-80 w-56 object-cover rounded-md shadow-lg md:mx-0"
            onError={(e) => { e.target.src = `https://placehold.co/224x320/e0e0e0/757575?text=${book.title.split(' ').join('+')}`; }}
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{book.title}</h2>
            <p className="mt-2 text-2xl text-gray-700 dark:text-gray-300">{book.author}</p>
            <span className="mt-4 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              {book.category}
            </span>
            <div className="mt-4 flex items-center justify-center space-x-2 md:justify-start">
              <span className="text-2xl font-bold text-amber-500">{averageRating}</span>
              <span className="text-gray-600 dark:text-gray-400">({bookReviews.length} reviews)</span>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <button 
                onClick={() => onStartReading(book)}
                className="rounded-md bg-blue-600 px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Start Reading (eBook)
              </button>
              <button 
                onClick={() => onPlayAudiobook(book)}
                className="rounded-md bg-purple-600 px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700"
              >
                Play Audiobook
              </button>
              <button 
                onClick={() => onWishlist(book)}
                disabled={isWishlisted}
                className={`rounded-md px-5 py-3 text-base font-medium text-white shadow-sm ${isWishlisted ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700'}`}
              >
                {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="mx-auto w-full max-w-7xl rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
        <h3 className="border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-900 dark:border-gray-700 dark:text-white">
          ✨ AI-Powered Tools
        </h3>
        <div className="mt-4">
          <p className="text-gray-700 dark:text-gray-300">Need help starting a conversation? Get some AI-generated discussion starters for your book club.</p>
          <button
            onClick={handleGenerateQuestions}
            disabled={isGeneratingQuestions || isGeminiLoading}
            className="mt-3 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50"
          >
            {isGeneratingQuestions ? 'Generating...' : 'Generate Discussion Starters'}
          </button>
          
          {isGeneratingQuestions && (
            <div className="mt-4 text-center text-gray-700 dark:text-gray-300">Generating questions...</div>
          )}
          
          {discussionQuestions.length > 0 && (
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/50">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-200">Discussion Starters</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-800 dark:text-gray-200">
                {discussionQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mx-auto w-full max-w-7xl rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
        <h3 className="border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-900 dark:border-gray-700 dark:text-white">
          Ratings & Reviews
        </h3>
        
        {/* Add Review Form */}
        <form onSubmit={handleReviewSubmit} className="my-6 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white">Write your review, {username}</h4>
          <div className="mt-2">
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="3"
            className="mt-3 w-full rounded-md border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Share your thoughts..."
            required
          ></textarea>
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Submit Review
            </button>
          </div>
        </form>

        {/* Existing Reviews List */}
        <div className="space-y-4">
          {bookReviews.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">Be the first to review this book!</p>
          ) : (
            bookReviews.map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 dark:border-gray-700">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">{review.username}</span>
                  <div className="star-rating ml-3 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={review.rating >= star ? 'filled !text-base' : '!text-base'}>★</span>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{review.text}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}