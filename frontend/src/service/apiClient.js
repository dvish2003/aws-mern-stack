export const apiClient = async (endpoint, method = "GET", body = null) => {
  const res = await fetch(`/api${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
};
