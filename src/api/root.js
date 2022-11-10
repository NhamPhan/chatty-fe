import axios from 'axios';
import { apiUrl } from '@configs';
import Cookies from 'js-cookie';

const authKey = 'auth-state';

const getLocalToken = () => {
	return localStorage.getItem('token') || '';
};

const getLocalRefreshToken = () => {
	const auth = JSON.parse(localStorage.getItem(authKey) || '{}');
	return auth?.refreshToken || '';
};

const alterTokens = (token) => {
	localStorage.setItem('token', token);
};

const api = axios.create({
	baseURL: apiUrl,
	timeout: 300_000,
	headers: {
		'Content-Type': 'application/json',
		'X-CSRFToken': Cookies.get('csrftoken'),
	},
});

const refreshToken = () => {
	const refreshToken = getLocalRefreshToken();
	return refreshToken && refreshToken.length > 0
		? api.post('/auth/jwt/refresh', {
				refresh: getLocalRefreshToken(),
		  })
		: { status: 401 };
};

api.interceptors.request.use(async (config) => {
	const token = getLocalToken();
	config.headers = {
		...config.headers,
		...(token ? { 'X-Access-Token': `Bearer ${getLocalToken()}` } : undefined),
		Accept: 'application/json',
	};
	config.withCredentials = ['post', 'put', 'patch'].includes(config.method);
	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const { status } = error.response;
		const originalRequest = error.config;
		if (
			status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url.includes('jwt/create')
		) {
			originalRequest._retry = true;
			const response = await refreshToken();
			if (response.status === 201) {
				const token = response.data?.access;
				alterTokens(token);

				axios.defaults.headers.common['X-Access-Token'] = 'Bearer ' + token;
				return api(originalRequest);
			}
		}
		throw error;
	},
);

export default api;
