import { api, urls } from '@api';
import { useQuery } from '@tanstack/react-query';

export const useGetChat = ({ id }) => {
	const response = () =>
		new Promise((resolve, reject) => {
			api
				.get(urls.thread.detail(id))
				.then((value) => resolve(value.data))
				.catch((error) => reject(error.response?.data || error));
		});
	return useQuery(['get-chat-detail', id], response, {
		enabled: !!id,
		retry: 3,
		retryDelay: 500,
	});
};
