import React, { useState } from "react";

export default function LoginPage({ onLogin, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        if (onLogin) onLogin(data.token);
        window.location.href = "/home";
      } else {
        setError(data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Forgot Password submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await response.json();
      if (response.ok) {
        setResetMessage("✅ Password reset link sent to your email!");
      } else {
        setError(data.message || "Failed to send reset email.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 🔹 Forgot Password Button */}
        <div className="text-center mt-3">
          <button
            onClick={() => setShowForgotModal(true)}
            className="text-blue-600 text-sm underline"
          >
            Forgot Password?
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <button onClick={onGoToRegister} className="text-blue-600 underline">
            Register
          </button>
        </p>
      </div>

      {/* 🔹 Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Reset Password
            </h3>

            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Enter your registered email"
                className="w-full p-3 mb-3 border rounded-lg"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send Reset Link
              </button>
            </form>

            {resetMessage && (
              <p className="text-green-600 text-sm mt-3 text-center">
                {resetMessage}
              </p>
            )}

            {error && (
              <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
            )}

            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full mt-4 text-gray-500 underline text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
