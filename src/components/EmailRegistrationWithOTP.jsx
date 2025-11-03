import React, { useState } from 'react';

const EmailRegistrationWithOTP = ({ onSuccess, onError }) => {
  const [step, setStep] = useState('details'); // 'details' or 'otp'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Password validation function
  const isStrongPassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=_])[A-Za-z\d@$!%*?&#^+=_]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendOTP = async () => {
    // Validate form data
    if (!formData.firstName || !formData.email || !formData.password) {
      onError('Please fill in all required fields');
      return;
    }

    if (!isStrongPassword(formData.password)) {
      onError('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
      return;
    }

    setLoading(true);
    try {
      const API_URL = process.env.NODE_ENV === 'production' 
        ? "https://litverse-backend.vercel.app" 
        : "http://localhost:5000";

      const response = await fetch(`${API_URL}/register/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStep('otp');
        // Show OTP in development mode
        if (data.otp) {
          alert(`Development Mode - Your verification code is: ${data.otp}`);
        }
      } else {
        onError(data.message || 'Failed to send verification code');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      onError('Network error sending verification code');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      onError('Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    try {
      const API_URL = process.env.NODE_ENV === 'production' 
        ? "https://litverse-backend.vercel.app" 
        : "http://localhost:5000";

      const response = await fetch(`${API_URL}/register/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email, 
          otp
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data);
      } else {
        onError(data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      onError('Network error during verification');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'details') {
    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create Your Account
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We'll send a verification code to your email
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter any valid email address"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              We accept any domain (Gmail, Yahoo, Outlook, company emails, etc.)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Create a strong password"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Must include uppercase, lowercase, number, and special character (min 8 chars)
            </p>
          </div>
        </div>
        
        <button
          onClick={sendOTP}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
        >
          {loading ? 'Sending Verification Code...' : 'Send Verification Code'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Check Your Email
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          We sent a 6-digit verification code to<br />
          <span className="font-medium text-blue-600">{formData.email}</span>
        </p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
          Enter Verification Code
        </label>
        <input
          type="text"
          placeholder="000000"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-2xl tracking-widest font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          maxLength={6}
        />
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={() => setStep('details')}
          className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition font-medium"
        >
          Back
        </button>
        <button
          onClick={verifyOTP}
          disabled={loading || otp.length !== 6}
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
        >
          {loading ? 'Verifying...' : 'Verify & Create Account'}
        </button>
      </div>
      
      <div className="text-center">
        <button
          onClick={sendOTP}
          disabled={loading}
          className="text-blue-600 text-sm underline hover:text-blue-800 disabled:opacity-50"
        >
          Didn't receive code? Resend
        </button>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
        <p className="text-xs text-blue-800 dark:text-blue-200 text-center">
          🔒 Your email will be verified before account creation<br />
          ⏰ Code expires in 10 minutes
        </p>
      </div>
    </div>
  );
};

export default EmailRegistrationWithOTP;