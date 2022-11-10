import React, { useState } from 'react';
import { CenteredFlexBox } from '@components/styled';
import { Paper, Stack, styled, Typography } from '@mui/material';
import { AppRegistration, CheckCircle } from '@mui/icons-material';
import {
	FormContainer,
	PasswordElement,
	TextFieldElement,
	useForm,
} from 'react-hook-form-mui';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { REGEX_PASSWORD } from '@utils/constants';
import Link from '@components/Link';
import Logo from '@components/Logo';
import EmptyLayout from '@layouts/EmptyLayout';
import { LoadingButton } from '@mui/lab';
import useNotifications from '@store/notification';
import useInterval from '@hooks/useInterval';
import { useRegister, useReSent } from '@service';

const Container = styled(Paper)({
	width: 400,
	minHeight: '80%',
	flexDirection: 'column',
});

const Box = styled(CenteredFlexBox)({
	paddingY: 2,
	flexDirection: 'row',
	gap: 1,
});

const schema = yup.object().shape({
	username: yup.string().required("You can't login with out a username"),
	password: yup
		.string()
		.required('Hey! Forgot something here!')
		.matches(REGEX_PASSWORD, 'You may need a stronger password'),
	email: yup
		.string()
		.email('You sure this is an email?')
		.required('We need your email for account activation'),
});

const Register = () => {
	const formContext = useForm({
		defaultValues: {
			username: '',
			password: '',
			email: '',
		},
		resolver: yupResolver(schema),
	});
	const { getValues } = formContext;

	const [, { push }] = useNotifications();
	const { mutateAsync: register, isLoading } = useRegister();
	const { mutateAsync: reSendActivation } = useReSent();

	const [isSuccess, setIsSuccess] = useState(false);
	const [timer, setTime] = useState(0);

	useInterval(
		() => {
			if (timer > 0) {
				setTime((prevState) => prevState - 1);
			}
		},
		timer > 0 ? 1000 : null,
	);

	const handleSubmit = async (data) => {
		const response = await register(data);
		if (response?.status === 201) {
			push({ message: 'Register success!', options: { variant: 'success' } });
			setIsSuccess(true);
		}
		setTime(30);
	};

	const handleResend = async () => {
		const email = getValues('email');
		const response = await reSendActivation({ email });
		if (response?.status === 204) {
			push({ message: 'Email sent!', options: { variant: 'success' } });
		}
		setTime(30);
	};

	return (
		<EmptyLayout>
			<Stack component={Container} display={isSuccess ? 'none' : 'block'}>
				<Box sx={{ marginTop: 2, gap: 1 }}>
					<AppRegistration color="primary" />
					<Typography variant="overline" fontSize="medium">
						Register
					</Typography>
				</Box>
				<CenteredFlexBox>
					<Logo style={{ width: 80, height: 80 }} />
				</CenteredFlexBox>
				<FormContainer formContext={formContext} onSuccess={handleSubmit}>
					<Box sx={{ flexDirection: 'column', marginX: 2 }}>
						<TextFieldElement
							required
							variant="outlined"
							name="username"
							label="Username"
							margin="normal"
							fullWidth
						/>
						<TextFieldElement
							required
							variant="outlined"
							name="email"
							label="Email"
							margin="normal"
							fullWidth
						/>
						<PasswordElement
							required
							variant="outlined"
							name="password"
							label="Password"
							margin="normal"
							fullWidth
						/>
					</Box>
					<Box sx={{ marginY: 1, gap: 1, flexDirection: 'column' }}>
						<Link
							to="/login"
							sx={{ width: '100%', marginRight: 3 }}
							textAlign="right">
							Already had an account?
						</Link>
						<LoadingButton
							loading={isLoading}
							type="submit"
							variant="contained">
							Register
						</LoadingButton>
					</Box>
				</FormContainer>
			</Stack>
			<Stack
				component={Container}
				display={isSuccess ? 'flex' : 'none'}
				spacing={3}
				justifyContent="center">
				<CenteredFlexBox>
					<CheckCircle color="success" fontSize="large" />
				</CenteredFlexBox>
				<CenteredFlexBox sx={{ flexDirection: 'column' }}>
					<Typography>Activation email sent!</Typography>
					<Typography>Please check your inbox or spam.</Typography>
				</CenteredFlexBox>
				<Box sx={{ flexDirection: 'column', gap: 2 }}>
					<Typography>Did not received your email?</Typography>
					<LoadingButton
						variant="contained"
						loading={timer > 0}
						onClick={handleResend}>
						<Box>
							<Typography>{timer > 0 ? timer : ''}</Typography>
							<Typography>Resend</Typography>
						</Box>
					</LoadingButton>
				</Box>
			</Stack>
		</EmptyLayout>
	);
};

export default Register;
