// src/pages/AdminPanel/index.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ManageBooks from "./ManageBooks";
import ManageUsers from "./ManageUsers";

const AdminPanel = ({ adminToken, setAdminToken }) => {
  if (!adminToken) return <AdminLogin setAdminToken={setAdminToken} />;

  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/books" element={<ManageBooks />} />
      <Route path="/users" element={<ManageUsers />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
};

export default AdminPanel;


