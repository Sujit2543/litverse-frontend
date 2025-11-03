import React, { useState, useEffect } from "react";
import AdminDashboard from "./components/AdminDashboard";
import UserManagement from "./components/UserManagement";
import BookManagement from "./components/BookManagement";
import MockTestManagement from "./components/MockTestManagement";
import PurchaseManagement from "./components/PurchaseManagement";

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/admin/profile", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAdminData(data.admin);
      }
    } catch (error) {
      console.error("Error fetching admin profile:", error);
    }
  };

  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: "📊" },
    { id: "users", name: "Users", icon: "👥" },
    { id: "books", name: "Books", icon: "📚" },
    { id: "tests", name: "Mock Tests", icon: "📝" },
    { id: "purchases", name: "Purchases", icon: "💰" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <UserManagement />;
      case "books":
        return <BookManagement />;
      case "tests":
        return <MockTestManagement />;
      case "purchases":
        return <PurchaseManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                📚 Library Admin Panel
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Welcome back, {adminData?.firstName || "Admin"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  {adminData?.role || "Admin"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
