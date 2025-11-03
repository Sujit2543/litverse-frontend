// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // your backend base URL

// --- USER AUTHENTICATION ---

// Register user
export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
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
