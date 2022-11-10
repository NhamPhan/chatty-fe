import { atom, useRecoilState } from 'recoil';

const sidebarState = atom({
	key: 'sidebar-state',
	default: false,
	effects: [synchronizeWithLocalStorage],
});

function synchronizeWithLocalStorage({ setSelf, onSet }) {
	const storedSidebarState = localStorage.getItem('sidebar-state');
	if (storedSidebarState) setSelf(storedSidebarState);
	onSet((value) => localStorage.setItem('sidebar-state', value));
}

function useSidebar() {
	const [open, setOpen] = useRecoilState(sidebarState);

	function toggle() {
		setOpen((mode) => !mode);
	}

	return [open, { toggle }];
}

export default useSidebar;
