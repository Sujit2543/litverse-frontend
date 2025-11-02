import React from 'react';

// --- BookFilter Component ---
export default function BookFilter({ activeFilter, onFilterChange }) {
  const categories = ['All', 'Programming', 'Story', 'Essay', 'Motivation', 'Poem'];
  
  return (
    <section className="mx-auto w-full max-w-7xl rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter by Category</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              activeFilter === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}