import { atom, useRecoilState } from 'recoil';
import { useEffect, useMemo } from 'react';

const key = 'auth-state';
const defaultValue = {
	refreshToken: '',
	username: '',
	avatar: '',
	firstName: '',
	lastName: '',
	id: '',
};
const syncWithLocalStorage = ({ setSelf, onSet }) => {
	const authState = localStorage.getItem(key);
	if (authState) setSelf(JSON.parse(authState) || {});
	onSet((value) => localStorage.setItem(key, JSON.stringify(value)));
};

const authState = atom({
	key: key,
	default: defaultValue,
	effects: [syncWithLocalStorage],
});

const getToken = () => localStorage.getItem('token');

function useAuth() {
	const [auth, setAuth] = useRecoilState(authState);
	const isAuthenticated = useMemo(() => {
		return !!auth?.refreshToken && !!getToken();
	}, [auth?.refreshToken]);

	useEffect(() => {
		const listener = (event) => {
			if (event.key === key && event.oldValue !== event.newValue) {
				setAuth(JSON.parse(event.newValue));
			}
		};
		window.addEventListener('storage', listener);
		return () => window.removeEventListener('storage', listener);
	}, []);

	return [auth, { key, setAuth, isAuthenticated }];
}

export default useAuth;
