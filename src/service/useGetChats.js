import { useInfiniteQuery } from '@tanstack/react-query';
import { api, urls } from '@api';

export const useGetChats = ({ enabled }) => {
	return useInfiniteQuery(
		['get-all-chats'],
		({ pageParam }) =>
			api.get(urls.thread.list(), { params: { cursor: pageParam } }),
		{
			getNextPageParam: (lastPage) => lastPage?.data.next,
			enabled,
		},
	);
};
