import React from 'react';
import InputEmoji from 'react-input-emoji';
import { Paper, IconButton } from '@mui/material';
import { SendOutlined } from '@mui/icons-material';
import { DRAWER_WIDTH } from '@utils/constants.js';

export const MessageInput = React.forwardRef(
	({ value, onChange, onSend }, ref) => {
		const handleOnSend = (event) => {
			if (value) onSend?.(event);
		};

		return (
			<Paper
				elevation={18}
				square
				ref={ref}
				sx={{
					height: 'auto',
					padding: 1,
					display: 'flex',
					flexDirection: 'row',
					position: 'fixed',
					bottom: 0,
					width: {
						xs: `calc(100% - ${DRAWER_WIDTH.xs}px)`,
						lg: `calc(100% - ${DRAWER_WIDTH.lg}px)`,
					},
				}}>
				<InputEmoji
					value={value || ''}
					onChange={onChange}
					cleanOnEnter
					onEnter={handleOnSend}
					placeholder="Type a message"
					keepOpened
					disableRecent
					maxLength={1200}
					borderRadius={5}
				/>
				<IconButton onClick={() => handleOnSend(value)}>
					<SendOutlined />
				</IconButton>
			</Paper>
		);
	},
);
