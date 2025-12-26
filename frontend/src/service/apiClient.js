export const apiClient = async (endpoint, method, body = null) => {
    const response = await fetch(`http://13.60.69.215:5000/api${endpoint}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
        cache: "no-store",
    });

    return response;
}