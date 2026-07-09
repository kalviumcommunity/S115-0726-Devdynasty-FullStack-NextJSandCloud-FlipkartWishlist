const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "API request failed");
  }

  return response.json();
}

export function get(endpoint) {
  return request(endpoint, { method: "GET" });
}

export function post(endpoint, data) {
  return request(endpoint, { method: "POST", body: JSON.stringify(data) });
}
