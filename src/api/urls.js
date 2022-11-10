const profile = {
	detail: (id) => `api/users/${id}`,
	update: (id) => `api/users/${id}`,
	list: () => 'api/users/',
};
const friend = {
	list: () => 'api/friend-request/',
	sendRequest: () => 'api/friend-request/',
	processRequest: () => 'api/friend-request/',
	deleteRequest: () => 'api/friend-request/',
};

const notification = {
	list: () => 'api/notification/',
};

const auth = {
	login: () => 'auth/jwt/create/',
	refresh: () => 'auth/jwt/refresh/',
	me: () => 'auth/users/me/',
	verifyToken: () => 'auth/jwt/verify/',
	register: () => 'auth/users/',
	activation: () => 'auth/users/activation/',
	resendActivation: () => 'auth/users/resend_activation/',
	resetPassword: () => 'auth/users/reset_password/',
	resetPasswordConfirm: () => 'auth/users/reset_password_confirm/',
};

const thread = {
	list: () => 'api/threads/',
	detail: (id) => `api/threads/${id}`,
	create: () => 'api/threads/',
};

const message = {
	list: (id) => `api/message/${id}`,
};

const urls = { friend, notification, auth, profile, thread, message };
export default urls;
