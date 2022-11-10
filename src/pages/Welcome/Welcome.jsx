import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FullSizeCenteredFlexBox } from '@components/styled';
import { Typography } from '@mui/material';
import { Image } from './styled';
import AppLogo from '@assets/logo.png';
import useAuth from '@store/auth';
import useChats from '@store/chats';
import { useGetMe, useGetProfile } from '@service';
import EmptyLayout from '@layouts/EmptyLayout';
import { UpdateProfileModal } from './components/UpdateProfileModal';

const Welcome = () => {
	const navigate = useNavigate();
	const [showUpdate, setShowUpdate] = useState(false);

	const [auth, { setAuth, isAuthenticated }] = useAuth();

	const { data: info } = useGetMe({
		enabled: isAuthenticated,
	});
	const { data: profile, isLoading: gettingProfile } = useGetProfile({
		id: info?.data?.id,
	});

	const { chats, isLoading } = useChats(!!profile);

	useEffect(() => {
		if (profile && !gettingProfile) {
			if (!(profile.data?.firstName || profile.data?.lastName)) {
				setShowUpdate(true);
			}
			setAuth({
				...auth,
				...profile.data,
				avatar: profile.data?.profile?.avatar || '',
				displayName:
					profile.data?.firstName?.length > 0
						? `${profile.data?.firstName} ${profile.data?.lastName}`
						: `@${profile.data?.username}`,
			});
		}
	}, [profile, gettingProfile]);

	useEffect(() => {
		const updated = profile?.data?.firstName || profile?.data?.lastName;
		if (!isLoading && updated) {
			navigate(`/t/${chats?.[0]?.id || '#'}`);
		}
	}, [chats, isLoading, profile]);

	return (
		<EmptyLayout>
			<FullSizeCenteredFlexBox flexDirection="column">
				<Image src={AppLogo} alt="chatty-logo" width={80} height={80} />
				<Typography>Welcome!</Typography>
			</FullSizeCenteredFlexBox>
			<UpdateProfileModal
				onClose={() => setShowUpdate(false)}
				open={showUpdate}
			/>
		</EmptyLayout>
	);
};

export default Welcome;
