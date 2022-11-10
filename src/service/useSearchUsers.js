import { useInfiniteQuery } from '@tanstack/react-query';
import { api, urls } from '@api';

export const useSearchUsers = ({ keyword, isFriend }) => {
	return useInfiniteQuery(
		['search-user', keyword],
		({ pageParam = null }) =>
			api.get(urls.profile.list(), {
				params: { search: keyword, cursor: pageParam, is_friend: isFriend },
			}),
		{
			enabled: !!keyword || isFriend,
			getNextPageParam: (lastGroup) => lastGroup.data.next,
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			cacheTime: 1,
		},
	);
};
