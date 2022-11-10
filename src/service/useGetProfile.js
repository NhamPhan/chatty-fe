import { useQuery } from '@tanstack/react-query';
import { api, urls } from '@api';

export const useGetProfile = ({ id }) => {
	return useQuery(['get-token', id], () => api.get(urls.profile.detail(id)), {
		enabled: Boolean(id),
		refetchInterval: 5000,
	});
};
