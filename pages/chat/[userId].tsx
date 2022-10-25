/** ****************************************************************************************
 * @설명 : 채팅 페이지
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                   변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-08-25   feature/JW/chat        최초작성
 * 2      변지욱     2022-08-29   feature/JW/chat        유저명 표시하도록 변경, socket에서 직접 채팅리스트 가져오도록 변경
 * 3      변지욱     2022-08-29   feature/JW/layoutchat  최초 로드 시엔 변경중입니다 텍스트 안 보이게 변경
 * 4      변지욱     2022-09-06   feature/JW/chatPage    누구랑 채팅하는지 세팅
 * 5      변지욱     2022-09-21   feature/JW/chatPageBug 채팅 제대로 표시 안되는 버그 픽스
 * 6      변지욱     2022-10-03   feature/JW/change      이전 채팅 사용자랑 같으면 이름 표시X
 ********************************************************************************************/

import { GetServerSideProps } from 'next';
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Avatar, Box, DTechQuill, SharpDivider, TextWithDotAnimation } from '@components/index';
import { MainLayoutTemplate, SingleChatMessage } from '@components/customs';
import { Container, Segment } from 'semantic-ui-react';

import {
	ChatList,
	IUsersStatusArr,
	IAuth,
	IAppCommon,
	IMetadata,
} from '@utils/types/commAndStoreTypes';
import OnlineSvg from '@styles/svg/online.svg';
import OfflineSvg from '@styles/svg/offline.svg';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import lodash from 'lodash';
import * as RCONST from '@utils/constants/reducerConstants';
import {
	chatToDateGroup,
	generateAvatarImage,
	comAxiosRequest,
} from '@utils/appRelated/helperFunctions';
import { useChatUtil } from '@utils/hooks/customHooks';

import Style from './[userId].module.scss';

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
	'0': '월요일',
	'1': '화요일',
	'2': '수요일',
	'3': '목요일',
	'4': '금요일',
	'5': '토요일',
	'6': '일요일',
};

const UserChat = ({
	usersStatusArr,
	queryObj,
}: {
	usersStatusArr: IUsersStatusArr[];
	queryObj: any;
}) => {
	const [quillWrapperHeight, setQuillWrapperHeight] = useState(0);
	const [chatUser, setChatUser] = useState<{ [name: string]: string }>();
	const [chatList, setChatList] = useState<ChatDateReduce>({});
	const [textChangeNotification, setTextChangeNotification] = useState(false);
	const [sendingUserState, setSendingUserState] = useState<string>('');
	const conversationId = useRef<string>();

	const bottomRef = useRef<any>(null);
	const firstLoadRef = useRef<boolean>(true);
	const quillRef = useRef<any>(null);

	const userUID = useMemo(() => {
		return queryObj.userId;
	}, [queryObj.userId]);

	const authStore = useSelector((state: { auth: IAuth }) => state.auth);
	const appCommon = useSelector((state: { appCommon: IAppCommon }) => state.appCommon);
	const socket = authStore.userSocket;

	const dispatch = useDispatch();
	const { unReadArrSlice } = useChatUtil();

	useEffect(() => {
		dispatch({ type: RCONST.SET_CURRENT_CHAT_USER, chatUser: userUID });

		return () => {
			dispatch({ type: RCONST.SET_CURRENT_CHAT_USER, chatUser: '' });
		};
	}, [dispatch, userUID]);

	useEffect(() => {
		const { currentChatUser } = appCommon;

		if (currentChatUser) {
			comAxiosRequest({
				url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/auth/getUsersInfo`,
				requestType: 'get',
				dataObj: { usersParam: [userUID] },
				successCallback: (response) => setChatUser(response.data.usersInfo[0]),
				failCallback: () => toast['error'](<>{'유저정보를 가져오지 못했습니다'}</>),
			});
		}
	}, [appCommon, userUID]);

	const getPrivateChatListCallback = useCallback(() => {
		if (cookie.get('currentChatUser') !== userUID) return;
		const { currentChatUser } = appCommon;

		if (currentChatUser && authStore.userUID && authStore.userToken) {
			comAxiosRequest({
				url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/getPrivateChatList`,
				requestType: 'post',
				dataObj: { fromUID: authStore.userUID, toUID: userUID },
				withAuth: true,
				successCallback: (response) => {
					conversationId.current = response.data.convId;
					const chatGroupReduce = chatToDateGroup(response.data.chatList);

					setChatList(chatGroupReduce);
				},
				failCallback: () => toast['error'](<>{'채팅정보를 가져오지 못했습니다'}</>),
			});
		}
	}, [appCommon, authStore.userToken, authStore.userUID, userUID]);

	useEffect(() => {
		getPrivateChatListCallback();
	}, [getPrivateChatListCallback]);

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

	useEffect(() => {
		setTimeout(() => {
			if (textChangeNotification) setTextChangeNotification(false);
		}, 3500);
	}, [textChangeNotification]);

	const sendPrivateMessageSocket = (content: ChatList, imgArr = []) => {
		socket?.emit('sendPrivateMessage', {
			chatMessage: content.value,
			userUID: authStore.userUID,
			convId: conversationId.current,
			imgList: JSON.stringify(
				imgArr.length !== 0
					? imgArr.map(
							(urlString: string) => `${process.env.NEXT_PUBLIC_IMG_S3}${urlString}`,
					  )
					: [],
			),
			linkList: JSON.stringify(content.linkList),
			toUserId: chatUser && chatUser.USER_ID,
			toUserUID: appCommon.currentChatUser,
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
		socket?.on('messageSendSuccess', ({ chatListSocket, toUserUID }: any) => {
			if (appCommon.currentChatUser === toUserUID) {
				const cloneObjReduce = chatToDateGroup(lodash.cloneDeep(chatListSocket));

				setChatList(() => cloneObjReduce);
			}
		});

		socket?.on('newMessageReceived', ({ fromUID }: any) => {
			if (userUID === fromUID) getPrivateChatListCallback();
		});

		socket?.on('textChangeNotification', (sendingUser: string) => {
			setSendingUserState(sendingUser);
			setTextChangeNotification(true);
		});
	}, [socket, appCommon.currentChatUser, userUID, getPrivateChatListCallback]);

	useEffect(() => {
		unReadArrSlice(userUID);
	}, [unReadArrSlice, userUID]);

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
					{usersStatusArr.filter((item) => item.USER_UID === userUID).length > 0 ? (
						<OnlineSvg />
					) : (
						<OfflineSvg />
					)}
					<Avatar
						id="userSettingArea"
						fontColor="white"
						content={chatUser ? `${chatUser.USER_NM} (${chatUser.USER_TITLE})` : ''}
						imageSize="mini"
						labelSize="mini"
						src={
							chatUser &&
							`${chatUser.USER_IMG_URL || generateAvatarImage(chatUser.USER_UID)}`
						}
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
								Object.keys(chatList).map((item: string) => {
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
											{Object.keys(chatList[item]).map((item2: string) => {
												return (
													<React.Fragment
														key={`${item}_(${
															dayOfWeek[dayjs(item).day().toString()]
														})_${item2}`}
													>
														{chatList[item][item2].map(
															(item3: IChatList, idx3: number) => {
																return (
																	<SingleChatMessage
																		key={item3.MESSAGE_ID}
																		msgId={item3.MESSAGE_ID}
																		value={item3.MESSAGE_TEXT}
																		messageOwner={
																			item3.USER_UID ===
																			userUID
																				? 'other'
																				: 'mine'
																		}
																		linkList={item3.LINK_LIST}
																		sentTime={
																			item3.SENT_DATETIME
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
																			chatList[item][item2][
																				idx3
																			].USER_UID ===
																				chatList[item][
																					item2
																				][idx3 - 1]
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
																					chatList[item][
																						item2
																					][idx3 - 1]
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

UserChat.PageLayout = MainLayoutTemplate;
UserChat.displayName = 'chatPage';

export const getServerSideProps: GetServerSideProps = async (context) => {
	return { props: { queryObj: context.query } };
};

export default UserChat;
