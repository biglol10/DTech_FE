import { Box, List } from '@components/index';
import { MainLayoutTemplate } from '@components/customs';
import { parseCookies } from 'nookies';
import { Label } from 'semantic-ui-react';
// import { redirectUser } from '@utils/appRelated/helperFunctions';

const ChatPage = (state: any) => {
	const items = [
		{
			content: 'Web editor는 React-Quill 라이브러리 사용했습니다.',
		},
		{
			content: '텍스트, 이미지, 링크를 전송하는 기능을 제공하고 있습니다',
		},
		{
			content:
				'링크를 전송 시 채팅영역에 해당 링크의 메타데이터가 표시되며 이미지 전송 시 채팅영역에 이미지가 표시됩니다.',
		},
		{
			content:
				'이미지 클릭 시 풀 사이즈로 볼 수 있는 모달 사이즈가 나오며 링크 클릭 시 해당 사이트로 이동이 가능합니다.',
		},
		{
			content:
				'기본적인 붙여넣기 기능이 제공되며 이미지 또한 붙여넣기가 가능합니다. 다만 잠깐 깜빡이는 현상이 발생할 수 있습니다',
		},
		{
			content: (
				<Label as="a" color="yellow" image>
					<img src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" />
					Christian
					<Label.Detail>Co-worker</Label.Detail>
				</Label>
			),
		},
		{
			content: <div style={{ color: 'blue' }}>al;fdjeqruopqwru</div>,
		},
	];

	return (
		<>
			<main style={{ height: '100%', position: 'relative' }}>
				<Box id="chatAreaBox1" boxType="primary" textAlign="center">
					<h3 style={{ fontWeight: 'bold' }}>
						채팅하고픈 상대를 클릭 시 상대방과 채팅할 수 있습니다.
					</h3>
				</Box>

				<br />

				<Box id="chatAreaBox2" boxType="basic">
					<h4>해당 화면에서 제공하는 기능은 다음과 같습니다.</h4>
					<List
						id="sampleList1"
						listType="buletted"
						verticalAlign="middle"
						items={items}
					/>
				</Box>
			</main>
		</>
	);
};

ChatPage.PageLayout = MainLayoutTemplate;

export const getServerSideProps = async (context: any) => {
	const { currentChatUser } = parseCookies(context);

	if (currentChatUser) {
		return {
			redirect: {
				permanent: false,
				destination: `/chat/${currentChatUser}`,
			},
			props: {},
		};
	} else {
		return {
			props: {},
		};
	}
};

export default ChatPage;
