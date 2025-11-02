import React from "react";
import BookCard from "./BookCard";

export default function BookGrid({ title, books, ...props }) {
  if (!books || books.length === 0) {
    return (
      <section className="mx-auto w-full max-w-7xl rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
        <h3 className="border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-900 dark:border-gray-700 dark:text-white">
          {title}
        </h3>
        <p className="mt-6 text-gray-600 dark:text-gray-400">
          There are no books in this section.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl overflow-hidden rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
      <h3 className="border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-900 dark:border-gray-700 dark:text-white">
        {title}
      </h3>

      {/* Scrolling container */}
      <div className="relative mt-6 overflow-hidden">
        <div className="scroll-track flex w-max animate-scroll space-x-6">
          {[...books, ...books].map((book, index) => ( // duplicate books for infinite effect
            <div key={index} className="flex-shrink-0 w-48">
              <BookCard
                book={book}
                {...props}
                isBorrowed={props.myLibrary?.some((b) => b.id === book.id)}
                isWishlisted={props.myWishlist?.some((b) => b.id === book.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
