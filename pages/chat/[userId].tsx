/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, DTechQuill } from '@components/index';
import { MainLayoutTemplate, SingleChatMessage } from '@components/customs';
import { useRouter } from 'next/router';
import { techImage } from '@utils/constants/techs';
import {
	Container,
	Segment,
	Label,
	Divider,
	Button as SemanticUIButton,
	Icon,
} from 'semantic-ui-react';

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
			const tempChat = [
				'sdafasf',
				'sdafasf',
				'sdafasf',
				'sdafasf',
				'sdafasf',
				'sdafasf',
				'sdafasf',
				'sdafasf',
				`<SemanticUIButton
				style={
					idx % 2 === 0
						? {
								position: 'absolute',
								left: '100.5%',
								bottom: '2%',
								height: '20px',
								border: 'none',
								borderRadius: '5px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
						  }
						: {
								position: 'absolute',
								right: '100%',
								bottom: '2%',
								height: '20px',
								border: 'none',
								borderRadius: '5px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
						  }
				}
			>
				<Icon name="copy" />
			</SemanticUIButton>`,
			];

			if (bottomRef.current) setChatList(tempChat);

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
							{chatList.map((item: any, idx: number) => {
								return (
									<>
										<SingleChatMessage
											key={`asdf_${idx}`}
											context={item}
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
								console.log(`height is ${quillWrapperHeight}`);
								setQuillWrapperHeight(heightValue);
							}}
							handleSubmit={(content: any) => {
								console.log(content);
								setChatList((prev: any) => [...prev, content.value]);
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
