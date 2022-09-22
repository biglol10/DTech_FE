/** ****************************************************************************************
 * @설명 : 채팅 페이지
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                   변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-08-25   feature/JW/chat        최초작성
 * 2      변지욱     2022-08-29   feature/JW/chat        유저명 표시하도록 변경, socket에서 직접 채팅리스트 가져오도록 변경
 * 3      변지욱     2022-08-29   feature/JW/layoutchat  최초 로드 시엔 변경중입니다 텍스트 안 보이게 변경
 * 4      변지욱     2022-09-06   feature/JW/chatPage    누구랑 채팅하는지 세팅
 ********************************************************************************************/

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Box, DTechQuill, SharpDivider, TextWithDotAnimation } from '@components/index';
import { MainLayoutTemplate, SingleChatMessage } from '@components/customs';
import { Container, Segment } from 'semantic-ui-react';
import dynamic from 'next/dynamic';

import { ChatList, IUsersStatusArr, IAuth } from '@utils/types/commAndStoreTypes';
import OnlineSvg from '@styles/svg/online.svg';
import OfflineSvg from '@styles/svg/offline.svg';
import axios, { AxiosResponse } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import lodash from 'lodash';
import cookie from 'js-cookie';
import * as RCONST from '@utils/constants/reducerConstants';

import Style from './[userId].module.scss';

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

const ReactQuill = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill');

		return function comp({ forwardedRef, ...props }: any) {
			return <RQ ref={forwardedRef} {...props} />;
		};
	},
	{ ssr: false },
);

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

	const { userId: userUID } = queryObj; // UID in here

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: RCONST.SET_CURRENT_CHAT_USER, chatUser: userUID });
		cookie.set('currentChatUser', userUID);

		return () => {
			dispatch({ type: RCONST.SET_CURRENT_CHAT_USER, chatUser: '' });
		};
	}, [dispatch, userUID]);

	const authStore = useSelector((state: { auth: IAuth }) => state.auth);
	const socket = authStore.userSocket;

	const chatToDateGroup = (arr: any) => {
		const groupsReduce = arr.reduce((previouseVal: any, currentVal: any) => {
			const date = currentVal.SENT_DATETIME.split('T')[0];

			const hourMin = dayjs(currentVal.SENT_DATETIME).format('HH:mm');

			if (!previouseVal[date]) {
				previouseVal[date] = {};
			}
			if (!previouseVal[date][hourMin]) {
				previouseVal[date][hourMin] = [];
			}
			previouseVal[date][hourMin].push(currentVal);
			return previouseVal;
		}, {});

		return groupsReduce;
	};

	useEffect(() => {
		userUID &&
			axios
				.get('http://localhost:3066/api/auth/getUsersInfo', {
					params: { usersParam: [userUID] },
				})
				.then((response) => {
					setChatUser(response.data.usersInfo[0]);
				})
				.catch(() => {
					toast['error'](<>{'유저정보를 가져오지 못했습니다'}</>);
				});
	}, [userUID]);

	const getPrivateChatListFunction = useCallback(
		(successCallback: Function, errorCallback: Function) => {
			if (authStore.userUID && authStore.userToken && userUID) {
				axios
					.post(
						'http://localhost:3066/api/chat/getPrivateChatList',
						{ fromUID: authStore.userUID, toUID: userUID },
						{
							headers: { Authorization: `Bearer ${authStore.userToken}` },
						},
					)
					.then((response) => successCallback(response))
					.catch((err) => errorCallback(err));
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[authStore.userToken, authStore.userUID, userUID],
	);

	const getPrivateChatListAxios = useCallback(
		(chatListSocket: any = null, convIdSocket: string = '') => {
			if (
				lodash.isEmpty(chatListSocket) ||
				(lodash.isArray(chatListSocket) && chatListSocket.length === 0)
			) {
				getPrivateChatListFunction(
					(response: AxiosResponse<any, any>) => {
						conversationId.current = response.data.convId;
						const groupsReduce = chatToDateGroup(response.data.chatList);

						setChatList(groupsReduce);
					},
					(err: any) => {
						toast['error'](<>{'채팅정보를 가져오지 못했습니다'}</>);
					},
				);
			} else {
				conversationId.current = convIdSocket;
				const groupsReduce = chatToDateGroup(chatListSocket);

				setChatList(groupsReduce);
			}
		},
		[getPrivateChatListFunction],
	);

	useEffect(() => {
		getPrivateChatListAxios();
	}, [getPrivateChatListAxios]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'auto' });
	}, [chatList, quillWrapperHeight]);

	const sendMessageFunction = useCallback(
		async (content: ChatList) => {
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
				.post('http://localhost:3066/api/chat/uploadChatImg', formData)
				.then((response) => {
					socket?.emit('sendPrivateMessage', {
						chatMessage: content.value,
						userUID: authStore.userUID,
						convId: conversationId.current,
						imgList: JSON.stringify(
							content.imgList.length !== 0
								? response.data.bodyObj.imgArr.map(
										(urlString: string) =>
											`${process.env.NEXT_PUBLIC_IMG_S3}${urlString}`,
								  )
								: [],
						),
						linkList: JSON.stringify(content.linkList),
						toUserId: chatUser && chatUser.USER_ID,
					});
				})
				.catch(() => {
					console.log('image S3 error');
				});

			socket?.on('messageSendSuccess', ({ chatListSocket, convIdSocket }: any) => {
				getPrivateChatListAxios(chatListSocket, convIdSocket);
			});
		},
		[authStore.userUID, chatUser, getPrivateChatListAxios, socket],
	);

	useEffect(() => {
		socket?.on('newMessageReceived', ({ chatListSocket, convIdSocket, fromUID }: any) => {
			getPrivateChatListAxios(chatListSocket, convIdSocket);
		});
		socket?.on('textChangeNotification', (sendingUser: string) => {
			setSendingUserState(sendingUser);
			setTextChangeNotification(true);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket]);

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
																				userUID
																					? 'other'
																					: 'mine'
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
								// 이미지 S3 되면 올리고 setChatList 호출
								console.log(quillRef.current);
								console.log(content);
								sendMessageFunction(content);
							}}
							QuillSSR={ReactQuill}
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

// export const getServerSideProps = wrapper.getServerSideProps((store) => (context): any => {
// 	store.dispatch({ type: 'SET_CURRENT_CHAT_USER', chatUser: context.query });
// 	return { props: { queryObj: context.query } };
// });

export const getServerSideProps = async (context: any) => {
	return { props: { queryObj: context.query } };
};

export default UserChat;
