import { useMutation } from '@tanstack/react-query';
import { api, urls } from '@api';

export const useResetPassword = () => {
	return useMutation(['reset-password'], (variables) =>
		api.post(urls.auth.resetPassword(), variables),
	);
};
