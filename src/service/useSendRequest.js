import { useMutation } from '@tanstack/react-query';
import { api, urls } from '@api';
import useAuth from '@store/auth';

export const useSendRequest = () => {
	const [auth] = useAuth();
	return useMutation(['send-friend-request'], ({ friendId }) =>
		api.post(urls.friend.sendRequest(), { userId: auth.id, friendId }),
	);
};
