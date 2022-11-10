import { messages } from '../../configs/index.js';
import { Box, Typography } from '@mui/material';

function LoaderErrorBoundaryFallback() {
	return (
		<Box>
			<Typography variant="h5">{messages.loader.fail}</Typography>
		</Box>
	);
}

export default LoaderErrorBoundaryFallback;
