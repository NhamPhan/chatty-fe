import {
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Stack,
} from '@mui/material';
import {
	DatePickerElement,
	FormContainer,
	SelectElement,
	TextFieldElement,
	useForm,
} from 'react-hook-form-mui';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useUpdateProfile } from '@service';
import useAuth from '@store/auth';
import useNotification from '@store/notification';
import { GENDER } from '@utils/constants.js';
import moment from 'moment';

const schema = yup.object().shape({
	firstName: yup.string().required('Forgot something here!'),
	lastName: yup.string().required('Could you fill in this field?'),
	dob: yup.date().required('When is your birthday?'),
	gender: yup.object().shape({
		label: yup.string(),
		id: yup.string(),
	}),
});

export const UpdateProfileModal = ({ open, onClose }) => {
	const [auth] = useAuth();
	const [, actions] = useNotification();

	const formContext = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			dob: new Date(),
			gender: GENDER[0],
		},
		resolver: yupResolver(schema),
	});

	const { mutateAsync } = useUpdateProfile({ id: auth.id });

	const handleSubmit = ({ gender, dob, ...rest }) => {
		const mappedValue = {
			...rest,
			dob: moment(dob).format('YYYY-MM-DD'),
			gender: gender.id,
		};
		mutateAsync(mappedValue, {
			onSuccess: ({ data }) => {
				actions.push({
					message: data?.result || 'Updated',
					options: { variant: 'success' },
				});
				onClose?.();
			},
			onError: ({ response }) => {
				actions.push({
					message: response?.data?.result || 'Failed',
					options: { variant: 'error' },
				});
			},
		});
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Welcome aboard!</DialogTitle>
			<DialogContent>
				<LocalizationProvider dateAdapter={AdapterMoment}>
					<DialogContentText>What should we call you?</DialogContentText>
					<FormContainer formContext={formContext} onSuccess={handleSubmit}>
						<Stack gap={2} py={2}>
							<TextFieldElement
								name="firstName"
								label="First Name"
								fullWidth
								required
								variant="outlined"
							/>
							<TextFieldElement
								name="lastName"
								label="Last Name"
								fullWidth
								required
								variant="outlined"
							/>
							<DatePickerElement name="dob" label="Date of birth" />
							<SelectElement
								name="gender"
								label="Gender"
								variant="outlined"
								fullWidth
								options={GENDER}
							/>
							<LoadingButton
								loading={false}
								variant="contained"
								color="primary"
								type="submit">
								Submit
							</LoadingButton>
						</Stack>
					</FormContainer>
				</LocalizationProvider>
			</DialogContent>
		</Dialog>
	);
};
