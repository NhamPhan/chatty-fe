import { useMemo, useRef, useState } from 'react';
import {
	Box,
	CircularProgress,
	Drawer,
	IconButton,
	List,
	Tooltip,
	Typography,
} from '@mui/material';
import { MessageOutlined, PersonAdd } from '@mui/icons-material';
import {
	CenteredFlexBox,
	FlexBox,
	FullSizeCenteredFlexBox,
} from '@components/styled';
import { SearchBox } from './components/SearchBox';
import { ThreadPlaceholder } from './components/ThreadPlaceholder';
import { CreateThreadDialog } from './components/CreateThreadDialog';
import { FindContactDialog } from './components/FindContactDialog';
import { useCreateChat } from '@service';
import useNotifications from '@store/notification';
import useBottomReach from '@hooks/useBottomReach';
import useChats from '@store/chats';
import { useNavigate } from 'react-router-dom';
import { ADD_CHAT, ADD_FRIEND, DRAWER_WIDTH } from '@utils/constants';
import useModal from '@store/modal';

const Sidebar = () => {
	const chatRef = useRef(null);
	const [, modal] = useModal();

	const addFriend = useMemo(() => modal.getState(ADD_FRIEND), [modal]);
	const addChat = useMemo(() => modal.getState(ADD_CHAT), [modal]);

	const navigate = useNavigate();

	const { chats, isLoading, isFetching, fetchNextPage, hasNextPage } =
		useChats();

	const onBottomReach = () => {
		if (hasNextPage) fetchNextPage();
	};

	const [, { push }] = useNotifications();
	const { onScroll } = useBottomReach({ ref: chatRef, onBottomReach });

	const { mutateAsync, isLoading: creatingChat } = useCreateChat();

	const handleCreateThread = ({ memberIds, name }) => {
		mutateAsync(
			{ memberIds, name },
			{
				onSuccess: ({ data }) => {
					push({ message: 'Chat created!', options: { variant: 'success' } });
					const threadId = data?.result?.id;
					console.log(data);
					if (threadId) {
						navigate(`/t/${threadId}`);
					}
				},
			},
		);
	};
	const contents = (
		<FlexBox
			sx={{
				flexDirection: 'column',
				height: '100%',
				gap: 1,
			}}>
			<FlexBox sx={{ margin: 1, justifyContent: 'space-between' }}>
				<Typography
					variant="h5"
					sx={{
						display: {
							lg: 'block',
							xs: 'none',
						},
					}}>
					Chats
				</Typography>
				<FlexBox>
					<Tooltip title="Find a new friend">
						<IconButton onClick={() => modal.setState(ADD_FRIEND, true)}>
							<PersonAdd />
						</IconButton>
					</Tooltip>
					<Tooltip title="Write a new message">
						<IconButton onClick={() => modal.setState(ADD_CHAT, true)}>
							<MessageOutlined />
						</IconButton>
					</Tooltip>
				</FlexBox>
			</FlexBox>
			<Box sx={{ mr: 3, ml: 1 }}>
				<SearchBox
					id="search-box"
					placeholder="Search something?"
					variant="outlined"
					containerProps={{
						sx: {
							display: {
								xs: 'none',
								lg: 'block',
							},
						},
					}}
				/>
			</Box>
			<List
				ref={chatRef}
				onScroll={onScroll}
				sx={{
					width: '100%',
					maxWidth: DRAWER_WIDTH,
					px: 1,
				}}>
				{chats?.map((item) => (
					<ThreadPlaceholder key={`thread-${item?.id}`} thread={item} />
				))}
				{isFetching && (
					<CenteredFlexBox>
						<CircularProgress />
					</CenteredFlexBox>
				)}
			</List>
		</FlexBox>
	);
	return (
		<>
			<Drawer
				anchor="left"
				open
				PaperProps={{
					sx: {
						backgroundColor: (theme) =>
							theme.palette.mode === 'dark' ? 'neutral.900' : 'neutral.800',
						color: '#FFFFFF',
						width: DRAWER_WIDTH,
						borderRight: 'unset',
					},
				}}
				variant="permanent">
				{isLoading ? (
					<FullSizeCenteredFlexBox>
						<CircularProgress />
					</FullSizeCenteredFlexBox>
				) : (
					contents
				)}
			</Drawer>
			<CreateThreadDialog
				open={addChat}
				onClose={() => modal.setState(ADD_CHAT, false)}
				isLoading={creatingChat}
				onCreate={handleCreateThread}
			/>
			<FindContactDialog
				open={addFriend}
				onClose={() => modal.setState(ADD_FRIEND, false)}
				keepMounted
				PaperProps={{
					sx: {
						width: 700,
						height: '80%',
					},
				}}
			/>
		</>
	);
};
export default Sidebar;
