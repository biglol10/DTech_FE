import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import {
	Avatar,
	Box,
	DTechQuill,
	SharpDivider,
	TextWithDotAnimation,
	Label,
} from '@components/index';
import { MainLayoutTemplate, SingleChatMessage } from '@components/customs';
import { Container, Segment, Icon } from 'semantic-ui-react';

import { ChatList, IUsersStatusArr, IAuth, IAppCommon } from '@utils/types/commAndStoreTypes';
import OnlineSvg from '@styles/svg/online.svg';
import OfflineSvg from '@styles/svg/offline.svg';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import lodash from 'lodash';
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
	const [chatUser, setChatUser] = useState<{ [name: string]: string }>();
	const [chatList, setChatList] = useState<ChatDateReduce>({});
	const [textChangeNotification, setTextChangeNotification] = useState(false);
	const [sendingUserState, setSendingUserState] = useState<string>('');

	const conversationId = useRef<string>();
	const bottomRef = useRef<any>(null);
	const firstLoadRef = useRef<boolean>(true);
	const quillRef = useRef<any>(null);

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
					const chatGroupReduce = chatToDateGroup(response.data.chatList);

					setChatList((prev) => chatGroupReduce);
				});
		}
	}, [authStore.userToken, roomID]);

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
					{/* {usersStatusArr.filter((item) => item.USER_UID === userUID).length > 0 ? (
						<OnlineSvg />
					) : (
						<OfflineSvg />
					)} */}
					<Label
						basic
						content="ChatRoom number 1"
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
								// 이미지 S3 되면 올리고 setChatList 호출
								console.log(quillRef.current);
								console.log(content);
								// sendMessageFunction(content);
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
