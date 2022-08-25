/** ****************************************************************************************
 * @설명 : 채팅 페이지
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                   변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-08-25      feature/JW/chat         최초작성
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
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import Style from './[userId].module.scss';

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
	const [chatList, setChatList] = useState<any>({});
	const [textChangeNotification, setTextChangeNotification] = useState(false);
	const [sendingUserState, setSendingUserState] = useState<string>('');
	const conversationId = useRef();

	const bottomRef = useRef<any>(null);

	const { userId: userUID } = queryObj; // UID in here

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
							headers: { Authorization: authStore.userToken },
						},
					)
					.then((response) => successCallback(response))
					.catch((err) => errorCallback(err));
			}
		},
		[authStore.userToken, authStore.userUID, userUID],
	);

	const getPrivateChatListAxios = useCallback(() => {
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
	}, [getPrivateChatListFunction]);

	useEffect(() => {
		getPrivateChatListAxios();
	}, [getPrivateChatListAxios]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'auto' });
	}, [chatList, quillWrapperHeight]);

	const sendMessageFunction = useCallback(
		(content: ChatList) => {
			socket?.emit('sendPrivateMessage', {
				chatMessage: content.value,
				userUID: authStore.userUID,
				convId: conversationId.current,
				imgList: JSON.stringify(content.imgList),
				linkList: JSON.stringify(content.linkList),
				toUserId: chatUser && chatUser.USER_ID,
			});

			socket?.on('messageSendSuccess', () => {
				getPrivateChatListAxios();
			});
		},
		[authStore.userUID, chatUser, getPrivateChatListAxios, socket],
	);

	useEffect(() => {
		socket?.on('newMessageReceived', () => {
			getPrivateChatListAxios();
		});
		socket?.on('textChangeNotification', (sendingUser: string) => {
			setSendingUserState(sendingUser);
			setTextChangeNotification(true);
		});
	}, [authStore.userToken, authStore.userUID, getPrivateChatListAxios, socket, userUID]);

	const notifyTextChange = useCallback(() => {
		if (authStore.userName) {
			socket?.emit('textChangeNotification', {
				sendingUser: `${authStore.userName} (${authStore.userTitle || '사용자'})`,
			});
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
						color="white"
						content={chatUser ? `${chatUser.NAME} (${chatUser.TITLE})` : ''}
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
																(item3: any, idx3: number) => {
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
																			bottomRef={bottomRef}
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
							quillMaxHeight={250}
							returnQuillWrapperHeight={(heightValue: number) => {
								setQuillWrapperHeight(heightValue);
							}}
							handleSubmit={(content: ChatList) => {
								// 이미지 S3 되면 올리고 setChatList 호출
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

export const getServerSideProps = async (context: any) => {
	return { props: { queryObj: context.query } };
};

export default UserChat;
