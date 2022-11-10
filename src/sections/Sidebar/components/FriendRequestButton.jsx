import React, { useMemo, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { CONTACT_TYPES } from '@utils/constants';
import { useProcessRequest, useSendRequest } from '@service';
import useNotifications from '@store/notification';
import { Button, ButtonGroup } from '@mui/material';

export const FriendRequestButton = ({ user, refetch }) => {
	const { contactType } = user || {
		contactType: '',
		id: 0,
	};
	const isHidden = [CONTACT_TYPES.FRIEND, CONTACT_TYPES.PENDING].includes(
		contactType,
	);
	const isDisabled = contactType === CONTACT_TYPES.SENDER;

	const [isActive, setIsActive] = useState(false);
	const [, { push }] = useNotifications();
	const { mutateAsync: sendRequest, isLoading: sendingRequest } =
		useSendRequest();
	const { mutateAsync: processRequest, isLoading: processingRequest } =
		useProcessRequest();

	const handleSendRequest = () => {
		sendRequest(
			{ friendId: user.id },
			{
				onSuccess: () => {
					push({ message: 'Request sent.', options: { variant: 'success' } });
					if (refetch) refetch();
				},
			},
		);
	};

	const handProcessRequest = (isActive) => {
		if (user?.notificationId) {
			const message = isActive
				? 'Accepted. You guys are now friends.'
				: 'Denied.';
			setIsActive(isActive);
			processRequest(
				{ isActive, notificationId: user.notificationId },
				{
					onSuccess: () => {
						push({
							message,
							options: { variant: 'success' },
						});
						refetch?.();
					},
				},
			);
		}
	};

	const handleClick = () => {
		switch (contactType) {
			case CONTACT_TYPES.STRANGER:
				handleSendRequest();
				break;
			default:
				break;
		}
	};

	const isLoading = useMemo(() => sendingRequest, [sendingRequest]);

	const renderMessage = () => {
		switch (contactType) {
			case CONTACT_TYPES.STRANGER:
				return 'Add friend';
			case CONTACT_TYPES.SENDER:
				return 'Pending';
			default:
				return '';
		}
	};
	return contactType !== CONTACT_TYPES.FRIEND ? (
		<React.Fragment>
			<LoadingButton
				fullWidth
				sx={isHidden ? { display: 'none' } : {}}
				onClick={handleClick}
				disabled={isDisabled}
				variant="outlined"
				color="primary"
				loading={isLoading}>
				{renderMessage()}
			</LoadingButton>
			<ButtonGroup fullWidth sx={!isHidden ? { display: 'none' } : {}}>
				<LoadingButton
					onClick={() => handProcessRequest(true)}
					variant="outlined"
					loading={processingRequest && isActive}
					disabled={processingRequest}
					color="success">
					Accept
				</LoadingButton>
				<LoadingButton
					onClick={() => handProcessRequest(false)}
					loading={processingRequest && !isActive}
					disabled={processingRequest}
					variant="outlined"
					color="error">
					Deny
				</LoadingButton>
			</ButtonGroup>
		</React.Fragment>
	) : (
		<Button fullWidth variant="outlined" color="primary">
			Friend
		</Button>
	);
};
