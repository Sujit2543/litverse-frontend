// src/pages/AdminPanel/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/admin/users`;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("adminToken");

  const fetchUsers = async () => {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-10 flex-1 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

        <table className="w-full bg-white shadow rounded-xl">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(u._id)}
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

export default ManageUsers;
