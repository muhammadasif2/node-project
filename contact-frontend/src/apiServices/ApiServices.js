import axios from "axios";
import { Base } from "src/api/base/BasePath";



const authHeader = (endpoint, accessToken) => {
	const publicEndpoints = ["public url"];
	if (accessToken && !publicEndpoints.includes(endpoint)) {
		return {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};
	}
	return {};
};

const ApiService = {
	get: async (endpoint, token) => {
		try {
			const response = await axios.get(`${Base}/${endpoint}`, authHeader(endpoint, token));
			if (response.status) {
				return response?.data;
			}
		} catch (error) {
			return false
		}
	},

	post: async (endpoint, data, token) => {
		try {
			const response = await axios.post(`${Base}/${endpoint}`, data, authHeader(endpoint, token));
			if (response) {
				return response;
			}
		} catch (error) {
			if (error) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				// console.error('Server responded with error status:', error.response.status)
		
				// You can also access the response data
				// console.error('Server responded with error data:', error.response.data)
				return error
		
				
			  } 
		}
	},
	post_two: async (endpoint, data, token) => {
		try {
			const response = await axios.post(`${API_URL}/${endpoint}`, data, authHeader(endpoint, token));
			return response.data;
		} catch (error) {
			toast.error(error.message);
			return error.message;
		}
	},
	put: async (endpoint, data, token) => {
		try {
			const response = await axios.put(`${Base}/${endpoint}`, data, authHeader(endpoint, token));
			if (response) {
				return response;
			}
		} catch (error) {
			return error;
		}
	},

	delete: async (endpoint, token) => {
		const response = await axios.delete(`${Base}/${endpoint}`, authHeader(endpoint, token));
		return response.data;
	},
};

export default ApiService;
