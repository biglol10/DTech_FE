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
