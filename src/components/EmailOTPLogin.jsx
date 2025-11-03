import React, { useState } from 'react';

const EmailOTPLogin = ({ onSuccess, onError }) => {
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: "Invalid email format" };
    }

    const validDomains = [
      'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'live.com',
      'icloud.com', 'aol.com', 'protonmail.com', 'zoho.com', 'yandex.com',
      'mail.com', 'gmx.com', 'fastmail.com', 'tutanota.com'
    ];
    
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (domain?.endsWith('.edu') || domain?.endsWith('.org') || domain?.endsWith('.gov')) {
      return { valid: true, message: "Valid email" };
    }
    
    if (!validDomains.includes(domain)) {
      return { 
        valid: false, 
        message: `Please use a valid email from providers like Gmail, Yahoo, Outlook, etc.` 
      };
    }
    
    return { valid: true, message: "Valid email" };
  };

  const sendOTP = async () => {
    if (!email) {
      onError('Please enter your email address');
      return;
    }

    const emailValidation = isValidEmail(email);
    if (!emailValidation.valid) {
      onError(emailValidation.message);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/email/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep('otp');
        // Show OTP in development mode
        if (data.otp) {
          alert(`Development Mode - Your OTP is: ${data.otp}`);
        }
      } else {
        onError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      onError('Network error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      onError('Please enter the OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/email/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          otp,
          firstName: isNewUser ? firstName : undefined,
          lastName: isNewUser ? lastName : undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data);
      } else {
        if (data.message.includes('First name is required')) {
          setIsNewUser(true);
          onError('Please provide your name for account creation');
        } else {
          onError(data.message || 'OTP verification failed');
        }
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      onError('Network error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'email') {
    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <span className="text-sm text-gray-500">Login with Email OTP</span>
        </div>
        
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        {email && !isValidEmail(email).valid && (
          <p className="text-xs text-red-500">
            {isValidEmail(email).message}
          </p>
        )}
        
        <button
          onClick={sendOTP}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? 'Sending OTP...' : 'Send OTP to Email'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <span className="text-sm text-gray-500">
          Enter OTP sent to {email}
        </span>
      </div>
      
      {isNewUser && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Last Name (Optional)"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}
      
      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
        maxLength={6}
      />
      
      <div className="flex space-x-3">
        <button
          onClick={() => setStep('email')}
          className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          onClick={verifyOTP}
          disabled={loading}
          className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </div>
      
      <button
        onClick={sendOTP}
        disabled={loading}
        className="w-full text-purple-600 text-sm underline hover:text-purple-800"
      >
        Resend OTP
      </button>
    </div>
  );
};

export default EmailOTPLogin;