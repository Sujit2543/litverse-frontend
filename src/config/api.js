// API Configuration
const API_CONFIG = {
  // Environment-based backend URL
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    
  // OAuth URLs
  GOOGLE_OAUTH: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/auth/google`,
    
  FACEBOOK_OAUTH: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/auth/facebook`
};

export default API_CONFIG;