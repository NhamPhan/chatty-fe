import { atom, useRecoilState } from 'recoil';
import { useGetChats } from '@service';
import { useEffect, useMemo } from 'react';

const chatState = atom({
	key: 'chat-key',
	default: [],
});

function useChats(enabled = true) {
	const [chats, setChats] = useRecoilState(chatState);

	const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
		useGetChats({ enabled });

	const flatData = useMemo(() => {
		return data?.pages.flatMap((response) => response.data.results) || [];
	}, [data]);

	useEffect(() => {
		setChats(flatData);
	}, [flatData]);

	return {
		chats,
		fetchNextPage,
		isLoading,
		hasNextPage,
		isFetching,
		setChats,
	};
}

export default useChats;
