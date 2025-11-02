import React from 'react';

// --- 5. Hero Component ---
export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-7xl rounded-lg bg-white/95 p-10 text-center shadow-md dark:bg-gray-800/95">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Your Digital Library Awaits</h2>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Explore, read, and track your literary journey with LitVerse.
      </p>
    </section>
  );
}