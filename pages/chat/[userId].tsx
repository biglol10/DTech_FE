/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Box, DTechQuill } from '@components/index';
import { MainLayoutTemplate, SingleChatMessage } from '@components/customs';
import { useRouter } from 'next/router';
import { Container, Segment } from 'semantic-ui-react';
import dynamic from 'next/dynamic';

import { ChatList, IUsersStatusArr, IAuth } from '@utils/types/commAndStoreTypes';
import OnlineSvg from '@styles/svg/online.svg';
import OfflineSvg from '@styles/svg/offline.svg';
import axios from 'axios';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import Style from './[userId].module.scss';

const ReactQuill = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill');

		return function comp({ forwardedRef, ...props }: any) {
			return <RQ ref={forwardedRef} {...props} />;
		};
	},
	{ ssr: false },
);

const UserChat = ({ usersStatusArr }: { usersStatusArr: IUsersStatusArr[] }) => {
	const router = useRouter();
	const [quillWrapperHeight, setQuillWrapperHeight] = useState(0);
	const [chatUser, setChatUser] = useState<{ [name: string]: string }>();
	const [chatList, setChatList] = useState<any>([]);
	const [tempList, setTempList] = useState<any>({});
	const conversationId = useRef();

	const bottomRef = useRef<any>(null);
	const { userId: userUID } = router.query; // UID in here

	const authStore = useSelector((state: { auth: IAuth }) => state.auth);
	const socket = authStore.userSocket;

	useEffect(() => {
		userUID &&
			axios
				.get('http://localhost:3066/api/auth/getUsersInfo', {
					params: { usersParam: [userUID] },
				})
				.then((response) => {
					setChatUser(response.data.usersInfo[0]);
				})
				.catch((err) => {});
	}, [userUID]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'auto' });
	}, [quillWrapperHeight]);

	useEffect(() => {
		if (authStore.userUID && authStore.userToken && userUID) {
			setChatList([]);
			axios
				.post(
					'http://localhost:3066/api/chat/getPrivateChatList',
					{ fromUID: authStore.userUID, toUID: userUID },
					{
						headers: { Authorization: authStore.userToken },
					},
				)
				.then((response) => {
					conversationId.current = response.data.convId;
					const chatListResponse = response.data.chatList;

					const groupsReduce = chatListResponse.reduce(
						(previouseVal: any, currentVal: any) => {
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
						},
						{},
					);

					setTempList(groupsReduce);

					setChatList(response.data.chatList);
				})
				.catch((err) => {});
		}
	}, [authStore.userToken, authStore.userUID, userUID]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'auto' });
	}, [chatList]);

	const getPrivateChatListAxios = useCallback(() => {
		if (authStore.userUID && authStore.userToken && userUID) {
			axios
				.post(
					'http://localhost:3066/api/chat/getPrivateChatList',
					{ fromUID: authStore.userUID, toUID: userUID },
					{
						headers: { Authorization: authStore.userToken },
					},
				)
				.then((response) => {
					console.log('response is ');
					console.log(response.data);
					setChatList([]);
					conversationId.current = response.data.convId;
					setChatList(response.data.chatList);
				})
				.catch((err) => {});
		}
	}, [authStore.userToken, authStore.userUID, userUID]);

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
				alert('SADFsaf');
				getPrivateChatListAxios();
			});
		},
		[authStore.userUID, chatUser, getPrivateChatListAxios, socket],
	);

	useEffect(() => {
		socket?.on('newMessageReceived', () => {
			getPrivateChatListAxios();
		});
	}, [authStore.userToken, authStore.userUID, getPrivateChatListAxios, socket, userUID]);

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
								height: `calc(100% - ${quillWrapperHeight}px)`,
							}}
							className={Style['chatWrapperSegment']}
						>
							{Object.keys(tempList).map((item: string, idx: number) => {
								return (
									<>
										<h1>{item}</h1>
										{Object.keys(tempList[item]).map(
											(item2: string, idx2: number) => {
												return (
													<>
														{tempList[item][item2].map(
															(item3: any, idx3: number) => {
																return (
																	<SingleChatMessage
																		key={item3.MESSAGE_ID}
																		value={item3.MESSAGE_TEXT}
																		messageOwner={
																			item3.USER_UID ===
																			userUID
																				? 'other'
																				: 'mine'
																		}
																		bottomRef={bottomRef}
																		linkList={
																			item3.LINK_LIST &&
																			!!JSON.parse(
																				item3.LINK_LIST,
																			).length &&
																			JSON.parse(
																				item3.LINK_LIST,
																			)
																		}
																		sentTime={
																			idx3 ===
																			tempList[item][item2]
																				.length -
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

							{/* {chatList.map((item: any, idx: number) => {
								const isSameTime =
									idx < chatList.length - 1 &&
									dayjs(item.SENT_DATETIME).format('YYYY-MM-DD HH:mm') ===
										dayjs(chatList[idx + 1].SENT_DATETIME).format(
											'YYYY-MM-DD HH:mm',
										);

								return (
									<SingleChatMessage
										key={item.MESSAGE_ID}
										value={item.MESSAGE_TEXT}
										messageOwner={item.USER_UID === userUID ? 'other' : 'mine'}
										bottomRef={bottomRef}
										linkList={
											item.LINK_LIST &&
											!!JSON.parse(item.LINK_LIST).length &&
											JSON.parse(item.LINK_LIST)
										}
										sentTime={isSameTime ? null : item.SENT_DATETIME}
									/>
								);
							})} */}
							<div ref={bottomRef} />
						</Segment>
					) : (
						<p></p>
					)}
					<div
						style={{
							height: 'auto',
							backgroundColor: 'white',
							position: 'absolute',
							bottom: '0%',
							width: '100%',
						}}
					>
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
						/>
					</div>
				</Container>
			</main>
		</>
	);
};

UserChat.PageLayout = MainLayoutTemplate;
UserChat.displayName = 'chat';

export default UserChat;
