// // src/services/api.js
// const API_URL = "https://litverse-backend.vercel.app/"; // your backend base URL

// // --- USER AUTHENTICATION ---

// // Register user
// export const registerUser = async (userData) => {
//   const res = await fetch(`${APIURL}/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });
//   return res.json();
// };

// src/services/geminiApi.js
const API_URL = "https://litverse-backend.vercel.app"; // ✅ no trailing slash

// --- USER AUTHENTICATION ---
export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/api/register`, { // ✅ correct variable + correct route
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return await res.json();
  } catch (error) {
    console.error("Register API Error:", error);
    return { success: false, message: error.message || "Server error" };
  }
};


// Login user
export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

// --- GEMINI AI INTEGRATION ---
export const geminiApiCall = async (systemPrompt, userPrompt, jsonSchema = null) => {
  try {
    const res = await fetch(`${API_URL}/gemini`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt, userPrompt, jsonSchema }),
    });

    if (!res.ok) {
      throw new Error(`Backend Gemini route error: ${res.status}`);
    }

    const data = await res.json();
    return data.result || data; // Support both `{result: "..."}` and direct text
  } catch (error) {
    console.error("Gemini API Call Error:", error);
    throw error;
  }
};
