import { useMutation } from '@tanstack/react-query';
import { api, urls } from '@api';

export const useGetToken = (options) => {
	return useMutation(
		['get-token'],
		(variables) => api.post(urls.auth.login(), variables),
		{
			...options,
		},
	);
};
