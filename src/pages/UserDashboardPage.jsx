import React from 'react';

// 7h. UserDashboardPage
export default function UserDashboardPage({ username, myLibrary, myWishlist }) {
  const booksRead = myLibrary.length;
  const booksToRead = myWishlist.length;
  const achievements = [
    { id: 1, name: 'Bookworm', desc: 'Read 5 books.', earned: booksRead >= 5 },
    { id: 2, name: 'Page Turner', desc: 'Read your first book.', earned: booksRead >= 1 },
    { id: 3, name: 'Ambitious', desc: 'Add 3 books to your wishlist.', earned: booksToRead >= 3 },
  ];
  const readingGoal = 25;
  const xpPoints = booksRead * 100 + booksToRead * 10; // Mock XP calculation

  return (
    <div className="space-y-8">
      <section className="mx-auto w-full max-w-7xl rounded-lg bg-white/95 p-10 shadow-md dark:bg-gray-800/95">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          User Dashboard: {username}
        </h2>
        <p className="mt-2 text-2xl font-semibold text-amber-500">
          {xpPoints} XP (Gamification Mock-up)
        </p>
      </section>

      {/* Stats Grid */}
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white/95 p-6 text-center shadow-md dark:bg-gray-800/95">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Currently Reading</h3>
          <p className="mt-2 text-5xl font-bold text-blue-600 dark:text-blue-400">{booksRead}</p>
        </div>
        <div className="rounded-lg bg-white/95 p-6 text-center shadow-md dark:bg-gray-800/95">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">In Your Wishlist</h3>
          <p className="mt-2 text-5xl font-bold text-indigo-600 dark:text-indigo-400">{booksToRead}</p>
        </div>
        <div className="rounded-lg bg-white/95 p-6 text-center shadow-md dark:bg-gray-800/95">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Daily Streak</h3>
          <p className="mt-2 text-5xl font-bold text-emerald-600 dark:text-emerald-400">3 (Mock)</p>
        </div>
      </section>

      {/* Goals & Achievements */}
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
          <h3 className="border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-900 dark:border-gray-700 dark:text-white">
            Reading Goal
          </h3>
          <div className="mt-4">
            <p className="text-lg dark:text-gray-300">Your goal is to read <strong>{readingGoal}</strong> books this year.</p>
            <div className="mt-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div 
                className="rounded-full bg-blue-600 p-2 text-center text-xs font-medium leading-none text-blue-100"
                style={{ width: `${Math.min(100, (booksRead / readingGoal) * 100)}%` }}
              >
                {booksRead} / {readingGoal}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white/95 p-6 shadow-md dark:bg-gray-800/95">
          <h3 className="border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-900 dark:border-gray-700 dark:text-white">
            Achievements & Badges
          </h3>
          <ul className="mt-4 space-y-3">
            {achievements.map(ach => (
              <li key={ach.id} className={`flex items-center ${ach.earned ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`rounded-full p-2 ${ach.earned ? 'bg-emerald-500' : 'bg-gray-400'}`}>
                  <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="ml-3">
                  <p className="font-semibold dark:text-white">{ach.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{ach.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}