import React from 'react';

// --- 4. Navigation Component ---
export default function Navigation({ currentPage, onPageChange, myLibraryCount, myWishlistCount, isAdmin }) {
  const baseNavItems = ['Home', 'Explore', 'My Library', 'User Dashboard', 'Community', 'Request a book'];
  const navItems = isAdmin ? [...baseNavItems, 'Admin Panel'] : baseNavItems;
  
  return (
    <nav className="w-full bg-gray-100 shadow-sm dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 py-3 sm:gap-x-8">
          {navItems.map((item) => {
            let itemText = item;
            if (item === 'My Library') {
              itemText = `My Library (${myLibraryCount})`;
            }
            
            return (
              <li key={item}>
                <button
                  onClick={() => onPageChange(item)}
                  className={`text-sm font-medium sm:text-base ${
                    currentPage === item
                      ? 'text-blue-600 font-bold dark:text-blue-400'
                      : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                  } border-none bg-transparent p-0 cursor-pointer`}
                >
                  {itemText}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}