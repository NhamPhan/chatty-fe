const useBottomReach = ({ ref, onBottomReach }) => {
	const onScroll = () => {
		if (ref.current) {
			const { scrollTop, scrollHeight, clientHeight } = ref.current;
			if (scrollTop + clientHeight === scrollHeight) {
				onBottomReach?.();
			}
		}
	};
	return { onScroll };
};

export default useBottomReach;
