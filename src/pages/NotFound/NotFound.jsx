import React from 'react';
import { Container, Divider, Typography } from '@mui/material';
import { CenteredFlexBox, FullSizeCenteredFlexBox } from '@components/styled';
import { giphy404, messages } from '@configs';
import Meta from '@components/Meta';

const NotFound = () => {
	return (
		<>
			<Meta title="Not Found - 404" />
			<Container sx={{ height: '100%' }}>
				<FullSizeCenteredFlexBox flexDirection="column">
					<iframe
						title="not-found-gif"
						src={giphy404}
						width="100%"
						height="50%"
						style={{ maxHeight: '60%', maxWidth: '100%' }}
						frameBorder="0"
						allowFullScreen
					/>
					<CenteredFlexBox flexDirection="column">
						<Typography sx={{ mt: 2 }} variant="h4" color="error">
							404 Not Found
						</Typography>
						<Divider variant="middle" />
						<Typography
							variant="h4"
							sx={{ color: (theme) => theme.palette.info.main }}>
							{messages[404]}
						</Typography>
					</CenteredFlexBox>
				</FullSizeCenteredFlexBox>
			</Container>
		</>
	);
};

export default NotFound;
