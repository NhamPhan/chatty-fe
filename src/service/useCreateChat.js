import { useMutation } from '@tanstack/react-query';
import { api, urls } from '@api';

export const useCreateChat = () => {
	return useMutation(['create-chat'], ({ memberIds, name }) => {
		return api.post(urls.thread.create(), {
			memberIds,
			name,
		});
	});
};
