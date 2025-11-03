import React, { useState, useEffect } from "react";

export default function BookManagement() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    price: "",
    originalPrice: "",
    coverImage: "",
    isbn: "",
    pages: "",
    language: "English",
    publisher: "",
    tags: ""
  });

  const categories = [
    "Fiction", "Non-Fiction", "Science", "Technology", "History", 
    "Biography", "Self-Help", "Business", "Education", "Children"
  ];

  useEffect(() => {
    fetchBooks();
  }, [currentPage, searchTerm, selectedCategory]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const params = new URLSearchParams({
        page: currentPage,
        search: searchTerm,
        category: selectedCategory
      });
      
      const response = await fetch(
        `http://localhost:5000/api/admin/books?${params}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setBooks(data.books);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const bookData = {
        ...newBook,
        price: parseFloat(newBook.price),
        originalPrice: parseFloat(newBook.originalPrice) || parseFloat(newBook.price),
        pages: parseInt(newBook.pages) || 0,
        tags: newBook.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
      };

      const response = await fetch("http://localhost:5000/api/admin/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(bookData)
      });
      
      if (response.ok) {
        setShowAddModal(false);
        setNewBook({
          title: "", author: "", description: "", category: "", price: "",
          originalPrice: "", coverImage: "", isbn: "", pages: "", 
          language: "English", publisher: "", tags: ""
        });
        fetchBooks();
        alert("Book added successfully!");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book");
    }
  };

  const handleEditBook = (book) => {
    setEditingBook({
      ...book,
      tags: book.tags?.join(", ") || ""
    });
    setShowEditModal(true);
  };

  const handleUpdateBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const bookData = {
        ...editingBook,
        price: parseFloat(editingBook.price),
        originalPrice: parseFloat(editingBook.originalPrice) || parseFloat(editingBook.price),
        pages: parseInt(editingBook.pages) || 0,
        tags: editingBook.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
      };

      const response = await fetch(
        `http://localhost:5000/api/admin/books/${editingBook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(bookData)
        }
      );
      
      if (response.ok) {
        setShowEditModal(false);
        fetchBooks();
        alert("Book updated successfully!");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Error updating book");
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/admin/books/${bookId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      
      if (response.ok) {
        fetchBooks();
        alert("Book deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Error deleting book");
    }
  };

  const BookForm = ({ book, setBook, onSubmit, onCancel, title }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title *
              </label>
              <input
                type="text"
                value={book.title}
                onChange={(e) => setBook({...book, title: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Author *
              </label>
              <input
                type="text"
                value={book.author}
                onChange={(e) => setBook({...book, author: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description *
              </label>
              <textarea
                value={book.description}
                onChange={(e) => setBook({...book, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category *
              </label>
              <select
                value={book.category}
                onChange={(e) => setBook({...book, category: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                value={book.price}
                onChange={(e) => setBook({...book, price: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Original Price
              </label>
              <input
                type="number"
                step="0.01"
                value={book.originalPrice}
                onChange={(e) => setBook({...book, originalPrice: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Cover Image URL *
              </label>
              <input
                type="url"
                value={book.coverImage}
                onChange={(e) => setBook({...book, coverImage: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                ISBN
              </label>
              <input
                type="text"
                value={book.isbn}
                onChange={(e) => setBook({...book, isbn: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Pages
              </label>
              <input
                type="number"
                value={book.pages}
                onChange={(e) => setBook({...book, pages: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Language
              </label>
              <input
                type="text"
                value={book.language}
                onChange={(e) => setBook({...book, language: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Publisher
              </label>
              <input
                type="text"
                value={book.publisher}
                onChange={(e) => setBook({...book, publisher: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={book.tags}
                onChange={(e) => setBook({...book, tags: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="fiction, bestseller, award-winning"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {title.includes("Add") ? "Add Book" : "Update Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Book Management
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Book
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img
                src={book.coverImage || "/api/placeholder/200/300"}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  by {book.author}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  {book.category}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-bold text-green-600">
                    ${book.price}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditBook(book)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-md ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Add Book Modal */}
      {showAddModal && (
        <BookForm
          book={newBook}
          setBook={setNewBook}
          onSubmit={handleAddBook}
          onCancel={() => setShowAddModal(false)}
          title="Add New Book"
        />
      )}

      {/* Edit Book Modal */}
      {showEditModal && (
        <BookForm
          book={editingBook}
          setBook={setEditingBook}
          onSubmit={handleUpdateBook}
          onCancel={() => setShowEditModal(false)}
          title="Edit Book"
        />
      )}
    </div>
  );
}