/* eslint-disable func-style */
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
 * 7      변지욱     2022-11-22   feature/JW/refactor    일주일치 채팅내역 우선 보여주고 위로 스크롤 시 이전 채팅내역 표시
 * 8      변지욱     2022-11-23   feature/JW/refactor    메시지 보낼 때 소캣을 이용하지 않는 방식으로 변경
 * 9      변지욱     2022-11-23   feature/JW/refactor    중복 api request 문제 해결
 ********************************************************************************************/

import { GetServerSideProps } from 'next';
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Avatar, Box, DTechQuill, SharpDivider, TextWithDotAnimation } from '@components/index';
import { MainLayoutTemplate, SingleChatMessage } from '@components/customs';
import { Container, Segment } from 'semantic-ui-react';

import { ChatList, IUsersStatusArr, IAuth, IMetadata } from '@utils/types/commAndStoreTypes';
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
	'0': '일요일',
	'1': '월요일',
	'2': '화요일',
	'3': '수요일',
	'4': '목요일',
	'5': '금요일',
	'6': '토요일',
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
	const [chatList, setChatList] = useState<IChatList[]>([]);
	// const [chatListDateGroup, setChatListDateGroup] = useState<ChatDateReduce>({});
	const [textChangeNotification, setTextChangeNotification] = useState(false);
	const [sendingUserState, setSendingUserState] = useState<string>('');
	const conversationId = useRef<string>();

	const lastMsgId = useRef<string>('');
	const bottomRef = useRef<any>(null);
	const bottomRefActiveRef = useRef<boolean>(false);
	const firstLoadRef = useRef<boolean>(true);
	const quillRef = useRef<any>(null);

	const userUID = useMemo(() => {
		return queryObj.userId;
	}, [queryObj.userId]);

	const authStore = useSelector((state: { auth: IAuth }) => state.auth);
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
		comAxiosRequest({
			url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/auth/getUsersInfo`,
			requestType: 'get',
			dataObj: { usersParam: [userUID] },
			successCallback: (response) => setChatUser(response.data.usersInfo[0]),
			failCallback: () => toast['error'](<>{'유저정보를 가져오지 못했습니다'}</>),
		});
	}, [userUID]);

	const getPrivateChatListCallback = useCallback(
		async (viewPrevious: boolean = false) => {
			if (cookie.get('currentChatUser') !== userUID) return;

			bottomRefActiveRef.current = !viewPrevious;

			const dataObj = lodash.merge(
				{
					fromUID: authStore.userUID,
					toUID: userUID,
				},
				lastMsgId.current ? { lastMsgId: lastMsgId.current } : {},
			);

			if (authStore.userUID && authStore.userToken) {
				await comAxiosRequest({
					url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/getPrivateChatList`,
					requestType: 'post',
					dataObj,
					withAuth: true,
					successCallback: (response) => {
						conversationId.current = response.data.convId;

						setChatList((prev) => {
							if (prev.length) lastMsgId.current = prev[0].MESSAGE_ID;
							return response.data.chatList;
						});
					},
					failCallback: () => toast['error'](<>{'채팅정보를 가져오지 못했습니다'}</>),
				});
			}
		},
		[authStore.userToken, authStore.userUID, userUID],
	);

	const chatListDateGroup: ChatDateReduce = useMemo(() => {
		const chatGroupReduce = chatToDateGroup(chatList);

		return chatGroupReduce;
	}, [chatList]);

	useEffect(() => {
		async function fetchChatList() {
			await getPrivateChatListCallback();
		}
		fetchChatList();
	}, [getPrivateChatListCallback]);

	useEffect(() => {
		bottomRefActiveRef.current && bottomRef.current?.scrollIntoView({ behavior: 'auto' });
		!bottomRefActiveRef.current &&
			chatList.length &&
			document
				.getElementById(lastMsgId.current)
				?.scrollIntoView({ behavior: 'auto', block: 'center' });
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
		}, 3000);
	}, [textChangeNotification]);

	const sendPrivateMessageCallback = useCallback(
		async (content: ChatList, imgArr = []) => {
			bottomRefActiveRef.current = true;
			await comAxiosRequest({
				url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/insertPrivateChatMessage`,
				requestType: 'post',
				dataObj: {
					chatMessage: content.value,
					userUID: authStore.userUID,
					convId: conversationId.current,
					imgList: JSON.stringify(
						imgArr.length !== 0
							? imgArr.map(
									(urlString: string) =>
										`${process.env.NEXT_PUBLIC_IMG_S3}${urlString}`,
							  )
							: [],
					),
					linkList: JSON.stringify(content.linkList),
					toUserId: chatUser && chatUser.USER_ID,
				},
				successCallback: (response) => {
					const newChatObj = response.data.newChat[0];

					socket?.emit('privateMessageSentSuccess', {
						fromUserId: authStore.userUID,
						toUserId: chatUser?.USER_ID,
					});

					setChatList((prev) => {
						if (prev.some((item) => item.MESSAGE_ID === newChatObj.MESSAGE_ID))
							return prev;
						const newArr = [...prev, ...response.data.newChat];

						return newArr;
					});
				},
				failCallback: () => toast['error'](<>{'채팅 메시지를 보내지 못했습니다'}</>),
			});
		},
		[authStore.userUID, chatUser, socket],
	);

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
					sendPrivateMessageCallback(content, response.data.bodyObj.imgArr);
				},
				failCallback: () => {
					toast['error'](<>{'이미지를 보내지 못했습니다'}</>);
				},
			});
		} else {
			await sendPrivateMessageCallback(content);
		}
	};

	useEffect(() => {
		socket?.on('newMessageReceived', async ({ fromUID }: any) => {
			if (userUID === fromUID) await getPrivateChatListCallback(false);
		});

		socket?.on('textChangeNotification', (sendingUser: string) => {
			setSendingUserState(sendingUser);
			setTextChangeNotification(true);
		});
	}, [socket, userUID, getPrivateChatListCallback]);

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
							onScroll={(e: any) => {
								const element = e.target;

								if (element.scrollTop === 0) {
									getPrivateChatListCallback(true);
								}
							}}
						>
							{chatListDateGroup &&
								Object.keys(chatListDateGroup).map((item: string) => {
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
											{Object.keys(chatListDateGroup[item]).map(
												(item2: string) => {
													return (
														<React.Fragment
															key={`${item}_(${
																dayOfWeek[
																	dayjs(item).day().toString()
																]
															})_${item2}`}
														>
															{chatListDateGroup[item][item2].map(
																(
																	item3: IChatList,
																	idx3: number,
																) => {
																	return (
																		<SingleChatMessage
																			key={item3.MESSAGE_ID}
																			msgId={item3.MESSAGE_ID}
																			value={
																				item3.MESSAGE_TEXT
																			}
																			messageOwner={
																				item3.USER_UID ===
																				userUID
																					? 'other'
																					: 'mine'
																			}
																			linkList={
																				item3.LINK_LIST
																			}
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
																				chatListDateGroup[
																					item
																				][item2][idx3]
																					.USER_UID ===
																					chatListDateGroup[
																						item
																					][item2][
																						idx3 - 1
																					].USER_UID &&
																				dayjs(
																					chatListDateGroup[
																						item
																					][item2][idx3]
																						.SENT_DATETIME,
																				).format(
																					'YYYY-MM-DD',
																				) ===
																					dayjs(
																						chatListDateGroup[
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

UserChat.PageLayout = MainLayoutTemplate;
UserChat.displayName = 'chatPage';

export const getServerSideProps: GetServerSideProps = async (context) => {
	return { props: { queryObj: context.query } };
};

export default UserChat;
