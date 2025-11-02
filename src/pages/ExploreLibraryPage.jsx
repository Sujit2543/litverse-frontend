import React from 'react';
import BookGrid from '../components/BookGrid';

// 7e. ExploreLibraryPage
export default function ExploreLibraryPage(props) {
  return (
    <div className="space-y-8">
      <section className="mx-auto w-full max-w-7xl rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
        <h2 className="border-b border-gray-200 pb-2 text-3xl font-bold text-gray-900 dark:border-gray-700 dark:text-white">
          Explore the Library
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <input type="text" placeholder="Filter by Title..." className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
          <select className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            <option>Filter by Genre...</option>
            <option>Programming</option>
            <option>Story</option>
            <option>Poem</option>
          </select>
          <select className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            <option>Filter by Rating...</option>
            <option>4 Stars & Up</option>
            <option>3 Stars & Up</option>
          </select>
        </div>
      </section>
      
      <BookGrid 
        title="All Books" 
        books={[...props.featuredBooks, ...props.newReleases]} 
        {...props} 
      />
      
      <section className="mx-auto w-full max-w-7xl rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
        <h3 className="border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-900 dark:border-gray-700 dark:text-white">
          Audiobooks
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Mock Audiobook Card */}
          <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <img src="https://placehold.co/150x150/abc/fff?text=Audiobook" alt="Audiobook" className="mx-auto h-36 w-36 object-cover rounded-md" />
            <h4 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">Atomic Habits (Audio)</h4>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">James Clear</p>
            <button 
              className="mt-auto w-full rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700"
              onClick={() => props.onPlayAudiobook({ title: 'Atomic Habits (Audio)', author: 'James Clear' })}
            >
              Play Audiobook
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}