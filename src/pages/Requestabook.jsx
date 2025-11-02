import React, { useState } from "react";
import { motion } from "framer-motion";

export default function RequestBookPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Request Submitted!\n\nTitle: ${formData.title}\nAuthor: ${formData.author}\nReason: ${formData.reason}`);
    setFormData({ title: "", author: "", reason: "" });
  };

  return (
    <section className="max-w-4xl mx-auto p-8 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Request a Book 📖
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Didn’t find your favorite book in our library?  
          Don’t worry — you can easily request it! Follow the steps below to let us know which book you want added.
        </p>
      </motion.div>

      {/* Procedure Steps */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          How to Request a Book
        </h2>

        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li>Search our catalog first to make sure the book isn’t already available.</li>
          <li>Fill in the form below with the book’s title, author, and a brief reason for your request.</li>
          <li>Our team will review your request within 24–48 hours.</li>
          <li>If approved, you’ll receive a notification when the book is added to the collection.</li>
          <li>You can then start reading or buy the book directly from your library dashboard.</li>
        </ol>
      </div>

      {/* Request Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Request Form
        </h2>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Book Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the book title"
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Why do you want this book?
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Share your thoughts or purpose for requesting this book"
            required
            rows="4"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200"
        >
          Submit Request
        </button>
      </motion.form>

      {/* Additional Info */}
      <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
        Note: Once your request is approved, you’ll receive a confirmation email and the book will appear in your “Explore” section.
      </div>
    </section>
  );
}
