// src/pages/AdminPanel/ManageBooks.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";

const API_URL = `https://litverse-backend.vercel.app/api/admin/books`;

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  const token = localStorage.getItem("adminToken");

  const fetchBooks = async () => {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, newBook, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNewBook({ title: "", author: "" });
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBooks();
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-10 flex-1 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Manage Books</h1>
        <form onSubmit={handleAdd} className="space-x-2 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="border p-2 rounded"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Book
          </button>
        </form>

        <table className="w-full bg-white shadow rounded-xl">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b._id} className="border-b">
                <td className="p-3">{b.title}</td>
                <td className="p-3">{b.author}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
