/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, DTechQuill } from '@components/index';
import { MainLayoutTemplate, SingleChatMessage } from '@components/customs';
import { useRouter } from 'next/router';
import { Container, Segment } from 'semantic-ui-react';
import dynamic from 'next/dynamic';

import { ChatList } from '@utils/types/commTypes';
import { techImage } from '@utils/constants/techs';
import OnlineSvg from '@styles/svg/online.svg';
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

const UserChat = () => {
	const router = useRouter();
	const [quillWrapperHeight, setQuillWrapperHeight] = useState(0);
	const [chatList, setChatList] = useState<any>([]);
	const firstLoad = useRef<boolean>(true);
	const bottomRef = useRef<any>(null);
	const { userId } = router.query;

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'auto' });
	}, [quillWrapperHeight]);

	useEffect(() => {
		if (quillWrapperHeight && firstLoad.current) {
			const chatListArray: ChatList[] = [
				{ value: 'asdfasdf', imgList: [], linkList: [] },
				{
					value: 'linkListTest',
					imgList: [
						{ fileName: 'React', filePreview: techImage['React'] },
						{ fileName: 'Node', filePreview: techImage['Node'] },
					],
					linkList: ['https://github.com/', 'https://www.inflearn.com/'],
				},
				{
					value: 'linkListTest',
					imgList: [
						{ fileName: 'React', filePreview: techImage['React'] },
						{ fileName: 'Node', filePreview: techImage['Node'] },
					],
					linkList: ['https://github.com/', 'https://www.inflearn.com/'],
				},
				{
					value: 'linkListTest',
					imgList: [
						{ fileName: 'React', filePreview: techImage['React'] },
						{ fileName: 'Node', filePreview: techImage['Node'] },
					],
					linkList: ['https://github.com/', 'https://www.inflearn.com/'],
				},
				{
					value: 'linkListTest',
					imgList: [
						{ fileName: 'React', filePreview: techImage['React'] },
						{ fileName: 'Node', filePreview: techImage['Node'] },
					],
					linkList: ['https://github.com/', 'https://www.inflearn.com/'],
				},
				{
					value: 'linkListTest',
					imgList: [
						{ fileName: 'React', filePreview: techImage['React'] },
						{ fileName: 'Node', filePreview: techImage['Node'] },
					],
					linkList: ['https://github.com/', 'https://www.inflearn.com/'],
				},
				{
					value: 'linkListTest',
					imgList: [
						{ fileName: 'React', filePreview: techImage['React'] },
						{ fileName: 'Node', filePreview: techImage['Node'] },
					],
					linkList: ['https://github.com/', 'https://www.inflearn.com/'],
				},
				{
					value: 'linkListTest',
					imgList: [
						{ fileName: 'React', filePreview: techImage['React'] },
						{ fileName: 'Node', filePreview: techImage['Node'] },
					],
					linkList: ['https://github.com/', 'https://www.inflearn.com/'],
				},
				{
					value: 'linkListTest',
					imgList: [
						{ fileName: 'React', filePreview: techImage['React'] },
						{ fileName: 'Node', filePreview: techImage['Node'] },
					],
					linkList: ['https://github.com/', 'https://www.inflearn.com/'],
				},
			];

			if (bottomRef.current) setChatList(chatListArray);

			firstLoad.current = false;
		}
	}, [quillWrapperHeight]);

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
					<OnlineSvg />
					<Avatar
						id="userSettingArea"
						color="white"
						content={userId as string}
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
							{chatList.map((item: ChatList, idx: number) => {
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
							})}
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
								setChatList((prev: ChatList[]) => [
									...prev,
									{
										value: content.value,
										imgList: content.imgList,
										linkList: content.linkList.map((item: any) => item.insert),
									},
								]);
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
