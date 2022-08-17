/** ****************************************************************************************
 * @설명 : Auth 관련 util
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-08-17   feature/JW/socket          최초작성 (socket 초기화 훅 작성)
 ********************************************************************************************/

import { useRef } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';

const useSocket = () => {
	const socket = useRef<any>();

	const dispatch = useDispatch();

	const init = (userId: string) => {
		if (!userId) return;
		if (!socket.current) {
			socket.current = io('http://localhost:3066');
		}

		if (socket.current) {
			dispatch({
				type: 'AUTH_USERSOCKET',
				socketRef: socket.current,
			});
			socket.current.connect();
			socket.current.emit('connectUser', { userId });
		}
	};

	return {
		init,
	};
};

export { useSocket };
