const REGEX_PASSWORD = /^(?=.*\d)(?=.*[A-Za-z])[\w.@\-]{8,}$/;
const REGEX_ONLY_NUMBER = /^\d+$/;

const DRAWER_WIDTH = {
	lg: 280,
	xs: 100,
};

const CONTACT_TYPES = {
	PENDING: 'pending',
	SENDER: 'pending_sent',
	STRANGER: 'stranger',
	FRIEND: 'friend',
};

const GENDER = [
	{ label: 'Male', id: 'male' },
	{ label: 'Female', id: 'female' },
	{ label: 'Other', id: 'other' },
];

const ADD_FRIEND = 'add-friend';
const ADD_CHAT = 'add-chat';

export {
	REGEX_PASSWORD,
	REGEX_ONLY_NUMBER,
	CONTACT_TYPES,
	DRAWER_WIDTH,
	GENDER,
	ADD_CHAT,
	ADD_FRIEND,
};
