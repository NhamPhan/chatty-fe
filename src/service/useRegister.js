import { useMutation } from '@tanstack/react-query';
import { api, urls } from '@api';

export const useRegister = () => {
	return useMutation(['register'], ({ username, password, email }) =>
		api.post(urls.auth.register(), {
			username,
			password,
			email,
		}),
	);
};
