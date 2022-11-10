import { Button, Stack, Typography } from '@mui/material';
import { FullSizeCenteredFlexBox } from '@components/styled';
import { giphyEmptyChat } from '@configs';
import useModal from '@store/modal';
import { ADD_CHAT } from '@utils/constants';

export const CreateConversation = ({ onCreateClick }) => {
	const [, action] = useModal();

	const handleCreateClick = (e) => {
		action.setState(ADD_CHAT, true);
		onCreateClick?.(e);
	};
	return (
		<FullSizeCenteredFlexBox>
			<Stack gap={2} alignItems="stretch" justifyContent="center">
				<Typography textAlign="center" variant="h5" fontSize="large">
					Not any conversation as been created or selected
				</Typography>
				<FullSizeCenteredFlexBox>
					<iframe
						title="empty-chat-box"
						src={giphyEmptyChat}
						width="200"
						height="200"
						frameBorder="0"
						className="giphy-embed"
						allowFullScreen
					/>
				</FullSizeCenteredFlexBox>
				<Button color="primary" onClick={handleCreateClick} variant="outlined">
					Create new Chat
				</Button>
			</Stack>
		</FullSizeCenteredFlexBox>
	);
};
