import { atom, useRecoilState } from 'recoil';

const modalState = atom({
	key: 'modal-state',
	default: {},
});

const useModal = () => {
	const [modal, setModal] = useRecoilState(modalState);

	const getState = (key) => {
		return modal?.[key] || false;
	};

	const setState = (key, value) => {
		setModal((currVal) => ({ ...currVal, [key]: value }));
	};
	return [modal, { getState, setState }];
};

export default useModal;
