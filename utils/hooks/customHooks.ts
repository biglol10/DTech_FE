import { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { IModalState, IAppCommon } from '@utils/types/commAndStoreTypes';
import lodash from 'lodash';

const useModal = () => {
	const modalState = useSelector((state: any) => state.modal);
	const dispatch = useDispatch();

	const handleModal = useCallback(
		(args: IModalState) => {
			// ...{args} 는 안 먹힘
			dispatch({
				type: 'MODALCONTROL',
				...{
					modalOpen: args.modalOpen,
					modalContent: args.modalContent,
					modalSize: args.modalSize,
					modalTitle: args.modalTitle,
					modalIsBasic: args.modalIsBasic,
				},
			});
		},
		[dispatch],
	);

	return {
		modalState,
		handleModal,
	};
};

const useSocket = () => {
	const socket = useRef<Socket>();

	const dispatch = useDispatch();

	const authStore = useSelector((state: any) => state.auth);

	const init = (userId: string) => {
		if (!userId) return;
		if (!socket.current) {
			socket.current = io('http://localhost:3066');
		}

		if (socket.current) {
			socket.current.connect();
			socket.current.emit('connectUser', { userId });
			dispatch({
				type: 'AUTH_USERSOCKET',
				socketRef: socket.current,
			});
		}
	};

	const disconnect = () => {
		const socketStore = authStore.userSocket;

		socketStore && socketStore.disconnect();

		dispatch({
			type: 'AUTH_USERSOCKET_RESET',
		});
	};

	return {
		init,
		disconnect,
	};
};

const useChatUtil = () => {
	const appCommon = useSelector((state: { appCommon: IAppCommon }) => state.appCommon);

	const dispatch = useDispatch();

	const init = (unReadMsg: string[]) => {
		dispatch({
			type: 'SET_CURRENT_UNREAD_MSG',
			unReadMsg: lodash.isEmpty(unReadMsg) ? [] : unReadMsg,
		});
	};

	const unReadArrSlice = (uID: string) => {
		const unReadMsg = lodash.cloneDeep(appCommon.unReadMsg);

		const indexOf = unReadMsg.indexOf(uID);

		indexOf > -1 && unReadMsg.splice(indexOf, 1);

		dispatch({ type: 'SET_CURRENT_UNREAD_MSG', unReadMsg });
	};

	const unReadArrAdd = (uID: string) => {
		const unReadMsg = lodash.cloneDeep(appCommon.unReadMsg);

		unReadMsg.push(uID);
		dispatch({ type: 'SET_CURRENT_UNREAD_MSG', unReadMsg });
	};

	return {
		init,
		unReadArrSlice,
		unReadArrAdd,
	};
};

export { useModal, useSocket, useChatUtil };
