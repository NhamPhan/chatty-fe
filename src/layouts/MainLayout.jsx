import { useEffect } from 'react';
import { styled } from '@mui/material';
import { Header, Sidebar } from '@sections';
import { useGetProfile } from '@service';
import useAuth from '@store/auth';
import { DRAWER_WIDTH } from '@utils/constants';
import { FullSizeCenteredFlexBox } from '@components/styled/index.jsx';
import getPageHeight from '@utils/get-page-height.js';

const RootContainer = styled(FullSizeCenteredFlexBox)({
	zIndex: 1000,
});
const topSpacing = (theme) =>
	Number(theme.mixins.toolbar.minHeight) + Number.parseInt(theme.spacing(1));
export const MainLayout = ({ children, sx, ...rest }) => {
	const [auth, { setAuth }] = useAuth();
	const { data: profile, isLoading: gettingProfile } = useGetProfile({
		id: auth.id,
	});

	useEffect(() => {
		if (profile && !gettingProfile) {
			setAuth({
				...auth,
				...profile.data,
				avatar: profile.data?.profile?.avatar || '',
			});
		}
	}, [profile, gettingProfile]);

	return (
		<FullSizeCenteredFlexBox>
			<Header />
			<Sidebar />
			<RootContainer
				sx={{
					height: getPageHeight,
					marginTop: (theme) => `${topSpacing(theme)}px`,
					marginLeft: {
						xs: `${DRAWER_WIDTH.xs}px`,
						lg: `${DRAWER_WIDTH.lg}px`,
					},
					width: {
						xs: `calc(100% - ${DRAWER_WIDTH.xs}px)`,
						lg: `calc(100% - ${DRAWER_WIDTH.lg}px)`,
					},
					...sx,
				}}
				{...rest}>
				{children}
			</RootContainer>
		</FullSizeCenteredFlexBox>
	);
};
