import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginComponent = ({ onSuccess, onError }) => {
  const responseFacebook = async (response) => {
    if (response.accessToken) {
      try {
        const result = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/facebook/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken: response.accessToken,
            userID: response.userID,
            email: response.email,
            name: response.name
          }),
        });

        const data = await result.json();

        if (result.ok) {
          onSuccess(data);
        } else {
          onError(data.message || 'Facebook login failed');
        }
      } catch (error) {
        console.error('Facebook login error:', error);
        onError('Network error during Facebook login');
      }
    } else {
      onError('Facebook login was cancelled');
    }
  };

  return (
    <FacebookLogin
      appId="your_facebook_app_id_here" // Replace with your actual Facebook App ID
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      cssClass="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
      icon={
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      }
      textButton="Continue with Facebook"
    />
  );
};

export default FacebookLoginComponent;