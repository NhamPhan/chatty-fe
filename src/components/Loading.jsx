import CircularProgress from '@mui/material/CircularProgress';

import { FullSizeCenteredFlexBox } from './styled';
import EmptyLayout from '@layouts/EmptyLayout';

function Loading() {
	return (
		<EmptyLayout>
			<FullSizeCenteredFlexBox>
				<CircularProgress />
			</FullSizeCenteredFlexBox>
		</EmptyLayout>
	);
}

export default Loading;
