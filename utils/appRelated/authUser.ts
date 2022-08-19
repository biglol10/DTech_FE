/** ****************************************************************************************
 * @설명 : Auth 관련 util
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-08-17   feature/JW/socket          최초작성 (socket 연결 관련 훅 작성)
 ********************************************************************************************/

import { useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

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

export { useSocket };
