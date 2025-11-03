const API_URL = "https://litverse-backend.vercel.app"; 

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/register`, {  // ✅ remove "api"
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
