import React from "react";
import BookGrid from "../components/BookGrid";

// (Optional) A simple progress bar component
function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mt-2 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default function MyLibraryPage(props) {
  const { myLibrary = [], progress = {} } = props;

  // Separate books into currently reading & completed
  const currentBook = myLibrary.find((b) => !b.completed);
  const finishedBooks = myLibrary.filter((b) => b.completed);

  return (
    <section className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        My Library 📚
      </h1>

      {/* --- Currently Reading Section --- */}
      {currentBook ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Currently Reading
          </h2>
          <div className="mt-4 flex items-center gap-6">
            <img
              src={currentBook.imageUrl}
              alt={currentBook.title}
              className="w-28 h-40 rounded-md object-cover shadow"
              onError={(e) => {
                e.target.src = "https://placehold.co/120x160?text=No+Cover";
              }}
            />
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
                {currentBook.title}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                by {currentBook.author}
              </p>
              <ProgressBar progress={progress[currentBook.id] || 45} />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Progress: {progress[currentBook.id] || 45}%
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          You haven’t started reading any book yet!
        </p>
      )}

      {/* --- Completed Books Section --- */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Completed Books ✅
        </h2>

        {finishedBooks.length > 0 ? (
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            {finishedBooks.map((book) => (
              <li key={book.id}>
                <span className="font-medium">{book.title}</span> —{" "}
                <span className="italic">{book.author}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            You haven’t completed any books yet.
          </p>
        )}
      </div>

      {/* --- Your Library Books Grid --- */}
      <BookGrid
        title="All Books in My Library"
        books={myLibrary}
        {...props}
      />
    </section>
  );
}
