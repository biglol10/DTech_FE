/* eslint-disable func-style */
/** ****************************************************************************************
 * @설명 : 그룹채팅 페이지
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                   변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-09-26   feature/JW/chatRoom     최초작성
 * 2      변지욱     2022-10-06   feature/JW/groupChat    그룹챗 멤버 modal 표시
 * 3      변지욱     2022-11-22   feature/JW/refactor     일주일치 채팅내역 우선 보여주고 위로 스크롤 시 이전 채팅내역 표시
 * 4      변지욱     2022-11-23   feature/JW/refactor     메시지 보낼 때 소캣을 이용하지 않는 방식으로 변경
 * 5      변지욱     2022-11-23   feature/JW/refactor     중복 api request 문제 해결
 * 6      변지욱     2022-12-05   feature/JW/refactor     이전 채팅내역을 버튼으로 컨트롤하게끔 변경
 ********************************************************************************************/

import { GetServerSideProps } from 'next';
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Box, DTechQuill, SharpDivider, TextWithDotAnimation, Label, AvatarGroup } from '@components/index';
import { MainLayoutTemplate, SingleChatMessage, ChatMembersModal } from '@components/customs';
import { Container, Segment, Icon, Header, Button } from 'semantic-ui-react';

import { ChatList, IUserStatus, IAuth, IConversation } from '@utils/types/commAndStoreTypes';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { parseCookies } from 'nookies';
import lodash from 'lodash';
import { chatToDateGroup, comAxiosRequest, generateAvatarImage } from '@utils/appRelated/helperFunctions';
import * as RCONST from '@utils/constants/reducerConstants';
import { useModal, useChatUtil } from '@utils/hooks/customHooks';
import classNames from 'classnames/bind';

import Style from './[roomId].module.scss';

interface ChatDateReduce {
	[val: string]: {
		[val2: string]: IConversation[];
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

const RoomChat = ({ queryObj, currentChatRoomName }: { queryObj: { roomId: string }; currentChatRoomName: string }) => {
	const authStore = useSelector((state: { auth: IAuth }) => state.auth);
	const socket = authStore.userSocket;

	const [quillWrapperHeight, setQuillWrapperHeight] = useState(0);
	const [chatList, setChatList] = useState<IConversation[]>([]);
	const [groupMembers, setGroupMembers] = useState<IUserStatus[]>([]);
	const [textChangeNotification, setTextChangeNotification] = useState(false);
	const [sendingUserState, setSendingUserState] = useState<string>('');
	const [previousLoading, setPreviousLoading] = useState(false);
	const [isEndofChat, setIsEndofChat] = useState(false);

	const lastMsgId = useRef<string>('');
	const bottomRef = useRef<any>(null);
	const bottomRefActiveRef = useRef<boolean>(false);
	const firstLoadRef = useRef<boolean>(true);
	const quillRef = useRef<any>(null);

	const { unReadArrSlice } = useChatUtil();

	const { handleModal } = useModal();

	const roomID = useMemo(() => {
		return queryObj.roomId;
	}, [queryObj.roomId]);

	const dispatch = useDispatch();

	const cx = classNames.bind(Style);

	useEffect(() => {
		dispatch({ type: RCONST.SET_CURRENT_CHAT_GROUP, chatGroup: roomID });

		return () => {
			dispatch({ type: RCONST.SET_CURRENT_CHAT_GROUP, chatGroup: '' });
		};
	}, [dispatch, roomID]);

	const getGroupChatListCallback = useCallback(
		async (viewPrevious: boolean = false) => {
			setPreviousLoading(viewPrevious);
			bottomRefActiveRef.current = !viewPrevious;
			const dataObj = lodash.merge(
				{
					chatRoomId: roomID,
					readingUser: authStore.userUID,
				},
				lastMsgId.current ? { lastMsgId: lastMsgId.current } : {},
				viewPrevious ? { isPreviousGubun: true } : {},
			);

			await comAxiosRequest({
				url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/getGroupChatList`,
				requestType: 'post',
				dataObj,
				withAuth: true,
				successCallback: (response) => {
					setGroupMembers((prev) => {
						if (lodash.isEqual(groupMembers, response.data.groupChatUsers)) return prev;
						return response.data.groupChatUsers;
					});

					setChatList((prev) => {
						lodash.isEqual(prev, response.data.chatList) && setIsEndofChat(true);
						if (prev.length) lastMsgId.current = prev[0].MESSAGE_ID;
						else if (response.data.chatList.length) lastMsgId.current = response.data.chatList[0].MESSAGE_ID;
						return response.data.chatList;
					});
				},
				failCallback: () => toast['error'](<>{'채팅정보를 가져오지 못했습니다'}</>),
			});
			setPreviousLoading(false);
		},
		[authStore.userUID, groupMembers, roomID],
	);

	const chatListDateGroup: ChatDateReduce = useMemo(() => {
		const chatGroupReduce = chatToDateGroup(chatList);

		return chatGroupReduce;
	}, [chatList]);

	useEffect(() => {
		if (roomID && authStore.userToken && authStore.userUID) {
			// eslint-disable-next-line no-inner-declarations
			async function fetchChatList() {
				await getGroupChatListCallback();
			}
			fetchChatList();
		}
	}, [authStore.userToken, authStore.userUID, getGroupChatListCallback, roomID]);

	useEffect(() => {
		bottomRefActiveRef.current && bottomRef.current?.scrollIntoView({ behavior: 'auto' });
		!bottomRefActiveRef.current &&
			chatList.length &&
			document.getElementById(lastMsgId.current)?.scrollIntoView({ behavior: 'auto', block: 'center' });
		lastMsgId.current = chatList[0]?.MESSAGE_ID;
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

	const sendGroupMessageCallback = useCallback(
		async (content: ChatList, imgArr = []) => {
			bottomRefActiveRef.current = true;
			await comAxiosRequest({
				url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/insertGroupChatMessage`,
				requestType: 'post',
				dataObj: {
					chatMessage: content.value,
					userUID: authStore.userUID,
					convId: roomID,
					imgList: JSON.stringify(imgArr.length !== 0 ? imgArr.map((urlString: string) => `${process.env.NEXT_PUBLIC_IMG_S3}${urlString}`) : []),
					linkList: JSON.stringify(content.linkList),
				},
				successCallback: (response) => {
					const newChatObj = response.data.newChat[0];
					const usersToNotify = response.data.usersToNotify;

					socket?.emit('groupMessageSentSuccess', {
						convId: roomID,
						usersToNotify,
					});

					setChatList((prev) => {
						if (prev.some((item) => item.MESSAGE_ID === newChatObj.MESSAGE_ID)) return prev;
						const newArr = [...prev, ...response.data.newChat];

						return newArr;
					});
				},
				failCallback: () => toast['error'](<>{'채팅 메시지를 보내지 못했습니다'}</>),
			});
		},
		[authStore.userUID, roomID, socket],
	);

	const sendMessageFunction = async (content: ChatList) => {
		if (content.imgList.length > 0) {
			const formData = new FormData();
			const postData = {
				dir: 'chat/',
			};

			formData.append('postData', JSON.stringify(postData));

			for (let i = 0; i < content.imgList.length; i++) {
				formData.append('img', content.imgList[i].imageFile, `${content.imgList[i].fileName}`);
			}

			await comAxiosRequest({
				url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/uploadChatImg`,
				requestType: 'post',
				dataObj: formData,
				successCallback: async (response) => {
					await sendGroupMessageCallback(content, response.data.bodyObj.imgArr);
				},
				failCallback: () => {
					toast['error'](<>{'이미지를 보내지 못했습니다'}</>);
				},
			});
		} else {
			await sendGroupMessageCallback(content);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			if (textChangeNotification) setTextChangeNotification(false);
		}, 3000);
	}, [textChangeNotification]);

	useEffect(() => {
		if (roomID && authStore.userId) {
			socket?.emit('joinRoom', {
				roomID,
				joinedUser: authStore.userId,
			});
		}

		socket?.on('newMessageGroupReceived', async ({ convId, userUID }: { [key: string]: string }) => {
			if (userUID === authStore.userUID) return;
			if (roomID === convId) await getGroupChatListCallback(false);
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
	}, [authStore.userId, authStore.userUID, getGroupChatListCallback, roomID, socket]);

	const usersImage = useMemo(() => {
		const avatarGroupImgList = groupMembers.map((oneUser) => {
			if (oneUser.USER_IMG_URL) {
				return oneUser.USER_IMG_URL;
			} else {
				return `${generateAvatarImage(oneUser.USER_UID)}`;
			}
		});

		const avatarGroupUserList = groupMembers.slice(0, 3).reduce((previousVal, currentVal, conversationIndex) => {
			if (conversationIndex === 0) {
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
			modalContent: <ChatMembersModal chatGroupMembers={groupMembers} id="chatMembersModal" />,
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
				<Box id={Style['chatUserBox']} spacing={0} boxType="basic" textAlign="left" className={Style['chatUserBox']}>
					<Label basic content={currentChatRoomName} iconOrImage="icon" icon={<Icon name="rocketchat" />} color="green" borderNone size="big" />
					{usersImage && (
						<AvatarGroup
							imageList={usersImage.avatarGroupImgList}
							divHeight={20}
							totalCount={usersImage.avatarGroupImgList.length}
							usersString={usersImage.avatarGroupUserList}
							className={Style['groupChatAvatarGroup']}
							onClick={() => {
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
							<Button
								loading={previousLoading}
								fluid
								className={cx('viewPrevious', `${chatList.length === 0 ? 'hideButton' : ''}`, `${isEndofChat ? 'hideButton' : ''}`)}
								onClick={() => getGroupChatListCallback(true)}
							>
								이전 채팅 보기
							</Button>
							{chatListDateGroup &&
								Object.keys(chatListDateGroup).map((date: string, idx: number) => {
									return (
										<React.Fragment key={`${date}_(${dayOfWeek[dayjs(date).day().toString()]})`}>
											<SharpDivider content={`${date} (${dayOfWeek[dayjs(date).day().toString()]})`} className={Style['dateDivider']} />
											{Object.keys(chatListDateGroup[date]).map((time: string) => {
												return (
													<React.Fragment key={`${date}_(${dayOfWeek[dayjs(date).day().toString()]})_${time}`}>
														{chatListDateGroup[date][time].map((conversation: IConversation, conversationIndex: number) => {
															return (
																<SingleChatMessage
																	key={conversation.MESSAGE_ID}
																	msgId={conversation.MESSAGE_ID}
																	value={conversation.MESSAGE_TEXT}
																	messageOwner={conversation.USER_UID === authStore.userUID ? 'mine' : 'other'}
																	linkList={conversation.LINK_LIST}
																	sentTime={conversationIndex === chatListDateGroup[date][time].length - 1 ? conversation.SENT_DATETIME : null}
																	userName={`${conversation.USER_NM} (${conversation.USER_TITLE})`}
																	imgList={typeof conversation.IMG_LIST === 'string' ? JSON.parse(conversation.IMG_LIST) : conversation.IMG_LIST}
																	isSamePreviousUserChat={
																		conversationIndex > 0 &&
																		chatListDateGroup[date][time][conversationIndex - 1].USER_UID ===
																			chatListDateGroup[date][time][conversationIndex].USER_UID &&
																		dayjs(chatListDateGroup[date][time][conversationIndex].SENT_DATETIME).format('YYYY-MM-DD') ===
																			dayjs(chatListDateGroup[date][time][conversationIndex - 1].SENT_DATETIME).format('YYYY-MM-DD')
																	}
																/>
															);
														})}
													</React.Fragment>
												);
											})}
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
						<TextWithDotAnimation content={`${sendingUserState}님이 입력중입니다`} marginLeftValue={20} dotSize={8} hide={!textChangeNotification} />
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
