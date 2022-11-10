import React from 'react';
import ChatGroup from '@assets/chat-group.png';
import { FlexBox } from '@components/styled';
import { styled } from '@mui/system';

const RootContainer = styled(FlexBox)(({ theme }) => ({
	height: '100vh',
	alignItems: 'center',
	justifyContent: 'flex-end',
	backgroundImage: `url(${ChatGroup})`,
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
	[theme.breakpoints.up('lg')]: {
		marginRight: theme.spacing(6),
	},
	[theme.breakpoints.down('lg')]: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundPosition: 'right',
	},
}));

const EmptyLayout = ({ children, ...rest }) => {
	return <RootContainer {...rest}>{children}</RootContainer>;
};

export default EmptyLayout;
