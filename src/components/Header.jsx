import React, { useState, useRef, useEffect } from "react";

export default function Header({ onLogout, username }) {
  const [theme, setTheme] = useState("light");
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // --- Load saved theme from localStorage ---
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // --- Toggle theme function ---
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  // --- Handle profile image upload ---
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-white shadow-md dark:bg-gray-800 dark:border-b dark:border-gray-700 transition-all duration-300">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 p-4">
        
        {/* --- Logo --- */}
        <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
          LitVerse
        </div>

        {/* --- Search Bar --- */}
        <div className="flex-grow sm:max-w-md">
          <form className="flex">
            <input
              type="search"
              placeholder="Search by Title, Author, or ISBN..."
              className="w-full rounded-l-md border border-gray-300 bg-gray-50 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
            <button
              type="submit"
              className="rounded-r-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>

        {/* --- User Section --- */}
        <div className="relative flex items-center space-x-5 pr-3">  {/* Added right padding */}
          
          {/* --- Theme Toggle (LEFT SIDE) --- */}
          <div
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
            title="Toggle theme"
          >
            {theme === "light" ? (
              <svg
                className="h-6 w-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.66-15.66l-.7.7M4.04 19.96l-.7.7M21 12h-1M4 12H3m15.66 8.66l-.7-.7M4.04 4.04l-.7-.7"
                />
              </svg>
            )}
          </div>

          {/* --- Profile Avatar --- */}
          <div
            className="relative cursor-pointer flex items-center space-x-2"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <img
              src={
                profileImage ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-blue-500 object-cover transition-transform hover:scale-105"
            />
          </div>

          {/* --- Dropdown --- */}
          {profileOpen && (
            <div className="absolute right-0 top-12 w-64 rounded-lg bg-white shadow-lg dark:bg-gray-700 dark:text-gray-200 p-4">
              <div className="flex flex-col items-center space-y-3">
                <img
                  src={
                    profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover border-2 border-blue-500"
                />
                <p className="text-lg font-semibold">{username}</p>

                <label
                  className="cursor-pointer rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload Photo
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />

                <button
                  onClick={onLogout}
                  className="mt-2 w-full rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
