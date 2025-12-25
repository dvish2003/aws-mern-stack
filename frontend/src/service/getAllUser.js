import { apiClient } from "./apiClient";

export const getAllUsers = async () => {
	const response = await apiClient("/user/getAllUsers", "GET");
	if (!response.ok) {
		const errorBody = await response.json().catch(() => ({}));
		throw new Error(errorBody.message || "Failed to fetch users");
	}

	return response.json();
};
