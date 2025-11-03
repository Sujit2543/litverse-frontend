import React, { useState } from 'react';

const MobileOTPLogin = ({ onSuccess, onError }) => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const countryCodes = [
    { code: '+1', country: 'US/CA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
  ];

  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');

  const sendOTP = async () => {
    if (!phoneNumber) {
      onError('Please enter your phone number');
      return;
    }

    setLoading(true);
    try {
      const fullPhoneNumber = selectedCountryCode + phoneNumber;
      const response = await fetch('http://localhost:5000/auth/mobile/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
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
      const fullPhoneNumber = selectedCountryCode + phoneNumber;
      const response = await fetch('http://localhost:5000/auth/mobile/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phoneNumber: fullPhoneNumber, 
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

  if (step === 'phone') {
    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <span className="text-sm text-gray-500">Login with Mobile Number</span>
        </div>
        
        <div className="flex space-x-2">
          <select
            value={selectedCountryCode}
            onChange={(e) => setSelectedCountryCode(e.target.value)}
            className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.code}
              </option>
            ))}
          </select>
          
          <input
            type="tel"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
            className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button
          onClick={sendOTP}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <span className="text-sm text-gray-500">
          Enter OTP sent to {selectedCountryCode}{phoneNumber}
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
          onClick={() => setStep('phone')}
          className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          onClick={verifyOTP}
          disabled={loading}
          className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </div>
      
      <button
        onClick={sendOTP}
        disabled={loading}
        className="w-full text-blue-600 text-sm underline hover:text-blue-800"
      >
        Resend OTP
      </button>
    </div>
  );
};

export default MobileOTPLogin;