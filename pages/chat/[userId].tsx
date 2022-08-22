/* eslint-disable react/jsx-key */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Avatar, Box, DTechQuill } from '@components/index';
import { MainLayoutTemplate, SingleChatMessage } from '@components/customs';
import { useRouter } from 'next/router';
import { Container, Segment } from 'semantic-ui-react';
import dynamic from 'next/dynamic';

import { ChatList, IUsersStatusArr, IAuth } from '@utils/types/commAndStoreTypes';
import { techImage } from '@utils/constants/techs';
import OnlineSvg from '@styles/svg/online.svg';
import OfflineSvg from '@styles/svg/offline.svg';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

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
	const conversationId = useRef();

	const bottomRef = useRef<any>(null);
	const { userId: userUID } = router.query; // UID in here

	const authStore = useSelector((state: { auth: IAuth }) => state.auth);

	useEffect(() => {
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

	useLayoutEffect(() => {
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
					conversationId.current = response.data.convId;
					setChatList(response.data.chatList);
				})
				.catch((err) => {});
		}
	}, [authStore.userToken, authStore.userUID, userUID]);

	// useEffect(() => {
	// 	if (quillWrapperHeight && firstLoad.current) {
	// 		const chatListArray: ChatList[] = [
	// 			{ value: 'asdfasdf', imgList: [], linkList: [] },
	// 			{
	// 				value: 'linkListTest',
	// 				imgList: [
	// 					{ fileName: 'React', filePreview: techImage['React'] },
	// 					{ fileName: 'Node', filePreview: techImage['Node'] },
	// 				],
	// 				linkList: [
	// 					'https://steemit.com/technology/@inspiredjw/node-js-xss',
	// 					'https://www.inflearn.com/',
	// 				],
	// 			},
	// 			{
	// 				value: 'linkListTest',
	// 				imgList: [
	// 					{ fileName: 'React', filePreview: techImage['React'] },
	// 					{ fileName: 'Node', filePreview: techImage['Node'] },
	// 				],
	// 				linkList: [
	// 					'https://steemit.com/technology/@inspiredjw/node-js-xss',
	// 					'https://www.inflearn.com/',
	// 				],
	// 			},
	// 			{
	// 				value: 'linkListTest',
	// 				imgList: [
	// 					{ fileName: 'React', filePreview: techImage['React'] },
	// 					{ fileName: 'Node', filePreview: techImage['Node'] },
	// 				],
	// 				linkList: [
	// 					'https://steemit.com/technology/@inspiredjw/node-js-xss',
	// 					'https://www.inflearn.com/',
	// 				],
	// 			},
	// 			{
	// 				value: 'linkListTest',
	// 				imgList: [
	// 					{ fileName: 'React', filePreview: techImage['React'] },
	// 					{ fileName: 'Node', filePreview: techImage['Node'] },
	// 				],
	// 				linkList: [
	// 					'https://steemit.com/technology/@inspiredjw/node-js-xss',
	// 					'https://www.inflearn.com/',
	// 				],
	// 			},
	// 			{
	// 				value: 'linkListTest',
	// 				imgList: [
	// 					{ fileName: 'React', filePreview: techImage['React'] },
	// 					{ fileName: 'Node', filePreview: techImage['Node'] },
	// 				],
	// 				linkList: [
	// 					'https://steemit.com/technology/@inspiredjw/node-js-xss',
	// 					'https://www.inflearn.com/',
	// 				],
	// 			},
	// 			{
	// 				value: 'linkListTest',
	// 				imgList: [
	// 					{ fileName: 'React', filePreview: techImage['React'] },
	// 					{ fileName: 'Node', filePreview: techImage['Node'] },
	// 				],
	// 				linkList: [
	// 					'https://steemit.com/technology/@inspiredjw/node-js-xss',
	// 					'https://www.inflearn.com/',
	// 				],
	// 			},
	// 			{
	// 				value: 'linkListTest',
	// 				imgList: [
	// 					{ fileName: 'React', filePreview: techImage['React'] },
	// 					{ fileName: 'Node', filePreview: techImage['Node'] },
	// 				],
	// 				linkList: [
	// 					'https://steemit.com/technology/@inspiredjw/node-js-xss',
	// 					'https://www.inflearn.com/',
	// 				],
	// 			},
	// 			{
	// 				value: 'linkListTest',
	// 				imgList: [
	// 					{ fileName: 'React', filePreview: techImage['React'] },
	// 					{ fileName: 'Node', filePreview: techImage['Node'] },
	// 				],
	// 				linkList: [
	// 					'https://steemit.com/technology/@inspiredjw/node-js-xss',
	// 					'https://www.inflearn.com/',
	// 				],
	// 			},
	// 		];

	// 		if (bottomRef.current) setChatList(chatListArray);

	// 		firstLoad.current = false;
	// 	}
	// }, [quillWrapperHeight]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'auto' });
	}, [chatList]);

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
							{chatList.map((item: any, idx: number) => {
								return (
									<SingleChatMessage
										key={item.MESSAGE_ID}
										value={item.MESSAGE_TEXT}
										messageOwner={item.USER_UID === userUID ? 'other' : 'mine'}
										bottomRef={bottomRef}
									/>
								);
							})}
							{/* {chatList.map((item: ChatList, idx: number) => {
								return (
									<>
										<SingleChatMessage
											key={`asdf_${idx}`}
											value={item.value}
											imgList={item.imgList}
											linkList={item.linkList}
											messageOwner={idx % 2 === 0 ? 'other' : 'mine'}
											bottomRef={bottomRef}
										/>
									</>
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
								console.log(content.imgList);
								console.log(JSON.stringify(content.imgList));
								console.log(content.linkList);
								console.log(JSON.stringify(content.linkList));
								axios
									.post(
										'http://localhost:3066/api/chat/savePrivateChat',
										{
											chatMessage: content.value,
											userUID: authStore.userUID,
											convId: conversationId.current,
										},
										{
											headers: { Authorization: authStore.userToken },
										},
									)
									.then((response) => {
										console.log('success in chat');
										console.log(response);
										setChatList(response.data.chatList);
									})
									.catch((err) => {
										console.log('error in chat');
										console.log(err);
									});
								// 이미지 S3 되면 올리고 setChatList 호출
								// setChatList((prev: ChatList[]) => [
								// 	...prev,
								// 	{
								// 		value: content.value,
								// 		imgList: content.imgList,
								// 		linkList: content.linkList.map((item: any) => item.insert),
								// 	},
								// ]);
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
