import React from 'react';
import { Avatar, Box, Paper, Tooltip, Typography } from '@mui/material';
import { FlexBox } from '@components/styled';
import moment from 'moment';
import { getMember, getUserDisplayName, stringAvatar } from '@utils/chats';
import useAuth from '@store/auth/index.js';

export const Message = React.forwardRef(
	(
		{ content, createdBy, createdAt, seenBy, chatDetail, showSender = true },
		ref,
	) => {
		const [auth] = useAuth();

		const member = getMember(chatDetail, createdBy);
		const displayName = getUserDisplayName(member?.user) || '  ';
		const isSender = createdBy === auth.id;
		const formattedDate = moment(createdAt).format('lll');
		return (
			<Tooltip title={showSender ? undefined : formattedDate}>
				<FlexBox
					ref={ref}
					sx={{
						justifyContent: isSender ? 'flex-end' : 'flex-start',
						alignItems: 'stretch',
						position: 'relative',
						my: 1,
						...(isSender ? { mr: 2 } : { ml: 2 }),
					}}>
					<FlexBox
						sx={{
							alignItems: 'flex-end',
							mr: 1,
							...(isSender && { display: 'none' }),
						}}>
						{showSender ? (
							<Avatar
								alt={displayName}
								sx={{
									width: 30,
									height: 30,
								}}
								{...stringAvatar(displayName)}>
								{displayName?.charAt(0)}
							</Avatar>
						) : null}
						<Box
							display={showSender ? 'none' : 'block'}
							width={40}
							height={40}
						/>
					</FlexBox>
					<Paper
						elevation={24}
						sx={{
							px: 2,
							py: 1,
							minWidth: 100,
							maxWidth: {
								xs: '80%',
								lg: '60%',
							},
						}}>
						<Typography
							sx={{ wordWrap: 'break-word' }}
							textAlign={isSender ? 'right' : 'left'}>
							{content}
						</Typography>
					</Paper>
					<FlexBox
						sx={{
							px: 2,
							py: 1,
							position: 'absolute',
							bottom: '-2rem',
							width: '100%',
							display: showSender ? 'flex' : 'none',
							justifyContent: isSender ? 'flex-start' : 'flex-end',
							...(isSender ? { right: 0 } : { left: 40 }),
						}}>
						<Typography
							textAlign={isSender ? 'right' : 'left'}
							fontSize="small"
							width="100%"
							color="text.disabled">
							{formattedDate}
						</Typography>
					</FlexBox>
				</FlexBox>
			</Tooltip>
		);
	},
);
