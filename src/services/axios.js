import axios from 'axios';
// Default config options
const defaultOptions = {
	// baseURL: 'http://voomsway-api.herokuapp.com/api/v1',
	baseURL: 'http://localhost:3000/api/v1',
	headers: {
		'x-api-key': 'hjkdfhgusfkjdgnsdklfgj'
	},
};

// Create instance
const instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(
	(config) => {
		// config.headers['x-access-token'] = authService.getUserSession();
		return config;
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error);
	});
// Add a response interceptor
instance.interceptors.response.use(
	(response) => {
		// Do something with response data
		return response;
	},
	(error) => {
		// Do something with response error
		return Promise.reject(error.response);
	});
export default instance;

export const createAPIRequest = (config) => instance(config);
