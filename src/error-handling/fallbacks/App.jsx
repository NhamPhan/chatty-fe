import { Email, RestartAlt } from '@mui/icons-material';
import { email, messages } from '@configs';
import { Button, Paper, Typography } from '@mui/material';
import resetApp from '../../utils/reset-app';
import { FullSizeCenteredFlexBox } from '../../components/styled';
import EmptyLayout from '@layouts/EmptyLayout';

function AppErrorBoundaryFallback() {
	return (
		<EmptyLayout height={400}>
			<FullSizeCenteredFlexBox>
				<Paper sx={{ p: 5 }}>
					<Typography variant="h5" component="h3">
						{messages.app.crash.title}
					</Typography>
					<Button
						startIcon={<Email />}
						variant="outlined"
						target="_blank"
						rel="noreferrer"
						href={`mailto: ${email}`}
						sx={{ my: 3 }}>
						{messages.app.crash.options.email}
					</Button>
					<Typography component="h6">or</Typography>
					<Button
						startIcon={<RestartAlt />}
						sx={{ mt: 3 }}
						variant="outlined"
						onClick={resetApp}>
						{messages.app.crash.options.reset}
					</Button>
				</Paper>
			</FullSizeCenteredFlexBox>
		</EmptyLayout>
	);
}

export default AppErrorBoundaryFallback;
