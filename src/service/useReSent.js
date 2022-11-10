import { useMutation } from '@tanstack/react-query';
import { api, urls } from '@api';

export const useReSent = () => {
	return useMutation(['resent-activation-email'], (variables) =>
		api.post(urls.auth.resendActivation(), variables),
	);
};
