import { Menu } from '@mui/material';
import { useGetNotifications } from '@service';

const ITEM_HEIGHT = 48;
export const NotificationBox = ({ anchorEl, open, onClose }) => {
	const { isLoading, data, isFetching, hasNextPage, fetchNextPage } =
		useGetNotifications();

	const handleFetchMore = (event) => {
		const currentHeight = event.target.scrollTop + ITEM_HEIGHT * 4.5;
		if (currentHeight === event.target.scrollHeight && hasNextPage) {
			fetchNextPage();
		}
	};
	return (
		<Menu
			open={open}
			anchorEl={anchorEl}
			onClose={onClose}
			PaperProps={{
				onScroll: handleFetchMore,
				sx: {
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: 1.5,
					maxHeight: ITEM_HEIGHT * 4.5,
					minHeight: ITEM_HEIGHT * 2,
					width: '35ch',
					overflowY: 'scroll',
					'& .MuiAvatar-root': {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1,
					},
					'&:before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: 0,
						right: 20,
						width: 10,
						height: 10,
						bgcolor: 'background.paper',
						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: 0,
					},
				},
			}}>
			<div />
		</Menu>
	);
};
