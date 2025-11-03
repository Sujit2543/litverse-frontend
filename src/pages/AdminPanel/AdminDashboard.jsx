// src/pages/AdminPanel/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";

const API_URL = `https://litverse-backend.vercel.app/api/books?limit=8/api/admin/dashboard`;

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    };
    fetchStats();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-10 flex-1 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {stats ? (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-xl p-6 text-center">
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6 text-center">
              <h2 className="text-xl font-semibold">Total Books</h2>
              <p className="text-3xl font-bold mt-2">{stats.totalBooks}</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6 text-center">
              <h2 className="text-xl font-semibold">Recent Books</h2>
              <ul className="mt-2 text-sm">
                {stats.recentBooks.map((b) => (
                  <li key={b._id}>{b.title}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
