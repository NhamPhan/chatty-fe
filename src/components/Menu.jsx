import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

export const Menu = ({
	anchorEl,
	open,
	onClose,
	onClick,
	menuItems = [],
	...rest
}) => {
	return (
		<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={onClose}
			onClick={onClick}
			PaperProps={{}}
			{...rest}>
			{menuItems.map(({ icon, title, children, ...itemProps }) => (
				<MenuItem key={`${title}-menu-item`} {...itemProps}>
					{icon ? <ListItemIcon>{icon}</ListItemIcon> : <></>}
					{title ? <ListItemText>{title}</ListItemText> : <></>}
					{children}
				</MenuItem>
			))}
		</Menu>
	);
};
