import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import BookFilter from "../components/BookFilter";
import BookGrid from "../components/BookGrid";

export default function HomePage(props) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [books, setBooks] = useState([]);
  const [mockTests, setMockTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalTests: 0
  });

  useEffect(() => {
    fetchBooks();
    fetchMockTests();
    fetchStats();
  }, []);

  const fetchBooks = async () => {
    try {
      // const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/books?limit=8`);
      const response = await fetch(`https://litverse-backend.vercel.app/api/books?limit=8`);
      if (response.ok) {
        const data = await response.json();
        setBooks(data.books);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchMockTests = async () => {
    try {
      // const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/mock-tests?limit=4`);
      const response = await fetch(`https://litverse-backend.vercel.app/api/books?limit=8`);
      if (response.ok) {
        const data = await response.json();
        setMockTests(data.tests);
      }
    } catch (error) {
      console.error("Error fetching mock tests:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Mock stats for now - in real app, create a public stats endpoint
      setStats({
        totalBooks: 1000,
        totalUsers: 5000,
        totalTests: 200
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const filteredBooks = books.filter(
    (book) => activeFilter === "All" || book.category === activeFilter
  );

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Learning Community</h2>
            <p className="text-xl opacity-90">Thousands of students are already learning with us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.totalBooks.toLocaleString()}+</div>
              <div className="text-lg opacity-90">Books Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.totalUsers.toLocaleString()}+</div>
              <div className="text-lg opacity-90">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{stats.totalTests.toLocaleString()}+</div>
              <div className="text-lg opacity-90">Mock Tests</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            📚 Featured Books
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover our most popular and trending books
          </p>
        </div>

        {/* Filter Buttons */}
        <BookFilter 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />

        {/* Books Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <BookGrid 
            title="" 
            books={filteredBooks} 
            {...props} 
          />
        )}
      </section>

      {/* Mock Tests Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              📝 Weekly Mock Tests
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Test your knowledge with our comprehensive mock tests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTests.map((test) => (
              <div key={test._id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">📝</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    test.isFree 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  }`}>
                    {test.isFree ? "Free" : `$${test.price}`}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {test.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {test.description}
                </p>
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{test.duration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span>{test.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className="capitalize">{test.difficulty}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our Library?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need for your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Vast Collection
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Access thousands of books across multiple categories and subjects
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Mock Tests
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Weekly mock tests to assess your knowledge and track progress
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Affordable Prices
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Quality education at prices that won't break the bank
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Expert Content
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Curated content from industry experts and renowned authors
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
