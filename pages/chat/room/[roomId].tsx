/** ****************************************************************************************
 * @설명 : 그룹채팅 페이지
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                   변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-09-26   feature/JW/chatRoom     최초작성
 ********************************************************************************************/

import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Box, DTechQuill, SharpDivider, TextWithDotAnimation, Label } from '@components/index';
import { MainLayoutTemplate, SingleChatMessage } from '@components/customs';
import { Container, Segment, Icon } from 'semantic-ui-react';

import { ChatList, IUsersStatusArr, IAuth } from '@utils/types/commAndStoreTypes';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import lodash from 'lodash';
import { chatToDateGroup } from '@utils/appRelated/helperFunctions';
import * as RCONST from '@utils/constants/reducerConstants';

import Style from './[roomId].module.scss';

interface IChatList {
	MESSAGE_ID: string;
	TO_USERNAME: string;
	MESSAGE_TEXT: string;
	IMG_LIST: string[];
	LINK_LIST: string[];
	SENT_DATETIME: string;
	USER_UID: string;
	USER_NM: string;
	USER_TITLE: string;
	CONVERSATION_ID: string;
}

interface ChatDateReduce {
	[val: string]: {
		[val2: string]: IChatList[];
	};
}

const dayOfWeek: { [val: string]: string } = {
	'0': '월요일',
	'1': '화요일',
	'2': '수요일',
	'3': '목요일',
	'4': '금요일',
	'5': '토요일',
	'6': '일요일',
};

const RoomChat = ({
	usersStatusArr,
	queryObj,
}: {
	usersStatusArr: IUsersStatusArr[];
	queryObj: { roomId: string };
}) => {
	const authStore = useSelector((state: { auth: IAuth }) => state.auth);
	const socket = authStore.userSocket;

	const [quillWrapperHeight, setQuillWrapperHeight] = useState(0);
	const [chatList, setChatList] = useState<ChatDateReduce>({});
	const [textChangeNotification, setTextChangeNotification] = useState(false);
	const [sendingUserState, setSendingUserState] = useState<string>('');

	const bottomRef = useRef<any>(null);
	const firstLoadRef = useRef<boolean>(true);
	const quillRef = useRef<any>(null);

	const roomID = useMemo(() => {
		return queryObj.roomId;
	}, [queryObj.roomId]);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: RCONST.SET_CURRENT_CHAT_GROUP, chatGroup: roomID });

		return () => {
			dispatch({ type: RCONST.SET_CURRENT_CHAT_GROUP, chatGroup: '' });
		};
	}, [dispatch, roomID]);

	const getGroupChatListCallback = useCallback(() => {
		axios
			.post(
				`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/getGroupChatList`,
				{
					chatRoomId: roomID,
					readingUser: authStore.userUID,
				},
				{
					headers: { Authorization: `Bearer ${authStore.userToken}` },
				},
			)
			.then((response) => {
				const chatGroupReduce = chatToDateGroup(response.data.chatList);

				setChatList((prev) => chatGroupReduce);
			});
	}, [authStore.userToken, authStore.userUID, roomID]);

	useEffect(() => {
		if (roomID && authStore.userToken && authStore.userUID) {
			getGroupChatListCallback();
		}
	}, [authStore.userToken, authStore.userUID, getGroupChatListCallback, roomID]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'auto' });
	}, [chatList, quillWrapperHeight]);

	const notifyTextChange = useCallback(() => {
		if (!firstLoadRef.current) {
			if (authStore.userName) {
				socket?.emit('textChangeNotification', {
					sendingUser: `${authStore.userName} (${authStore.userTitle || '사용자'})`,
				});
			}
		} else {
			firstLoadRef.current = false;
		}
	}, [authStore.userName, authStore.userTitle, socket]);

	const sendPrivateMessageSocket = (content: ChatList, imgArr = []) => {
		socket?.emit('sendGroupMessage', {
			chatMessage: content.value,
			userUID: authStore.userUID,
			convId: roomID,
			imgList: JSON.stringify(
				imgArr.length !== 0
					? imgArr.map(
							(urlString: string) => `${process.env.NEXT_PUBLIC_IMG_S3}${urlString}`,
					  )
					: [],
			),
			linkList: JSON.stringify(content.linkList),
		});
	};

	const sendMessageFunction = async (content: ChatList) => {
		if (content.imgList.length > 0) {
			const formData = new FormData();
			const postData = {
				dir: 'chat/',
			};

			formData.append('postData', JSON.stringify(postData));

			for (let i = 0; i < content.imgList.length; i++) {
				formData.append(
					'img',
					content.imgList[i].imageFile,
					`${content.imgList[i].fileName}`,
				);
			}

			await axios
				.post(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/uploadChatImg`, formData)
				.then((response) => {
					sendPrivateMessageSocket(content, response.data.bodyObj.imgArr);
				})
				.catch(() => {
					toast['error'](<>{'이미지를 보내지 못했습니다'}</>);
				});
		} else {
			sendPrivateMessageSocket(content);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			if (textChangeNotification) setTextChangeNotification(false);
		}, 3500);
	}, [textChangeNotification]);

	useEffect(() => {
		if (roomID && authStore.userId) {
			socket?.emit('joinRoom', {
				roomID,
				joinedUser: authStore.userId,
			});
		}

		socket?.on('messageGroupSendSuccess', ({ chatListSocket }: any) => {
			const cloneObjReduce = chatToDateGroup(lodash.cloneDeep(chatListSocket));

			setChatList((prev) => cloneObjReduce);
		});

		socket?.on('newMessageGroupReceived', ({ chatListSocket, fromUID, convId }: any) => {
			if (roomID === convId) getGroupChatListCallback();
		});

		socket?.on('textChangeNotification', (sendingUser: string) => {
			setSendingUserState(sendingUser);
			setTextChangeNotification(true);
		});
	}, [authStore.userId, getGroupChatListCallback, roomID, socket]);

	return (
		<>
			<main id={Style['chatMain']}>
				<Box
					id={Style['chatUserBox']}
					spacing={0}
					boxType="basic"
					textAlign="left"
					className={Style['chatUserBox']}
				>
					<Label
						basic
						// content={
						// 	cookie.get('currentChatRoom')
						// 		? JSON.parse(cookie.get('currentChatRoom')!).chatName
						// 		: '그룹 채팅'
						// }
						content="asdf"
						iconOrImage="icon"
						icon={<Icon name="rocketchat" />}
						color="green"
						borderNone
						size="big"
					/>
				</Box>
				<Container>
					{quillWrapperHeight ? (
						<Segment
							style={{
								height: `calc(100% - ${quillWrapperHeight}px - 20px)`,
							}}
							className={Style['chatWrapperSegment']}
						>
							{chatList &&
								Object.keys(chatList).map((item: string, idx: number) => {
									return (
										<>
											<SharpDivider
												content={`${item} (${
													dayOfWeek[dayjs(item).day().toString()]
												})`}
												className={Style['dateDivider']}
											/>
											{Object.keys(chatList[item]).map(
												(item2: string, idx2: number) => {
													return (
														<>
															{chatList[item][item2].map(
																(
																	item3: IChatList,
																	idx3: number,
																) => {
																	return (
																		<SingleChatMessage
																			key={item3.MESSAGE_ID}
																			value={
																				item3.MESSAGE_TEXT
																			}
																			messageOwner={
																				item3.USER_UID ===
																				authStore.userUID
																					? 'mine'
																					: 'other'
																			}
																			linkList={
																				item3.LINK_LIST
																			}
																			sentTime={
																				idx3 ===
																				chatList[item][
																					item2
																				].length -
																					1
																					? item3.SENT_DATETIME
																					: null
																			}
																			userName={`${item3.USER_NM} (${item3.USER_TITLE})`}
																			imgList={
																				typeof item3.IMG_LIST ===
																				'string'
																					? JSON.parse(
																							item3.IMG_LIST,
																					  )
																					: item3.IMG_LIST
																			}
																		/>
																	);
																},
															)}
														</>
													);
												},
											)}
										</>
									);
								})}
							<div ref={bottomRef} />
						</Segment>
					) : (
						<p></p>
					)}
					<div className={Style['quillWrapperDiv']}>
						<DTechQuill
							ref={quillRef}
							quillMaxHeight={250}
							returnQuillWrapperHeight={(heightValue: number) => {
								setQuillWrapperHeight(heightValue);
							}}
							handleSubmit={(content: ChatList) => {
								sendMessageFunction(content);
							}}
							// QuillSSR={ReactQuill}
							notifyTextChange={notifyTextChange}
						/>
						<TextWithDotAnimation
							content={`${sendingUserState}님이 입력중입니다`}
							marginLeftValue={20}
							dotSize={8}
							hide={!textChangeNotification}
						/>
					</div>
				</Container>
			</main>
		</>
	);
};

RoomChat.PageLayout = MainLayoutTemplate;
RoomChat.displayName = 'chatPage';

export const getServerSideProps = async (context: any) => {
	return { props: { queryObj: context.query } };
};

export default RoomChat;
