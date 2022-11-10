import { useMutation } from '@tanstack/react-query';
import { api, urls } from '@api';

export const useProcessRequest = () => {
	return useMutation(
		['process-friend-request'],
		({ isActive, notificationId }) =>
			api.put(urls.friend.processRequest(), { isActive, notificationId }),
	);
};
