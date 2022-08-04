import { useEffect, useRef, useState } from 'react';
import { Avatar, DTechQuill } from '@components/index';
import { MainLayoutTemplate } from '@components/customs';
import { useRouter } from 'next/router';
import { Container, Segment } from 'semantic-ui-react';

const UserChat = () => {
	const router = useRouter();
	const [quillWrapperHeight, setQuillWrapperHeight] = useState(0);
	const bottomRef = useRef<any>(null);
	const { userId } = router.query;

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'auto' });
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
							<p>
								<pre>{htmlString}</pre>
							</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
							<p>sdafasf</p>
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
						/>
					</div>
				</div>
			</div>
		</>
	);
};

UserChat.PageLayout = MainLayoutTemplate;

export default UserChat;
