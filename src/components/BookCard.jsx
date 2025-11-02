import React from 'react';

// --- 1. BookCard Component ---
// Updated to handle "onViewBookDetails" prop
export default function BookCard({ book, onAddToLibrary, onWishlist, onViewBookDetails, isBorrowed, isWishlisted }) {
  
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <img 
        src={book.imageUrl} 
        alt={`Cover of ${book.title}`} 
        className="mx-auto h-56 w-full max-w-[150px] cursor-pointer object-cover"
        onError={(e) => { e.target.src = `https://placehold.co/150x220/e0e0e0/757575?text=${book.title.split(' ').join('+')}`; }}
        onClick={() => onViewBookDetails(book)}
      />
      <h4 
        className="mt-4 cursor-pointer text-base font-semibold text-gray-900 dark:text-white"
        onClick={() => onViewBookDetails(book)}
      >
        {book.title}
      </h4>
      <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{book.author}</p>
      <span className="mb-4 inline-block rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
        {book.category}
      </span>
      <div className="mt-auto flex flex-col space-y-2">
        <button 
          className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          onClick={() => {
            if (!isBorrowed) onAddToLibrary(book);
            onViewBookDetails(book);
          }}
        >
          {isBorrowed ? 'Continue Reading' : 'View Details'}
        </button>
        <button 
          className={`w-full rounded-md px-3 py-2 text-sm font-medium text-white shadow-sm ${isWishlisted ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700'}`}
          onClick={() => !isWishlisted && onWishlist(book)}
          disabled={isWishlisted}
        >
          {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
    </div>
  );
}