import { Box, List } from '@components/index';
import { MainLayoutTemplate } from '@components/customs';
import { parseCookies } from 'nookies';

const ChatPage = (state: any) => {
	const items = [
		{
			content: (
				<span>
					Web editor는{' '}
					<a
						href="https://github.com/zenoamaro/react-quill"
						target="_blank"
						rel="noreferrer"
					>
						React-Quill
					</a>{' '}
					라이브러리를 base로 커스터마이징을 마여 사용하고 있습니다.
				</span>
			),
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
			content: (
				<p>
					기본적인 텍스트 붙여넣기 기능이 제공되며 이미지 또한 <u>붙여넣기가</u>{' '}
					가능합니다.
				</p>
			),
		},
		{
			content: `채팅을 입력할 때마다 사용자에게 'XX님이 입력중입니다'라는 문구가 출력됩니다`,
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

ChatPage.displayName = 'chatMainPage';
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
