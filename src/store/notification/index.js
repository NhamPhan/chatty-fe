import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

import { notifications as notificationsDefaults } from '@configs';

const notificationsState = atom({
	key: 'notificationsState',
	default: [],
});

function useNotifications() {
	const [notifications, setNotifications] = useRecoilState(notificationsState);

	const push = useCallback(
		(notification) => {
			const id = Math.random().toString();
			setNotifications((notifications) => [
				...notifications,
				{
					...notification,
					message: notification.message,
					dismissed: false,
					options: {
						...notificationsDefaults.options,
						...notification.options,
						key: id,
					},
				},
			]);

			return id;
		},
		[setNotifications],
	);

	const close = useCallback(
		(key, dismissAll = !key) => {
			setNotifications((notifications) =>
				notifications.map((notification) =>
					dismissAll || notification.options.key === key
						? { ...notification, dismissed: true }
						: { ...notification },
				),
			);
		},
		[setNotifications],
	);

	const remove = useCallback(
		(key) => {
			setNotifications((notifications) =>
				notifications.filter(
					(notification) => notification.options.key !== key,
				),
			);
		},
		[setNotifications],
	);

	const actions = useMemo(
		() => ({ push, close, remove }),
		[push, close, remove],
	);

	return [notifications, actions];
}

export default useNotifications;
