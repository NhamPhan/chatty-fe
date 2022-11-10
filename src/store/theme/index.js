import { atom, useRecoilState } from 'recoil';

const themeModeState = atom({
	key: 'theme-mode-state',
	default: 'light',
	effects: [synchronizeWithLocalStorage],
});

function synchronizeWithLocalStorage({ setSelf, onSet }) {
	const storedTheme = localStorage.getItem('theme-mode');
	if (storedTheme) setSelf(storedTheme);
	onSet((value) => localStorage.setItem('theme-mode', value));
}

function useTheme() {
	const [themeMode, setThemeMode] = useRecoilState(themeModeState);

	function toggle() {
		setThemeMode((mode) => (mode === 'dark' ? 'light' : 'dark'));
	}

	return [themeMode, { toggle }];
}

export default useTheme;
