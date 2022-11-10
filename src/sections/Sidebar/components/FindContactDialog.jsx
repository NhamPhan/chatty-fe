import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	Avatar,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material';
import DataTable from 'material-react-table';
import { useSearchUsers } from '@service';
import useDebounce from '@hooks/useDebounce';
import { CenteredFlexBox } from '@components/styled';
import { FriendRequestButton } from './FriendRequestButton';
import useAuth from '@store/auth/index.js';

const getColumns = ({ refetch }) => [
	{
		Cell: ({ row }) => {
			const obj = row?.original;
			return <Avatar alt={obj?.username} src={obj?.avatar} />;
		},
		header: '#',
		maxSize: 80,
	},
	{
		Cell: ({ row }) => {
			const obj = row?.original;
			const displayName = `${obj?.firstName} ${obj?.lastName}`.trim();

			return (
				<CenteredFlexBox
					sx={{
						flexDirection: 'column',
						alignItems: 'flex-start',
					}}>
					<Typography>
						{displayName.length > 0 ? displayName : 'N/A'}
					</Typography>
					<Typography color="text.disabled">{`@${obj?.username}`}</Typography>
				</CenteredFlexBox>
			);
		},
		header: 'Name',
	},
	{
		Cell: ({ row }) => {
			const obj = row?.original;
			return <FriendRequestButton user={obj} refetch={refetch} />;
		},
		header: 'Action',
		maxSize: 150,
	},
];

export const FindContactDialog = ({ open, onClose, ...rest }) => {
	const tableContainerRef = useRef(null);
	const virtualizerInstanceRef = useRef(null);

	const [keyword, setKeyword] = useState('');

	const [auth] = useAuth();

	const debouncedKeyword = useDebounce(keyword, 300);

	const onInputChange = (event) => setKeyword(event.target.value);

	const {
		data,
		fetchNextPage,
		isFetching,
		hasNextPage,
		isError,
		isLoading,
		refetch,
	} = useSearchUsers({
		keyword:
			debouncedKeyword?.trim()?.length > 0 ? debouncedKeyword.trim() : null,
		cacheTime: 1,
	});

	const flatData = useMemo(
		() =>
			data?.pages
				.flatMap((page) => page.data?.results)
				.filter((item) => item.id !== auth.id) ?? [],
		[auth.id, data?.pages],
	);

	const fetchMoreOnBottomReached = useCallback(
		(containerRefElement) => {
			if (containerRefElement) {
				const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
				const currentHeight = scrollHeight - scrollTop - clientHeight;
				const canFetch = currentHeight < 200 && !isFetching && hasNextPage;
				if (canFetch) {
					fetchNextPage();
				}
			}
		},
		[fetchNextPage, isFetching, hasNextPage],
	);

	useEffect(() => {
		if (virtualizerInstanceRef.current) {
			virtualizerInstanceRef.current.scrollToIndex(0);
		}
	}, []);

	useEffect(() => {
		fetchMoreOnBottomReached(tableContainerRef.current);
	}, [fetchMoreOnBottomReached]);

	const columns = useMemo(() => getColumns({ refetch }), []);

	return (
		<Dialog open={open} onClose={onClose} {...rest}>
			<DialogTitle>Find your mates</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Search"
					type="email"
					fullWidth
					variant="outlined"
					placeholder="Username or email address"
					onChange={onInputChange}
					value={keyword}
				/>
				<DataTable
					columns={columns}
					data={flatData}
					enableColumnActions={false}
					enableColumnFilters={false}
					enablePagination={false}
					enableSorting={false}
					enableBottomToolbar={false}
					enableTopToolbar={false}
					enableRowVirtualization
					muiTableContainerProps={{
						ref: tableContainerRef,
						onScroll: (event) => fetchMoreOnBottomReached(event.target),
					}}
					renderBottomToolbarCustomActions={() => (
						<Typography textAlign="center" width="100%">
							No one left to find T.T
						</Typography>
					)}
					state={{
						isLoading: isLoading && keyword?.length > 0,
						showAlertBanner: isError,
						showProgressBars: isFetching && keyword?.length > 0,
					}}
					virtualizerInstanceRef={virtualizerInstanceRef}
				/>
			</DialogContent>
		</Dialog>
	);
};
