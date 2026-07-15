const API_URL = "";

async function request(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

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

  const text = await response.text();
  let parsed;

  try {
    parsed = text ? JSON.parse(text) : {};
  } catch (error) {
    parsed = null;
  }

  if (!response.ok) {
    const errorMessage = parsed?.error || parsed?.message || text || response.statusText;
    throw new Error(errorMessage || "API request failed");
  }

  return parsed || {};
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

export function patch(endpoint, data) {
  return request(endpoint, { method: "PATCH", body: JSON.stringify(data) });
}
