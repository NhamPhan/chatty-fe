import { useQuery } from '@tanstack/react-query';
import { api, urls } from '@api';

export const useGetMe = ({ enabled = false, ...rest }) => {
	return useQuery(['get-me', enabled], () => api.get(urls.auth.me()), {
		enabled,
		refetchInterval: 5000,
		...rest,
	});
};
