import { useState } from 'react';
import { DTechQuill } from '@components/index';
import { MainLayoutTemplate } from '@components/customs';
import { useRouter } from 'next/router';
import { Container, Segment } from 'semantic-ui-react';

const UserChat = () => {
	const router = useRouter();
	const [quillWrapperHeight, setQuillWrapperHeight] = useState(0);
	const { userId } = router.query;

	return (
		<>
			<div style={{ height: '100%', position: 'relative' }}>
				<Segment>Pellentesque habitant morbi tristique senectus.</Segment>
				<div>
					{quillWrapperHeight ? (
						<Segment
							style={{
								overflowY: 'auto',
								height: `${720 - quillWrapperHeight}px`,
								marginBottom: '100px',
							}}
						>
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
								console.log(heightValue);
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
