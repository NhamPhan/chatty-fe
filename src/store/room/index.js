import { atom, useRecoilState } from 'recoil';
import { useEffect, useMemo } from 'react';
import useWebSocket from 'react-use-websocket';
import { useGetChat, useGetMessages } from '@service';

const chatState = atom({
	key: 'chat-state',
	default: {
		messages: [],
		online: [],
		typing: [],
		detail: {},
		isLoading: false,
	},
});

const token = localStorage.getItem('token');
export const useChatSubscription = ({ id }) => {
	const [chat, setChat] = useRecoilState(chatState);
	const { data: detail, isLoading: gettingDetail } = useGetChat({ id });
	const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
		useGetMessages({
			threadId: id,
		});

	const messages = useMemo(
		() => data?.pages.flatMap((page) => page?.results || []),
		[data],
	);

	useEffect(() => {
		setChat((currVal) => ({ ...currVal, messages }));
	}, [messages]);

	useEffect(() => {
		setChat((currVal) => ({ ...currVal, detail }));
	}, [detail]);

	useEffect(() => {
		setChat((currVal) => ({
			...currVal,
			isLoading: gettingDetail || isLoading,
		}));
	}, [isLoading, gettingDetail]);

	const url = useMemo(
		() => `ws://localhost:8000/chat/${id}?token=${token}`,
		[id],
	);
	const webSocket = useWebSocket(
		url,
		{
			reconnectInterval: 10,
			reconnectAttempts: 3,
		},
		!!token && !!id,
	);

	const onFetchMore = () => {
		if (hasNextPage) {
			fetchNextPage();
		}
	};

	useEffect(() => {
		if (id && token) {
			console.log('Connected');
			webSocket.sendJsonMessage({
				action: 'subscribe_to_chat',
				request_id: new Date().toDateString(),
				chat_id: id,
			});
			webSocket.sendJsonMessage({
				action: 'join',
				request_id: new Date().toDateString(),
				chat_id: id,
			});
		}
	}, [id, webSocket?.readyState]);

	return [chat, { setChat, onFetchMore, isFetching, ...webSocket }];
};
