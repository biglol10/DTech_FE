/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, DTechQuill } from '@components/index';
import { MainLayoutTemplate } from '@components/customs';
import { useRouter } from 'next/router';
import { Container, Segment, Label } from 'semantic-ui-react';

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
			];

			if (bottomRef.current) setChatList(tempChat);

			firstLoad.current = false;
		}
		// setTimeout(() => {
		// 	const tempChat = [
		// 		'sdafasf',
		// 		'sdafasf',
		// 		'sdafasf',
		// 		'sdafasf',
		// 		'sdafasf',
		// 		'sdafasf',
		// 		'sdafasf',
		// 		'sdafasf',
		// 	];

		// 	if (bottomRef.current) setChatList(tempChat);
		// }, 2000);
	}, [quillWrapperHeight]);

	const htmlString = `<div>asdfadfs<br/>wqrqwerqwer</div>`;

	return (
		<>
			<div style={{ height: '100%', position: 'relative' }}>
				<div style={{ height: '5%', marginBottom: '2%' }}>
					<Segment>
						<Avatar id="userSettingArea" color="white" content={userId as string} />
					</Segment>
				</div>
				<div
					style={{
						height: '92%',
						position: 'absolute',
						width: '100%',
						bottom: '0%',
					}}
				>
					{quillWrapperHeight ? (
						<Segment
							style={{
								overflowY: 'auto',
								height: `calc(100% - ${quillWrapperHeight}px)`,
								paddingBottom: '20px',
							}}
						>
							{chatList.map((item: any) => {
								// return (
								// 	<p>
								// 		<pre>{`${item}`}</pre>
								// 	</p>
								// );
								return (
									<p style={{ width: '50%' }}>
										<Label
											basic
											color="red"
											pointing={'right'}
											style={{ width: '100%' }}
										>
											<pre className={Style['preClass']}>{`${item}`}</pre>
										</Label>
									</p>
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
								console.log('content is');
								console.log(content);
								setChatList((prev: any) => [...prev, content.value]);
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

UserChat.PageLayout = MainLayoutTemplate;
UserChat.displayName = 'chat';

export default UserChat;
