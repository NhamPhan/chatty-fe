const getUserDisplayName = (user) =>
	user?.firstName ? `${user.firstName} ${user.lastName}` : user?.username;

const getThreadName = (thread, excludeUserId) => {
	if (thread?.name) return thread.name;
	return (
		thread?.members
			.filter(({ user }) => user?.id !== excludeUserId)
			.map(({ user }) => getUserDisplayName(user))
			.join(', ') || 'N/A'
	);
};

const getMember = (thread, memberId) => {
	return thread?.members?.find((member) => member.user.id === memberId);
};

const getActiveChat = (threads, id) => {
	return threads.find((thread) => thread.id === id);
};

function stringToColor(string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string?.length; i += 1) {
		hash = string.codePointAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
	};
}

const toCamel = (str) => {
	return str.replace(/([_-][a-z])/gi, ($1) => {
		return $1.toUpperCase().replace('-', '').replace('_', '');
	});
};

const isObject = function (obj) {
	return (
		obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
	);
};

const keysToCamel = function (obj) {
	if (isObject(obj)) {
		const n = {};

		for (const k of Object.keys(obj)) {
			n[toCamel(k)] = keysToCamel(obj[k]);
		}

		return n;
	} else if (Array.isArray(obj)) {
		return obj.map((i) => {
			return keysToCamel(i);
		});
	}

	return obj;
};

export {
	getMember,
	getThreadName,
	getUserDisplayName,
	getActiveChat,
	stringAvatar,
	keysToCamel,
};
