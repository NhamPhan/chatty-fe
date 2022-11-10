import useAuth from '.';
import { useGetToken } from '@service';
import { handleError } from '../../error-handling';

function useAuthActions() {
	const [auth, { setAuth }] = useAuth();

	const { mutateAsync: getToken, isLoading: gettingToken } = useGetToken({
		onError: handleError,
	});

	const login = async (username, password) => {
		const { data: tokens, status } = await getToken({ username, password });
		await setAuth({
			...auth,
			refreshToken: tokens?.refresh,
		});
		await localStorage.setItem('token', tokens?.access);
		return status < 300;
	};

	const logout = () => {
		setAuth({});
		localStorage.removeItem('token');
	};
	return {
		login,
		logout,
		isLoading: gettingToken,
	};
}

export default useAuthActions;
