import React, { useState, useEffect } from "react";

export default function MockTestManagement() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [newTest, setNewTest] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    totalQuestions: "",
    totalMarks: "",
    passingMarks: "",
    difficulty: "intermediate",
    isFree: true,
    price: 0,
    questions: []
  });

  const categories = [
    "General Knowledge", "Mathematics", "Science", "English", "History",
    "Geography", "Computer Science", "Programming", "Business", "Other"
  ];

  useEffect(() => {
    fetchTests();
  }, [currentPage]);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/admin/tests?page=${currentPage}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setTests(data.tests);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTest = async () => {
    try {
      const token = localStorage.getItem("token");
      const testData = {
        ...newTest,
        duration: parseInt(newTest.duration),
        totalQuestions: parseInt(newTest.totalQuestions),
        totalMarks: parseInt(newTest.totalMarks),
        passingMarks: parseInt(newTest.passingMarks),
        price: parseFloat(newTest.price) || 0
      };

      const response = await fetch("http://localhost:5000/api/admin/tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(testData)
      });
      
      if (response.ok) {
        setShowAddModal(false);
        setNewTest({
          title: "", description: "", category: "", duration: "",
          totalQuestions: "", totalMarks: "", passingMarks: "",
          difficulty: "intermediate", isFree: true, price: 0, questions: []
        });
        fetchTests();
        alert("Mock test created successfully!");
      }
    } catch (error) {
      console.error("Error adding test:", error);
      alert("Error adding test");
    }
  };

  const handleEditTest = (test) => {
    setEditingTest({ ...test });
    setShowEditModal(true);
  };

  const handleUpdateTest = async () => {
    try {
      const token = localStorage.getItem("token");
      const testData = {
        ...editingTest,
        duration: parseInt(editingTest.duration),
        totalQuestions: parseInt(editingTest.totalQuestions),
        totalMarks: parseInt(editingTest.totalMarks),
        passingMarks: parseInt(editingTest.passingMarks),
        price: parseFloat(editingTest.price) || 0
      };

      const response = await fetch(
        `http://localhost:5000/api/admin/tests/${editingTest._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(testData)
        }
      );
      
      if (response.ok) {
        setShowEditModal(false);
        fetchTests();
        alert("Mock test updated successfully!");
      }
    } catch (error) {
      console.error("Error updating test:", error);
      alert("Error updating test");
    }
  };

  const handleDeleteTest = async (testId) => {
    if (!confirm("Are you sure you want to delete this mock test?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/admin/tests/${testId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      
      if (response.ok) {
        fetchTests();
        alert("Mock test deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting test:", error);
      alert("Error deleting test");
    }
  };

  const TestForm = ({ test, setTest, onSubmit, onCancel, title }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title *
              </label>
              <input
                type="text"
                value={test.title}
                onChange={(e) => setTest({...test, title: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description *
              </label>
              <textarea
                value={test.description}
                onChange={(e) => setTest({...test, description: e.target.value})}
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
                value={test.category}
                onChange={(e) => setTest({...test, category: e.target.value})}
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
                Duration (minutes) *
              </label>
              <input
                type="number"
                value={test.duration}
                onChange={(e) => setTest({...test, duration: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Questions *
              </label>
              <input
                type="number"
                value={test.totalQuestions}
                onChange={(e) => setTest({...test, totalQuestions: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Marks *
              </label>
              <input
                type="number"
                value={test.totalMarks}
                onChange={(e) => setTest({...test, totalMarks: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Passing Marks *
              </label>
              <input
                type="number"
                value={test.passingMarks}
                onChange={(e) => setTest({...test, passingMarks: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Difficulty
              </label>
              <select
                value={test.difficulty}
                onChange={(e) => setTest({...test, difficulty: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="flex items-center mt-6">
                <input
                  type="checkbox"
                  checked={test.isFree}
                  onChange={(e) => setTest({...test, isFree: e.target.checked, price: e.target.checked ? 0 : test.price})}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Free Test</span>
              </label>
            </div>
            {!test.isFree && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={test.price}
                  onChange={(e) => setTest({...test, price: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            )}
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
              {title.includes("Add") ? "Create Test" : "Update Test"}
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
          Mock Test Management
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create New Test
        </button>
      </div>

      {/* Tests List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {tests.map((test) => (
              <li key={test._id}>
                <div className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {test.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            test.isActive 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}>
                            {test.isActive ? "Active" : "Inactive"}
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            test.isFree 
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}>
                            {test.isFree ? "Free" : `$${test.price}`}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {test.description}
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                        <span>📚 {test.category}</span>
                        <span>⏱️ {test.duration} min</span>
                        <span>❓ {test.totalQuestions} questions</span>
                        <span>📊 {test.totalMarks} marks</span>
                        <span>🎯 {test.difficulty}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEditTest(test)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTest(test._id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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

      {/* Add Test Modal */}
      {showAddModal && (
        <TestForm
          test={newTest}
          setTest={setNewTest}
          onSubmit={handleAddTest}
          onCancel={() => setShowAddModal(false)}
          title="Create New Mock Test"
        />
      )}

      {/* Edit Test Modal */}
      {showEditModal && (
        <TestForm
          test={editingTest}
          setTest={setEditingTest}
          onSubmit={handleUpdateTest}
          onCancel={() => setShowEditModal(false)}
          title="Edit Mock Test"
        />
      )}
    </div>
  );
}