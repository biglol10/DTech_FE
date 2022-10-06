import { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { IModalState, IAppCommon } from '@utils/types/commAndStoreTypes';
import * as RCONST from '@utils/constants/reducerConstants';
import lodash from 'lodash';

const useModal = () => {
	const modalState = useSelector((state: any) => state.modal);
	const dispatch = useDispatch();

	const handleModal = useCallback(
		(args: IModalState) => {
			// ...{args} 는 안 먹힘
			dispatch({
				type: RCONST.MODALCONTROL,
				...{
					modalOpen: args.modalOpen,
					modalContent: args.modalContent,
					modalSize: args.modalSize,
					modalTitle: args.modalTitle,
					modalIsBasic: args.modalIsBasic,
					modalFitContentWidth: args.modalFitContentWidth,
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
			socket.current = io(`${process.env.NEXT_PUBLIC_BE_BASE_URL}`);
		}

		if (socket.current) {
			socket.current.connect();
			socket.current.emit('connectUser', { userId });
			dispatch({
				type: RCONST.AUTH_USERSOCKET,
				socketRef: socket.current,
			});
		}
	};

	const disconnect = () => {
		const socketStore = authStore.userSocket;

		socketStore && socketStore.disconnect();

		dispatch({
			type: RCONST.AUTH_USERSOCKET_RESET,
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
			type: RCONST.SET_CURRENT_UNREAD_MSG,
			unReadMsg: lodash.isEmpty(unReadMsg) ? [] : unReadMsg,
		});
	};

	const unReadArrSlice = (uID: string) => {
		if (!uID) return;

		const unReadMsg = lodash.cloneDeep(appCommon.unReadMsg);
		const indexOf = unReadMsg.indexOf(uID);

		if (indexOf === -1) return;

		unReadMsg.splice(indexOf, 1);

		dispatch({ type: RCONST.SET_CURRENT_UNREAD_MSG, unReadMsg });
	};

	const unReadArrAdd = (uID: string) => {
		if (!uID) return;

		const unReadMsg = lodash.cloneDeep(appCommon.unReadMsg);
		const indexOf = unReadMsg.indexOf(uID);

		if (indexOf > -1) return;

		unReadMsg.push(uID);

		dispatch({ type: RCONST.SET_CURRENT_UNREAD_MSG, unReadMsg });
	};

	return {
		init,
		unReadArrSlice,
		unReadArrAdd,
	};
};

export { useModal, useSocket, useChatUtil };
