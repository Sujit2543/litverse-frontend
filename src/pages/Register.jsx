import React, { useState } from "react";
import FacebookLoginComponent from "../components/FacebookLogin";
import MobileOTPLogin from "../components/MobileOTPLogin";
import EmailOTPLogin from "../components/EmailOTPLogin";
import EmailRegistrationWithOTP from "../components/EmailRegistrationWithOTP";

const Register = ({ onBackToLogin }) => {
  const [registrationMethod, setRegistrationMethod] = useState('email'); // 'email', 'google', 'facebook', 'mobile'
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Email validation function
  const isValidEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: "Invalid email format" };
    }

    // Check for valid domains (common email providers)
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

  // ✅ Password validation function
  const isStrongPassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number, and one special character
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=_])[A-Za-z\d@$!%*?&#^+=_]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ Check email validity
    const emailValidation = isValidEmail(formData.email);
    if (!emailValidation.valid) {
      setError(emailValidation.message);
      setLoading(false);
      return;
    }

    // ✅ Check password strength
    if (!isStrongPassword(formData.password)) {
      setError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      setLoading(false);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! You can now login with your email.");
        onBackToLogin();
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Register Error:", error);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (data) => {
    localStorage.setItem("token", data.token);
    alert("Registration successful with Google! Redirecting to login...");
    onBackToLogin();
  };

  const handleGoogleError = (error) => {
    setError(error);
  };

  const handleFacebookSuccess = (data) => {
    localStorage.setItem("token", data.token);
    alert("Registration successful with Facebook! Redirecting to login...");
    onBackToLogin();
  };

  const handleFacebookError = (error) => {
    setError(error);
  };

  const handleMobileSuccess = (data) => {
    localStorage.setItem("token", data.token);
    alert("Registration successful with mobile! Redirecting to login...");
    onBackToLogin();
  };

  const handleMobileError = (error) => {
    setError(error);
  };

  const handleEmailRegistrationSuccess = (data) => {
    localStorage.setItem("token", data.token);
    alert("Email verified successfully! Account created. You are now logged in.");
    // Redirect to main app or login
    window.location.href = '/home';
  };

  const handleEmailRegistrationError = (error) => {
    setError(error);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Registration Method Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">Choose your registration method</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Email with OTP Verification */}
            <button
              type="button"
              onClick={() => setRegistrationMethod('email')}
              className={`p-4 border-2 rounded-lg transition-all ${
                registrationMethod === 'email'
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-600"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="relative">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                  </div>
                </div>
                <span className="text-xs font-medium">Email + OTP Verification</span>
              </div>
            </button>

            {/* Quick Email OTP (Passwordless) */}
            <button
              type="button"
              onClick={() => setRegistrationMethod('email-otp')}
              className={`p-4 border-2 rounded-lg transition-all ${
                registrationMethod === 'email-otp'
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-600"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-4 1-1-4 .257-.257A6 6 0 1118 8zm-6-4a1 1 0 100-2 1 1 0 000 2z"/>
                </svg>
                <span className="text-xs font-medium">Quick Email OTP</span>
              </div>
            </button>

            {/* Mobile OTP */}
            <button
              type="button"
              onClick={() => setRegistrationMethod('mobile')}
              className={`p-4 border-2 rounded-lg transition-all ${
                registrationMethod === 'mobile'
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-600"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM8 16a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2z"/>
                </svg>
                <span className="text-xs font-medium">Mobile OTP</span>
              </div>
            </button>

            {/* Google */}
            <button
              type="button"
              onClick={() => setRegistrationMethod('google')}
              className={`p-4 border-2 rounded-lg transition-all ${
                registrationMethod === 'google'
                  ? "border-red-500 bg-red-50 text-red-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-600"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-xs font-medium">Google</span>
              </div>
            </button>
          </div>

          {/* Facebook - Full width */}
          <button
            type="button"
            onClick={() => setRegistrationMethod('facebook')}
            className={`w-full mt-3 p-4 border-2 rounded-lg transition-all ${
              registrationMethod === 'facebook'
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-gray-200 hover:border-gray-300 text-gray-600"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium">Facebook</span>
            </div>
          </button>
        </div>

        {/* Render different registration methods */}
        {registrationMethod === 'email' ? (
          <EmailRegistrationWithOTP 
            onSuccess={handleEmailRegistrationSuccess}
            onError={handleEmailRegistrationError}
          />
        ) : registrationMethod === 'email-otp' ? (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Quick registration with email verification only</p>
            </div>
            <EmailOTPLogin 
              onSuccess={handleEmailRegistrationSuccess}
              onError={handleEmailRegistrationError}
            />
          </div>
        ) : registrationMethod === 'google' ? (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Sign up with your Google account</p>
              <button
                type="button"
                onClick={() => window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/google`, '_self')}
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
            </div>
          </div>
        ) : registrationMethod === 'facebook' ? (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Sign up with your Facebook account</p>
              <FacebookLoginComponent 
                onSuccess={handleFacebookSuccess}
                onError={handleFacebookError}
              />
            </div>
          </div>
        ) : registrationMethod === 'mobile' ? (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Sign up with your mobile number</p>
            </div>
            <MobileOTPLogin 
              onSuccess={handleMobileSuccess}
              onError={handleMobileError}
            />
          </div>
        ) : null}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onBackToLogin}
              className="font-medium text-blue-600 hover:text-blue-500 bg-transparent border-none cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
