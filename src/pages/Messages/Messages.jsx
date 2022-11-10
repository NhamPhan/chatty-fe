import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '@layouts/MainLayout';
import { ChatBox } from './components/ChatBox';
import { CreateConversation } from './components/CreateConversation';
import { FullSizeCenteredFlexBox } from '@components/styled';
import { useChatSubscription } from '@store/room';
import { keysToCamel } from '@utils/chats.js';

const Messages = () => {
	const typing = useRef(false);

	const { id } = useParams();

	const [chat, { lastMessage, sendJsonMessage, setChat }] = useChatSubscription(
		{
			id,
		},
	);
	const handleOnTyping = (value) => {
		if (value !== typing.current) {
			typing.current = value;
			sendJsonMessage({
				request_id: new Date().toDateString(),
				action: 'typing_action',
				start: value,
			});
		}
	};

	const handleSendMessage = (value) => {
		console.log(value);
		sendJsonMessage({
			request_id: new Date().toDateString(),
			action: 'send_message',
			message: value,
		});
	};

	useEffect(() => {
		const message = lastMessage?.data ? JSON.parse(lastMessage?.data) : {};
		switch (message?.type) {
			case 'update_typing':
				setChat((currVal) => ({ ...currVal, typing: message?.typing || [] }));
				break;
			case 'update_users':
				setChat((currVal) => ({ ...currVal, online: message?.online || [] }));
				break;
			case 'message_activity':
				setChat((currVal) => ({
					...currVal,
					messages: [keysToCamel(message.data), ...currVal.messages],
				}));
				break;
			default:
				console.log(message);
		}
	}, [lastMessage]);

	return (
		<MainLayout sx={{ alignItems: 'flex-start', flexDirection: 'column' }}>
			<FullSizeCenteredFlexBox sx={{ display: id ? 'inherit' : 'none' }}>
				<ChatBox
					onTyping={handleOnTyping}
					onSend={handleSendMessage}
					detail={chat?.detail}
					messages={chat?.messages || []}
					typingTimeout={2000}
					online={chat?.online || []}
					typing={chat?.typing || []}
				/>
			</FullSizeCenteredFlexBox>
			<FullSizeCenteredFlexBox sx={{ display: !id ? 'inherit' : 'none' }}>
				<CreateConversation />
			</FullSizeCenteredFlexBox>
		</MainLayout>
	);
};

export default Messages;
