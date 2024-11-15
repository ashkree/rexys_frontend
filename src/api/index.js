import axios from "axios";

// Create an axios instance with dynamic base URL
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000", // Fallback to localhost for dev
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Add request interceptor for logging
axiosInstance.interceptors.request.use(
	(request) => {
		console.log("Starting Request", request);
		return request;
	},
	(error) => {
		console.error("Request Error:", error);
		return Promise.reject(error);
	}
);

// Add response interceptor for logging
axiosInstance.interceptors.response.use(
	(response) => {
		console.log("Response:", response);
		return response;
	},
	(error) => {
		console.error("Response Error:", error.response || error.message);
		return Promise.reject(error.response?.data || error.message);
	}
);

export const api = {
	async register(username) {
		try {
			const response = await axiosInstance.post("/auth/register", {
				username,
			});
			return response.data;
		} catch (error) {
			console.error("Registration failed:", error);
			throw error;
		}
	},

	async login(username) {
		try {
			const response = await axiosInstance.post("/auth/login", {
				username,
			});
			return response.data;
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		}
	},

	async getInitialItems(type) {
		try {
			const response = await axiosInstance.get(
				`/ratings/${type}s/initial`
			);
			return response.data;
		} catch (error) {
			console.error(`Fetching initial ${type}s failed:`, error);
			throw error;
		}
	},

	async submitRatings(type, userId, ratings) {
		try {
			const response = await axiosInstance.post(
				`/ratings/rate/${type}s`,
				{
					user_id: userId,
					ratings,
				}
			);
			return response.data;
		} catch (error) {
			console.error(`Submitting ${type} ratings failed:`, error);
			throw error;
		}
	},

	async getRecommendations(type, userId, preferences) {
		try {
			const response = await axiosInstance.post(`/recommend/${type}s`, {
				params: {
					user_id: userId,
					preferences: JSON.stringify(preferences),
				},
			});
			return response.data;
		} catch (error) {
			console.error(`Fetching ${type} recommendations failed:`, error);
			throw error;
		}
	},
};
