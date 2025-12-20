export const getAllUsers = async () => {
	const response = await fetch("http://localhost:8000/api/user/getAllUsers", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store",
	});

	if (!response.ok) {
		const errorBody = await response.json().catch(() => ({}));
		throw new Error(errorBody.message || "Failed to fetch users");
	}

	return response.json();
};
