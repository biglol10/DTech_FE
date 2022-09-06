import { Box } from '@components/index';
import { MainLayoutTemplate } from '@components/customs';
import { parseCookies } from 'nookies';
// import { redirectUser } from '@utils/appRelated/helperFunctions';

const ChatPage = (state: any) => {
	return (
		<>
			<main style={{ height: '100%', position: 'relative' }}>
				<Box id="chatAreaBox1" boxType="basic" textAlign="center">
					<span>This is the chat page</span>
				</Box>

				<br />
				<Box id="chatAreaBox2">
					<div style={{ height: '500px' }}>asdfsa</div>
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
