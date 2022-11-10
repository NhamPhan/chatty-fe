import { useMutation } from '@tanstack/react-query';
import { api, urls } from '@api';

export const useUpdateProfile = ({ id }) => {
	return useMutation(['update-user-profile', id], (data) =>
		api.put(urls.profile.update(id), data),
	);
};
