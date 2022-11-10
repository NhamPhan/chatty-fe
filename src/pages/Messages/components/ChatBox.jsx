import { useEffect, useRef, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { FullSizeCenteredFlexBox } from '@components/styled';
import { SpeakerNotesOffOutlined } from '@mui/icons-material';
import { MessageInput } from './MessageInput';
import { Message } from './Message';

export const ChatBox = ({
	onTyping,
	onSend,
	detail,
	messages = [],
	typing = [],
	online = [],
	typingTimeout = 2000,
}) => {
	const inputRef = useRef(null);
	const bottomRef = useRef(null);

	const [message, setMessage] = useState('');
	const [inputHeight, setInputHeight] = useState(0);
	const [isTyping, setTyping] = useState(false);

	const showSender = (item, index, array) => {
		if (index === 0) {
			if (array.length === 1) return true;
			if (array[index + 1].createdBy !== item.createdBy) return true;
		}
		if (index === array.length - 1) return true;
		return item?.createdBy !== array[index + 1]?.createdBy;
	};

	const handleMessageChange = (value) => {
		setMessage(value);
		setTyping(true);
	};

	useEffect(() => {
		setInputHeight(inputRef.current?.clientHeight);
	}, []);

	useEffect(() => {
		bottomRef.current?.scrollIntoView();
	}, []);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			setTyping(false);
		}, typingTimeout);

		return () => clearTimeout(delayDebounceFn);
	}, [message, typingTimeout]);

	useEffect(() => {
		onTyping?.(isTyping);
	}, [onTyping, isTyping]);

	return (
		<>
			<Box
				aria-label="message-box"
				flexGrow={1}
				width="100%"
				sx={{
					height: `calc(100% - ${inputHeight}px)`,
					mr: 10,
				}}>
				<Stack gap={2} display={messages.length > 0 ? 'initial' : 'none'}>
					{[...messages].reverse().map((item, index, array) => {
						return (
							<Message
								key={item?.id}
								showSender={showSender(item, index, array)}
								chatDetail={detail}
								{...(index === array.length - 1 ? { ref: bottomRef } : null)}
								{...item}
							/>
						);
					})}
				</Stack>
				<FullSizeCenteredFlexBox
					sx={{
						flexDirection: 'column',
						gap: 2,
						display: messages.length === 0 ? 'flex' : 'none',
					}}>
					<Typography color="text.disabled">
						No message has been sent.
					</Typography>
					<SpeakerNotesOffOutlined color="text.disabled" />
				</FullSizeCenteredFlexBox>
			</Box>
			<MessageInput
				ref={inputRef}
				onChange={handleMessageChange}
				value={message}
				onSend={onSend}
			/>
		</>
	);
};
