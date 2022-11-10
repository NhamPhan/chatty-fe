import {
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Tooltip,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { FlexBox } from '@components/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { getMember, getThreadName, getUserDisplayName } from '@utils/chats';
import useAuth from '@store/auth/index.js';

export const ThreadPlaceholder = ({ thread, ...rest }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [auth] = useAuth();

	const isSelected = thread.id === id;
	const { lastMessage } = thread;
	const threadName = useMemo(
		() => getThreadName(thread, auth.id),
		[auth.id, thread],
	);

	const member = useMemo(
		() => (lastMessage ? getMember(thread, lastMessage?.createdBy) : undefined),
		[lastMessage, thread],
	);

	const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
		defaultMatches: true,
		noSsr: false,
	});

	return (
		<ListItem
			alignItems={lgUp ? 'flex-start' : 'center'}
			sx={{
				borderRadius: 1,
				bgcolor: isSelected ? 'neutral.700' : 'neutral.800',
				justifyContent: !lgUp ? 'center' : 'space-between',
				my: 1,
			}}
			onClick={() => navigate(`/t/${thread.id}`)}
			{...rest}>
			<ListItemAvatar
				sx={() => (!lgUp ? { width: 40, minWidth: 40 } : undefined)}>
				<Tooltip title={lgUp ? '' : threadName}>
					<Avatar src="#" alt={`thread-${threadName}`}>
						{threadName ? threadName[0] : ''}
					</Avatar>
				</Tooltip>
			</ListItemAvatar>
			{lgUp ? (
				<ListItemText
					secondaryTypographyProps={{
						component: 'span',
					}}
					primary={
						<>
							<Typography
								sx={{
									display: 'inline',
									textOverflow: 'ellipsis',
									overflowX: 'hidden',
								}}
								noWrap
								component="span"
								variant="body2">
								{threadName}
							</Typography>
						</>
					}
					secondary={
						<FlexBox sx={{ gap: 0.5 }}>
							<Typography
								sx={{ display: 'inline' }}
								component="span"
								variant="body2">
								{member ? getUserDisplayName(member.user) : 'No messages'}
							</Typography>
							<Typography
								noWrap
								variant="body2"
								display={lastMessage ? 'inline-block' : 'none'}>
								- {lastMessage?.content}
							</Typography>
						</FlexBox>
					}
				/>
			) : (
				<></>
			)}
		</ListItem>
	);
};
