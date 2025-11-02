// src/components/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const linkClass =
    "block px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white text-gray-800";
  return (
    <div className="w-64 bg-white shadow-md p-4 space-y-3">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Admin Panel
      </h2>
      <NavLink to="/admin/dashboard" className={linkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/admin/manage-books" className={linkClass}>
        Manage Books
      </NavLink>
      <NavLink to="/admin/manage-users" className={linkClass}>
        Manage Users
      </NavLink>
    </div>
  );
}
