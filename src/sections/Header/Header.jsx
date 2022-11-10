import { useState } from 'react';
import {
	AppBar,
	Avatar,
	Badge,
	Box,
	IconButton,
	styled,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import { FlexBox } from '@components/styled';
import Logo from '@components/Logo';
import { title } from '@configs';
import { AccountMenu } from './components';
import useAuth from '@store/auth';
import { NotificationsNoneOutlined } from '@mui/icons-material';
import { NotificationBox } from './Notification/NotificationBox';
import { useParams } from 'react-router-dom';
import useChats from '@store/chats/index.js';
import { getActiveChat, getThreadName } from '@utils/chats.js';

const Container = styled(FlexBox)({
	alignItems: 'center',
	gap: 1,
});

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.shadows.slice(0, 10),
}));

export const Header = () => {
	const [auth] = useAuth();
	const [anchorAccount, setAnchorAccount] = useState(null);
	const [anchorMenu, setAnchorMenu] = useState(null);

	const { id } = useParams();
	const { chats } = useChats();

	const currentChat = getActiveChat(chats, id);
	const chatName = id ? getThreadName(currentChat, auth.id) : title;

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<DashboardNavbarRoot
					sx={{
						left: {
							lg: 280,
						},
						width: {
							lg: 'calc(100% - 280px)',
							xs: 'calc(100% - 100px)',
						},
					}}>
					<Toolbar
						disableGutters
						sx={{
							minHeight: 64,
							left: 0,
							px: 2,
							justifyContent: 'space-between',
						}}>
						<Container>
							<IconButton>
								{id ? (
									<Avatar alt={chatName}>{chatName[0]}</Avatar>
								) : (
									<Logo width={40} height={40} />
								)}
							</IconButton>
							<Typography
								color={(theme) => theme.palette.text.primary}
								gutterBottom>
								{chatName}
							</Typography>
						</Container>
						<Container>
							<IconButton
								sx={{ ml: 1 }}
								onClick={(event) => setAnchorMenu(event.currentTarget)}>
								<Badge badgeContent={4} color="primary" variant="dot">
									<NotificationsNoneOutlined fontSize="medium" />
								</Badge>
							</IconButton>
							<Tooltip title={auth?.displayName || ''}>
								<Avatar
									onClick={(event) => setAnchorAccount(event.currentTarget)}
									sx={{
										cursor: 'pointer',
										height: 40,
										width: 40,
										ml: 1,
									}}
									alt={auth.username}
									src={auth.avatar}
								/>
							</Tooltip>
						</Container>
					</Toolbar>
				</DashboardNavbarRoot>
			</Box>
			<AccountMenu
				onClose={() => setAnchorAccount(null)}
				anchorEl={anchorAccount}
			/>
			<NotificationBox
				open={Boolean(anchorMenu)}
				anchorEl={anchorMenu}
				onClose={() => setAnchorMenu(null)}
			/>
		</>
	);
};
