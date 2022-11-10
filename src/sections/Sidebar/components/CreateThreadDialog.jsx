import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	Avatar,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material';
import MaterialReactTable from 'material-react-table';
import { useSearchUsers } from '@service';
import useDebounce from '@hooks/useDebounce';
import { CenteredFlexBox } from '@components/styled';
import { LoadingButton } from '@mui/lab';

const getColumns = ({ onCheck, members = [] }) => [
	{
		Cell: ({ row }) => {
			const obj = row?.original;
			return <Avatar alt={obj?.username} src={obj?.avatar} />;
		},
		header: '#',
		maxSize: 50,
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
			return (
				<Checkbox
					onChange={(event) => onCheck(event, obj)}
					checked={members?.includes(obj?.id)}
				/>
			);
		},
		header: 'Add',
		maxSize: 50,
	},
];

export const CreateThreadDialog = ({ open, onClose, onCreate, isLoading }) => {
	const tableContainerRef = useRef(null);
	const virtualizerInstanceRef = useRef(null);

	const [members, setMembers] = useState([]);
	const [threadName, setThreadName] = useState('');
	const [keyword, setKeyword] = useState('');
	const debouncedKeyword = useDebounce(keyword, 300);
	const {
		data,
		isFetching,
		isLoading: gettingData,
		fetchNextPage,
		hasNextPage,
		isError,
	} = useSearchUsers({
		keyword: debouncedKeyword,
		isFriend: true,
	});

	const handleClose = () => (onClose ? onClose() : undefined);

	const flatData = useMemo(
		() => data?.pages.flatMap((page) => page.data?.results) ?? [],
		[data],
	);

	const onCheck = useCallback(
		(event, value) => {
			const memberId = value?.id;
			const check = event.target.checked;
			const isIncluded = members?.includes(memberId);
			if (check && !isIncluded) {
				return setMembers((prevState) => [...prevState, memberId]);
			}
			if (isIncluded) {
				return setMembers(members?.filter((item) => memberId !== item) || []);
			}
		},
		[members],
	);

	const columns = useMemo(
		() => getColumns({ onCheck, members }),
		[onCheck, members],
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

	function handleCreate() {
		if (onCreate) {
			onCreate({
				memberIds: members,
				name: threadName?.length > 0 ? threadName : null,
			});
			handleClose();
		}
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Create new Chat</DialogTitle>
			<DialogContent>
				<TextField
					onChange={(e) => setThreadName(e.target.value)}
					value={threadName}
					variant="outlined"
					placeholder="Chat name"
					size="small"
					margin="dense"
				/>

				<MaterialReactTable
					columns={columns}
					data={flatData}
					enableColumnActions={false}
					enableColumnFilters={false}
					enablePagination={false}
					enableSorting={false}
					enableBottomToolbar={false}
					enableRowVirtualization
					muiSearchTextFieldProps={{
						placeholder: 'Enter a name',
						sx: { minWidth: '300px' },
						variant: 'outlined',
						onChange: (event) => setKeyword(event.target.value),
						value: keyword,
					}}
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
						isLoading: gettingData && keyword?.length > 0,
						showAlertBanner: isError,
						showProgressBars: isFetching && keyword?.length > 0,
					}}
					virtualizerInstanceRef={virtualizerInstanceRef}
				/>
			</DialogContent>
			<DialogActions>
				<Button disabled={isLoading} onClick={handleClose}>
					Cancel
				</Button>
				<LoadingButton loading={isLoading} onClick={handleCreate}>
					Create Chat
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};
