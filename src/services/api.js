const API_URL = import.meta.env.VITE_API_URL || 'https://codearena-emfi.onrender.com/api';

export const api = {
  // Auth
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  register: async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return response.json();
  },

  // Problems
  getProblems: async () => {
    const response = await fetch(`${API_URL}/problems`);
    return response.json();
  },

  // Bookmarks
  getBookmarks: async (token) => {
    const response = await fetch(`${API_URL}/bookmarks`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  addBookmark: async (problemId, token) => {
    const response = await fetch(`${API_URL}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ problemId })
    });
    return response.json();
  }
};