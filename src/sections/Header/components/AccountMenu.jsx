import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { AccountCircleOutlined, Logout } from '@mui/icons-material';
import ThemeSwitch from './ThemeSwitch';
import useAuthActions from '@store/auth/actions';

const AccountMenu = ({ anchorEl, ...rest }) => {
	const { logout } = useAuthActions();

	const menuItems = [
		{
			title: 'Profile',
			icon: <AccountCircleOutlined />,
		},
		{
			title: 'Logout',
			icon: <Logout />,
			divider: true,
			onClick: () => logout(),
		},
		{
			title: 'Mode',
			icon: <ThemeSwitch />,
			sx: {
				flexDirection: 'row-reverse',
			},
		},
	];
	return (
		<Menu
			open={Boolean(anchorEl)}
			anchorEl={anchorEl}
			PaperProps={{
				elevation: 12,
				sx: {
					boxShadow: (theme) => theme.shadows[19],
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: 1.5,
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
			}}
			{...rest}
			transformOrigin={{ horizontal: 'right', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
			{menuItems.map(({ icon, title, ...rest }) => (
				<MenuItem key={`item-${title}`} {...rest}>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText is={'span'}>{title}</ListItemText>
				</MenuItem>
			))}
		</Menu>
	);
};

export default AccountMenu;
