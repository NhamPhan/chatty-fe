import { useMutation } from '@tanstack/react-query';
import { api, urls } from '@api';

export const useAccountActive = () => {
	return useMutation(['account-activation'], ({ uid, token }) =>
		api.post(urls.auth.activation(), { uid, token }),
	);
};
