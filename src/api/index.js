import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000", // Fallback for local dev
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosInstance;

// Add request interceptor
axiosInstance.interceptors.request.use((request) => {
	console.log("Starting Request", {
		url: request.url,
		method: request.method,
		data: request.data,
	});
	return request;
});

// Add response interceptor
axiosInstance.interceptors.response.use(
	(response) => {
		console.log("Response:", response);
		return response;
	},
	(error) => {
		console.log("Response Error:", {
			status: error.response?.status,
			data: error.response?.data,
			headers: error.response?.headers,
		});
		return Promise.reject(error);
	}
);

export const api = {
	async register(username) {
		try {
			console.log("Registering user:", username);
			const response = await axiosInstance.post("/auth/register", {
				username: username,
			});
			console.log("Registration successful:", response.data);
			return response.data;
		} catch (error) {
			console.error("Registration failed:", {
				status: error.response?.status,
				data: error.response?.data,
				message: error.message,
			});
			throw error;
		}
	},

	async login(username) {
		try {
			console.log("Logging in user:", username);
			const response = await axiosInstance.post("/auth/login", {
				username: username,
			});
			console.log("Login successful:", response.data);
			return response.data;
		} catch (error) {
			console.error("Login failed:", {
				status: error.response?.status,
				data: error.response?.data,
				message: error.message,
			});
			throw error;
		}
	},

	async submitRatings(type, userId, ratings) {
		try {
			console.log("Submitting ratings:", { type, userId, ratings });
			const response = await axiosInstance.post(
				`/ratings/rate/${type}s`,
				{
					user_id: userId,
					ratings: ratings,
				}
			);
			console.log("Ratings submitted successfully:", response.data);
			return response.data;
		} catch (error) {
			console.error("Ratings submission failed:", {
				status: error.response?.status,
				data: error.response?.data,
				message: error.message,
			});
			throw error;
		}
	},

	async getRecommendations(type, userId, preferences) {
		try {
			console.log("Getting recommendations:", {
				type,
				userId,
				preferences,
			});

			const response = await axiosInstance.post(`/recommend/${type}s`, {
				user_id: userId,
				preferences: preferences,
			});

			console.log(
				"Recommendations retrieved successfully:",
				response.data
			);
			return response.data;
		} catch (error) {
			console.error("Getting recommendations failed:", {
				status: error.response?.status,
				data: error.response?.data,
				message: error.message,
			});
			throw error;
		}
	},
};
