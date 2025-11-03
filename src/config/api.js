// API Configuration
const API_CONFIG = {
  // Automatically detect environment
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? "https://your-backend.vercel.app"  // Replace with your actual Vercel backend URL
    : "http://localhost:5000",
    
  // OAuth URLs (these need to match backend domain)
  GOOGLE_OAUTH: process.env.NODE_ENV === 'production'
    ? "https://your-backend.vercel.app/auth/google"
    : "http://localhost:5000/auth/google",
    
  FACEBOOK_OAUTH: process.env.NODE_ENV === 'production'
    ? "https://your-backend.vercel.app/auth/facebook"
    : "http://localhost:5000/auth/facebook"
};

export default API_CONFIG;