/** ****************************************************************************************
 * @설명 : 그룹채팅 페이지
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                   변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-09-26   feature/JW/chatRoom     최초작성
 * 2      변지욱     2022-10-06   feature/JW/groupChat    그룹챗 멤버 modal 표시
 ********************************************************************************************/

import { GetServerSideProps } from 'next';
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import {
	Box,
	DTechQuill,
	SharpDivider,
	TextWithDotAnimation,
	Label,
	AvatarGroup,
} from '@components/index';
import { MainLayoutTemplate, SingleChatMessage, ChatMembersModal } from '@components/customs';
import { Container, Segment, Icon, Header } from 'semantic-ui-react';

import { ChatList, IUsersStatusArr, IAuth, IMetadata } from '@utils/types/commAndStoreTypes';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { parseCookies } from 'nookies';
import lodash from 'lodash';
import {
	chatToDateGroup,
	comAxiosRequest,
	generateAvatarImage,
} from '@utils/appRelated/helperFunctions';
import * as RCONST from '@utils/constants/reducerConstants';
import { useModal, useChatUtil } from '@utils/hooks/customHooks';

import Style from './[roomId].module.scss';

interface IChatList {
	MESSAGE_ID: string;
	TO_USERNAME: string;
	MESSAGE_TEXT: string;
	IMG_LIST: string[];
	LINK_LIST: IMetadata[];
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
	'0': '일요일',
	'1': '월요일',
	'2': '화요일',
	'3': '수요일',
	'4': '목요일',
	'5': '금요일',
	'6': '토요일',
};

const RoomChat = ({
	usersStatusArr,
	queryObj,
	currentChatRoomName,
}: {
	usersStatusArr: IUsersStatusArr[];
	queryObj: { roomId: string };
	currentChatRoomName: string;
}) => {
	const authStore = useSelector((state: { auth: IAuth }) => state.auth);
	const socket = authStore.userSocket;

	const [quillWrapperHeight, setQuillWrapperHeight] = useState(0);
	const [chatList, setChatList] = useState<ChatDateReduce>({});
	const [groupMembers, setGroupMembers] = useState<IUsersStatusArr[]>([]);
	const [textChangeNotification, setTextChangeNotification] = useState(false);
	const [sendingUserState, setSendingUserState] = useState<string>('');

	const bottomRef = useRef<any>(null);
	const firstLoadRef = useRef<boolean>(true);
	const quillRef = useRef<any>(null);

	const { unReadArrSlice } = useChatUtil();

	const { handleModal } = useModal();

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
		comAxiosRequest({
			url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/getGroupChatList`,
			requestType: 'post',
			dataObj: {
				chatRoomId: roomID,
				readingUser: authStore.userUID,
			},
			withAuth: true,
			successCallback: (response) => {
				const chatGroupReduce = chatToDateGroup(response.data.chatList);

				setGroupMembers(response.data.groupChatUsers);
				setChatList((prev) => chatGroupReduce);
			},
			failCallback: () => toast['error'](<>{'채팅정보를 가져오지 못했습니다'}</>),
		});
	}, [authStore.userUID, roomID]);

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

			await comAxiosRequest({
				url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/uploadChatImg`,
				requestType: 'post',
				dataObj: formData,
				successCallback: (response) => {
					sendPrivateMessageSocket(content, response.data.bodyObj.imgArr);
				},
				failCallback: () => {
					toast['error'](<>{'이미지를 보내지 못했습니다'}</>);
				},
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

		return () => {
			if (roomID && authStore.userId) {
				socket?.emit('leaveRoom', {
					roomID,
					joinedUser: authStore.userId,
				});
			}
		};
	}, [authStore.userId, getGroupChatListCallback, roomID, socket]);

	const usersImage = useMemo(() => {
		const avatarGroupImgList = groupMembers.map((oneUser) => {
			if (oneUser.USER_IMG_URL) {
				return oneUser.USER_IMG_URL;
			} else {
				return `${generateAvatarImage(oneUser.USER_UID)}`;
			}
		});

		const avatarGroupUserList = groupMembers
			.slice(0, 3)
			.reduce((previousVal, currentVal, idx3) => {
				if (idx3 === 0) {
					return `${previousVal}${currentVal.USER_NM} (${currentVal.USER_TITLE})`;
				} else {
					return `${previousVal}, ${currentVal.USER_NM} (${currentVal.USER_TITLE})`;
				}
			}, '');

		return {
			avatarGroupImgList,
			avatarGroupUserList,
		};
	}, [groupMembers]);

	const openChatGroupModal = useCallback(() => {
		handleModal({
			modalOpen: true,
			modalContent: (
				<ChatMembersModal chatGroupMembers={groupMembers} id="chatMembersModal" />
			),
			modalFitContentWidth: true,
			modalContentId: 'chatMembersModal',
			modalTitle: (
				<Header as="h3">
					<Icon name="rocketchat" />
					<Header.Content>{currentChatRoomName}의 멤버목록</Header.Content>
				</Header>
			),
		});
	}, [currentChatRoomName, groupMembers, handleModal]);

	useEffect(() => {
		unReadArrSlice(roomID);
	}, [unReadArrSlice, roomID]);

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
						content={currentChatRoomName}
						iconOrImage="icon"
						icon={<Icon name="rocketchat" />}
						color="green"
						borderNone
						size="big"
					/>
					{usersImage && (
						<AvatarGroup
							imageList={usersImage.avatarGroupImgList}
							divHeight={20}
							totalCount={usersImage.avatarGroupImgList.length}
							usersString={usersImage.avatarGroupUserList}
							className={Style['groupChatAvatarGroup']}
							onClick={(e) => {
								openChatGroupModal();
							}}
						/>
					)}
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
										<React.Fragment
											key={`${item}_(${
												dayOfWeek[dayjs(item).day().toString()]
											})`}
										>
											<SharpDivider
												content={`${item} (${
													dayOfWeek[dayjs(item).day().toString()]
												})`}
												className={Style['dateDivider']}
											/>
											{Object.keys(chatList[item]).map(
												(item2: string, idx2: number) => {
													return (
														<React.Fragment
															key={`${item}_(${
																dayOfWeek[
																	dayjs(item).day().toString()
																]
															})_${item2}`}
														>
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
																			isSamePreviousUserChat={
																				idx3 > 0 &&
																				chatList[item][
																					item2
																				][idx3 - 1]
																					.USER_UID ===
																					chatList[item][
																						item2
																					][idx3]
																						.USER_UID &&
																				dayjs(
																					chatList[item][
																						item2
																					][idx3]
																						.SENT_DATETIME,
																				).format(
																					'YYYY-MM-DD',
																				) ===
																					dayjs(
																						chatList[
																							item
																						][item2][
																							idx3 - 1
																						]
																							.SENT_DATETIME,
																					).format(
																						'YYYY-MM-DD',
																					)
																			}
																		/>
																	);
																},
															)}
														</React.Fragment>
													);
												},
											)}
										</React.Fragment>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { currentChatRoom } = parseCookies(context);

	return {
		props: {
			queryObj: context.query,
			currentChatRoomName: JSON.parse(currentChatRoom).chatName,
		},
	};
};

export default RoomChat;
