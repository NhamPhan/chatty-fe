import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CenteredFlexBox } from '@components/styled';
import { Paper, Stack, styled, Typography } from '@mui/material';
import { LoginOutlined } from '@mui/icons-material';
import {
	FormContainer,
	PasswordElement,
	TextFieldElement,
	useForm,
} from 'react-hook-form-mui';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Logo from '@components/Logo';
import Link from '@components/Link';
import useAuth from '@store/auth';
import EmptyLayout from '@layouts/EmptyLayout';
import useAuthActions from '@store/auth/actions';
import { LoadingButton } from '@mui/lab';
import useNotifications from '@store/notification';

const Container = styled(Paper)({
	minWidth: 350,
	width: '100%',
	height: '80%',
	minHeight: 600,
	padding: '0 10px',
});

const schema = yup.object().shape({
	username: yup.string().required('Username is missing here!'),
	password: yup.string().required('Forgot your password?'),
});

const Login = () => {
	const navigate = useNavigate();

	const [{ isAuthenticated }] = useAuth();
	const { login, isLoading } = useAuthActions();
	const [, actions] = useNotifications();

	const formContext = useForm({
		defaultValues: { username: '', password: '' },
		resolver: yupResolver(schema),
	});

	const handleSubmit = async (data) => {
		const result = await login(data.username, data.password);

		if (result) {
			const timeout = setTimeout(() => navigate('/'), 500);
			actions.push({
				message: 'Welcome back!',
				options: { variant: 'success' },
			});
			return () => clearTimeout(timeout);
		}
	};

	return isAuthenticated ? (
		<Navigate to="/" replace />
	) : (
		<EmptyLayout>
			<FormContainer formContext={formContext} onSuccess={handleSubmit}>
				<Stack direction="column" component={Container}>
					<CenteredFlexBox sx={{ paddingY: 2, flexDirection: 'row', gap: 1 }}>
						<LoginOutlined color="primary" />
						<Typography
							variant="overline"
							fontWeight="semibold"
							fontSize="medium">
							Login
						</Typography>
					</CenteredFlexBox>
					<CenteredFlexBox>
						<Logo style={{ width: 80, height: 80 }} />
					</CenteredFlexBox>
					<CenteredFlexBox
						sx={{ flexDirection: 'column', gap: 1, paddingY: 2 }}>
						<Typography width="100%" ml={3}>
							Welcome back!
						</Typography>
						<TextFieldElement
							name="username"
							label="Username or Email"
							required
							variant="outlined"
							margin="normal"
							fullWidth
						/>
						<PasswordElement
							name="password"
							label="Password"
							required
							variant="outlined"
							margin="normal"
							fullWidth
						/>
						<Link to="/register" width="100%" textAlign="right" mr={3}>
							Register?
						</Link>
					</CenteredFlexBox>
					<CenteredFlexBox
						sx={{
							flexDirection: 'column',
							gap: 1,
							paddingY: 2,
						}}>
						<LoadingButton
							loading={isLoading}
							type={'submit'}
							color={'primary'}
							variant={'contained'}>
							Submit
						</LoadingButton>
					</CenteredFlexBox>
				</Stack>
			</FormContainer>
		</EmptyLayout>
	);
};

export default Login;
