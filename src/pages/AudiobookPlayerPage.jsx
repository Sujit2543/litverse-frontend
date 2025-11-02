import React from 'react';

// 7g. AudiobookPlayerPage
export default function AudiobookPlayerPage({ book, onExit }) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
        <button onClick={onExit} className="rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
          &larr; Back to Explore
        </button>
        <div className="mt-6 flex flex-col items-center">
          <img src="https://placehold.co/300x300/abc/fff?text=Audiobook" alt="Audiobook" className="h-64 w-64 rounded-lg object-cover shadow-lg" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">{book.title}</h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{book.author}</p>
          
          {/* Mock Player */}
          <div className="mt-8 w-full">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>1:23</span>
              <span>-4:56</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-gray-300 dark:bg-gray-700">
              <div className="h-2 w-1/4 rounded-full bg-blue-600"></div>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-8">
              {/* Mock Icons */}
              <svg className="h-8 w-8 cursor-pointer text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M8.445 14.832A1 1 0 0010 14.226V5.774a1 1 0 00-1.555-.832L4.12 8.168a1 1 0 000 1.664l4.325 3.22zM15.88 8.168a1 1 0 000 1.664l4.324 3.22a1 1 0 001.555-.832V5.774a1 1 0 00-1.555-.832l-4.324 3.22z" /></svg>
              <svg className="h-12 w-12 cursor-pointer text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.168v3.664a1 1 0 001.555.832l3.223-2.148a1 1 0 000-1.664L9.555 7.168z" clipRule="evenodd" /></svg>
              <svg className="h-8 w-8 cursor-pointer text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M11.555 5.168A1 1 0 0010 5.774v8.452a1 1 0 001.555.832l4.324-3.22a1 1 0 000-1.664l-4.324-3.22zM4.12 5.168A1 1 0 002.565 6.0v8a1 1 0 001.555.832l4.324-3.22a1 1 0 000-1.664L4.12 5.168z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}