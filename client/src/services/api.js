const API_URL = "";

async function request(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add auth token if available
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "API request failed");
  }

  // Some responses might be empty (e.g., 204 No Content)
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export function get(endpoint) {
  return request(endpoint, { method: "GET" });
}

export function post(endpoint, data) {
  return request(endpoint, { method: "POST", body: JSON.stringify(data) });
}

export function del(endpoint) {
  return request(endpoint, { method: "DELETE" });
}
