import { useEffect, useRef } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { notifications } from '@configs';
import useNotifications from '@store/notification';
import { SnackbarUtilsConfigurator } from '@utils/notify';

function Notifier() {
	const [notifications, actions] = useNotifications();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const displayed = useRef([]);

	function storeDisplayed(key) {
		displayed.current = [...displayed.current, key];
	}

	function removeDisplayed(key) {
		displayed.current = [...displayed.current.filter((_key) => key !== _key)];
	}

	useEffect(() => {
		for (const { message, options, dismissed } of notifications) {
			if (dismissed) {
				// dismiss snackbar using notistack
				closeSnackbar(options.key);
				continue;
			}

			// do nothing if snackbar is already displayed
			if (options.key && displayed.current.includes(options.key)) continue;

			// display snackbar using notistack
			enqueueSnackbar(message, {
				...options,
				onClick: () => closeSnackbar(options.key),
				onExited(event, key) {
					// removen this snackbar from the store
					actions.remove(key);
					removeDisplayed(key);
				},
			});

			// keep track of snackbars that we've displayed
			if (options.key) storeDisplayed(options.key);
		}
	});

	return null;
}

export const Notification = () => {
	return (
		<SnackbarProvider maxSnack={notifications.maxSnack}>
			<SnackbarUtilsConfigurator />
			<Notifier />
		</SnackbarProvider>
	);
};
