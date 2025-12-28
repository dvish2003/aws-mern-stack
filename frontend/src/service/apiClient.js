const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = async (endpoint, method = "GET", body = null) => {
  const res = await fetch(`${API_URL}/api${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
    cache: "no-store",
  });

  return res;
};
