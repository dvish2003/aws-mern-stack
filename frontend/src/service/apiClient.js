const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = async (endpoint, method = "GET", body = null) => {
  const res = await fetch(`http://13.51.48.151:5000/api${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
    cache: "no-store",
  });

  return res;
};
