import { MainLayoutTemplate } from '@components/customs';
import { useRouter } from 'next/router';

const UserChat = () => {
	const router = useRouter();
	const { userId } = router.query;

	return <span>{userId}</span>;
};

UserChat.PageLayout = MainLayoutTemplate;

export default UserChat;
