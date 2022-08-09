/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, DTechQuill } from '@components/index';
import { MainLayoutTemplate, SingleChatMessage } from '@components/customs';
import { useRouter } from 'next/router';
import { Container, Segment } from 'semantic-ui-react';

import { ChatList } from '@utils/types/commTypes';
import Style from './[userId].module.scss';

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
			const chatListArray: ChatList[] = [{ value: 'asdfasdf', imgList: [], linkList: [] }];

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
				<Segment>
					<Avatar
						id="userSettingArea"
						color="white"
						content={userId as string}
						imageSize="mini"
						labelSize="mini"
					/>
				</Segment>
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
										/>
										{/* <div
											style={{
												alignSelf: `${
													idx % 2 === 0 ? 'self-start' : 'self-end'
												}`,
											}}
										>
											<Label
												attached={`top ${idx % 2 === 0 ? 'left' : 'right'}`}
												className={Style['avatarLabel']}
											>
												<Avatar
													labelSize="mini"
													src={techImage['Docker']}
													color="black"
													content={'asfd'}
												/>
											</Label>
											<Divider hidden style={{ marginBottom: '7px' }} />
											<Label
												basic
												color="red"
												pointing={`${idx % 2 === 0 ? 'left' : 'right'}`}
												style={{
													maxWidth: '100%',
												}}
											>
												<pre
													className={Style['preClass']}
												>{`${item.replaceAll('\t', ' '.repeat(4))}`}</pre>
											</Label>

											<SemanticUIButton
												style={
													idx % 2 === 0
														? {
																position: 'absolute',
																left: '101%',
																border: 'none',
																borderRadius: '5px',
																bottom: '0%',
														  }
														: {
																position: 'absolute',
																right: '100%',
																border: 'none',
																borderRadius: '5px',
																bottom: '0%',
														  }
												}
												size="mini"
											>
												<Icon name="copy" size="mini" />
											</SemanticUIButton>
										</div> */}
										{/* <div style={{ backgroundColor: 'red', width: '100%' }}>
											asddfafd
										</div> */}
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
							quillHeight={250}
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
										linkList: content.linkList,
									},
								]);
							}}
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
