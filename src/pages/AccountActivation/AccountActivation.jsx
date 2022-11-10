import { useEffect } from 'react';
import { CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { CheckCircle, ErrorOutline } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

import { useAccountActive } from '@service';
import EmptyLayout from '@layouts/EmptyLayout';
import { CenteredFlexBox } from '@components/styled';

const AccountActivation = () => {
	const { uid, token } = useParams();
	const { mutate: activate, isLoading, isError } = useAccountActive();

	useEffect(() => {
		if (uid && token) {
			activate({ uid, token });
		}
	}, [uid, token]);

	const renderMessage = () => {
		if (isError) {
			return (
				<Stack gap={1} justifyContent="center" alignItems="center">
					<ErrorOutline color="error" fontSize="large" />
					<Typography mt={2}>Ops! Something went wrong!</Typography>
					<Typography>Please contact us for further support</Typography>
				</Stack>
			);
		}
		return (
			<Stack gap={1} justifyContent="center" alignItems="center">
				<CheckCircle color="success" fontSize="large" />
				<Typography mt={2}>Account activation success!</Typography>
			</Stack>
		);
	};

	return (
		<EmptyLayout>
			<Paper sx={{ minWidth: 450, minHeight: 450 }} component={CenteredFlexBox}>
				{isLoading ? <CircularProgress color="primary" /> : renderMessage()}
			</Paper>
		</EmptyLayout>
	);
};
export default AccountActivation;
