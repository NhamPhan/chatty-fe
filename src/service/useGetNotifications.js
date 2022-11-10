import { useInfiniteQuery } from '@tanstack/react-query';
import { api, urls } from '@api';
import useAuth from '@store/auth';

export const useGetNotifications = () => {
	const [, { isAuthenticated }] = useAuth();
	return useInfiniteQuery(
		['get-notification'],
		() => api.get(urls.notification.list()),
		{
			keepPreviousData: true,
			getNextPageParam: (lastPage) => lastPage.data.next,
			enabled: isAuthenticated,
			refetchInterval: 5000,
		},
	);
};
