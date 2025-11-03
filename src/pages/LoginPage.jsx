import React, { useState } from "react";
import GoogleSignIn from "../components/GoogleSignIn";
import FacebookLoginComponent from "../components/FacebookLogin";
import MobileOTPLogin from "../components/MobileOTPLogin";
import EmailOTPLogin from "../components/EmailOTPLogin";

export default function LoginPage({ onLogin, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email', 'google', 'facebook', 'mobile', 'email-otp'
  // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const API_URL = "https://litverse-backend.vercel.app";

  // ✅ Email validation function (same as Register)
  const isValidEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: "Invalid email format" };
    }

    // For admin login, allow any email format
    if (isAdminLogin) {
      return { valid: true, message: "Valid email" };
    }

    // Check for valid domains (common email providers) for regular users
    const validDomains = [
      'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'live.com',
      'icloud.com', 'aol.com', 'protonmail.com', 'zoho.com', 'yandex.com',
      'mail.com', 'gmx.com', 'fastmail.com', 'tutanota.com'
    ];
    
    const domain = email.split('@')[1]?.toLowerCase();
    
    // Allow educational domains (.edu) and organization domains (.org)
    if (domain?.endsWith('.edu') || domain?.endsWith('.org') || domain?.endsWith('.gov')) {
      return { valid: true, message: "Valid email" };
    }
    
    // Check if it's a known valid domain
    if (!validDomains.includes(domain)) {
      return { 
        valid: false, 
        message: `Please use a valid email from providers like Gmail, Yahoo, Outlook, etc.` 
      };
    }
    
    return { valid: true, message: "Valid email" };
  };

  const handleGoogleSuccess = (data) => {
    localStorage.setItem("token", data.token);
    const userName = data.user ? data.user.firstName : "User";
    if (onLogin) onLogin(userName, false);
  };

  const handleGoogleError = (error) => {
    setError(error);
  };

  const handleFacebookSuccess = (data) => {
    localStorage.setItem("token", data.token);
    const userName = data.user ? data.user.firstName : "User";
    if (onLogin) onLogin(userName, false);
  };

  const handleFacebookError = (error) => {
    setError(error);
  };

  const handleMobileSuccess = (data) => {
    localStorage.setItem("token", data.token);
    const userName = data.user ? data.user.firstName : "User";
    if (onLogin) onLogin(userName, false);
  };

  const handleMobileError = (error) => {
    setError(error);
  };

  const handleEmailOTPSuccess = (data) => {
    localStorage.setItem("token", data.token);
    const userName = data.user ? data.user.firstName : "User";
    if (onLogin) onLogin(userName, false);
  };

  const handleEmailOTPError = (error) => {
    setError(error);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ Validate email for regular users (skip for admin)
    if (!isAdminLogin) {
      const emailValidation = isValidEmail(email);
      if (!emailValidation.valid) {
        setError(emailValidation.message);
        setLoading(false);
        return;
      }
    }

    try {
      const endpoint = isAdminLogin ? `${API_URL}/api/admin/login` : `${API_URL}/login`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        
        if (isAdminLogin) {
          // Admin login - use admin data from response
          const adminName = data.admin ? data.admin.firstName : "Admin";
          if (onLogin) onLogin(adminName, true); // Pass admin name and admin flag
        } else {
          // Regular user login - use real user data from response
          const userData = data.user;
          const userName = userData ? userData.firstName : email.split('@')[0];
          if (onLogin) onLogin(userName, false);
        }
        setLoading(false);
      } else {
        setError(data.message || "Login failed. Try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
      setLoading(false);
    }
  };

  // 🔹 Handle Forgot Password submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setError("");

    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
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
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isAdminLogin ? "Admin Login" : "Student Login"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        {/* Admin/User Toggle */}
        <div className="flex justify-center mb-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setIsAdminLogin(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                !isAdminLogin
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setIsAdminLogin(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                isAdminLogin
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Login Method Selection - Only for regular users */}
        {!isAdminLogin && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">Choose your login method</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Email & Password */}
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`p-3 border-2 rounded-lg transition-all ${
                  loginMethod === 'email'
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <span className="text-xs font-medium">Email & Password</span>
                </div>
              </button>

              {/* Email OTP */}
              <button
                type="button"
                onClick={() => setLoginMethod('email-otp')}
                className={`p-3 border-2 rounded-lg transition-all ${
                  loginMethod === 'email-otp'
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-4 1-1-4 .257-.257A6 6 0 1118 8zm-6-4a1 1 0 100-2 1 1 0 000 2z"/>
                  </svg>
                  <span className="text-xs font-medium">Email OTP</span>
                </div>
              </button>

              {/* Mobile OTP */}
              <button
                type="button"
                onClick={() => setLoginMethod('mobile')}
                className={`p-3 border-2 rounded-lg transition-all ${
                  loginMethod === 'mobile'
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM8 16a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2z"/>
                  </svg>
                  <span className="text-xs font-medium">Mobile OTP</span>
                </div>
              </button>

              {/* Google/Facebook */}
              <button
                type="button"
                onClick={() => setLoginMethod('google')}
                className={`p-3 border-2 rounded-lg transition-all ${
                  loginMethod === 'google'
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-xs font-medium">Social Login</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Render different login methods */}
        {isAdminLogin || loginMethod === 'email' ? (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                placeholder={isAdminLogin ? "Admin Email" : "Your Gmail, Yahoo, Outlook, etc."}
                className="w-full p-3 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {!isAdminLogin && email && !isValidEmail(email).valid && (
                <p className="text-xs text-red-500 mt-1">
                  {isValidEmail(email).message}
                </p>
              )}
            </div>
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
        ) : loginMethod === 'google' ? (
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Sign in with social accounts</p>
            </div>
            
            {/* Google Login */}
            <button
              type="button"
              onClick={() => {
                try {
                  window.open('http://localhost:5000/auth/google', '_self');
                } catch (error) {
                  setError("Google login is not available in demo mode");
                }
              }}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Facebook Login */}
            <button
              type="button"
              onClick={() => {
                try {
                  window.open('http://localhost:5000/auth/facebook', '_self');
                } catch (error) {
                  setError("Facebook login is not available in demo mode");
                }
              }}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Demo Mode: Social login may not be fully configured
              </p>
            </div>
          </div>
        ) : loginMethod === 'mobile' ? (
          <MobileOTPLogin 
            onSuccess={handleMobileSuccess}
            onError={handleMobileError}
          />
        ) : loginMethod === 'email-otp' ? (
          <EmailOTPLogin 
            onSuccess={handleEmailOTPSuccess}
            onError={handleEmailOTPError}
          />
        ) : null}

        {/* 🔹 Forgot Password Button - Only for regular users */}
        {!isAdminLogin && (
          <div className="text-center mt-3">
            <button
              onClick={() => setShowForgotModal(true)}
              className="text-blue-600 text-sm underline"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Register link - Only for regular users */}
        {!isAdminLogin && (
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <button onClick={onGoToRegister} className="text-blue-600 underline">
              Register
            </button>
          </p>
        )}
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
