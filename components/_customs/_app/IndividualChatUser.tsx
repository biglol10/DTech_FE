import classNames from 'classnames/bind';
import { Router, useRouter } from 'next/router';

import Style from './IndividualChatUser.module.scss';

interface IIndividualChatUser {
	onlineStatus: 'ONLINE' | 'OFFLINE';
	userUID: string;
	userName: string;
	userTitle: string;
	userImg?: string;
}

const IndividualChatUser = ({
	onlineStatus,
	userUID,
	userName,
	userTitle,
	userImg = '',
}: IIndividualChatUser) => {
	const cx = classNames.bind(Style);
	const router = useRouter();

	return (
		<div
			className={Style['folder-icons']}
			data-uid={userUID}
			onClick={() => router.push({ pathname: `/chat/${userUID}` })}
		>
			<div className={cx('user-avatar', onlineStatus.toLowerCase())}>
				<img src={userImg || 'https://randomuser.me/api/portraits/women/71.jpg'} />
			</div>
			<div className={Style['username']}>{`${userName} (${userTitle})`}</div>
		</div>
	);
};

export default IndividualChatUser;
