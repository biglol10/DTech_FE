import { useEffect, useMemo } from 'react';
import axios from 'axios';
import { MainLayoutTemplate, SingleChatMessage } from '@components/customs';
import { useSelector, useDispatch } from 'react-redux';
import { ChatList, IUsersStatusArr, IAuth, IAppCommon } from '@utils/types/commAndStoreTypes';

const RoomChat = ({ queryObj }: { queryObj: { roomId: string } }) => {
	const authStore = useSelector((state: { auth: IAuth }) => state.auth);

	const roomID = useMemo(() => {
		return queryObj.roomId;
	}, [queryObj.roomId]);

	useEffect(() => {
		if (roomID && authStore.userToken) {
			axios
				.post(
					`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/getGroupChatList`,
					{
						chatRoomId: roomID,
					},
					{
						headers: { Authorization: `Bearer ${authStore.userToken}` },
					},
				)
				.then((response) => {
					console.log('call chatlist success');
					console.log(response.data);
				});
		}
	}, [authStore.userToken, roomID]);

	return <div>{roomID}</div>;
};

RoomChat.PageLayout = MainLayoutTemplate;
RoomChat.displayName = 'chatPage';

export const getServerSideProps = async (context: any) => {
	return { props: { queryObj: context.query } };
};

export default RoomChat;
