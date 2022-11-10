import { api, urls } from '@api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetMessages = ({ threadId }) => {
	const response = ({ pageParam }) =>
		new Promise((resolve, reject) => {
			api
				.get(urls.message.list(threadId), { params: { cursor: pageParam } })
				.then((value) => resolve(value.data))
				.catch((error) => reject(error.response.data || error));
		});

	return useInfiniteQuery(['get-messages', threadId], response, {
		getNextPageParam: (lastPage) => lastPage?.cursor,
		enabled: !!threadId,
		keepPreviousData: true,
	});
};
