import { useMemo } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { generateAvatarImage } from '@utils/appRelated/helperFunctions';
import { Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { IAuth, IAppCommon, IUsersStatusArr } from '@utils/types/commAndStoreTypes';

import Style from './IndividualChatUser.module.scss';

interface IIndividualChatUser {
	onlineStatus: 'ONLINE' | 'OFFLINE';
	userUID: string;
	userName: string;
	userTitle: string;
	userImg?: string;
	userAdminYN?: string | number;
}

const IndividualChatUser = ({
	onlineStatus,
	userUID,
	userName,
	userTitle,
	userImg = '',
	userAdminYN = '0',
}: IIndividualChatUser) => {
	const cx = classNames.bind(Style);
	const router = useRouter();

	const authStore = useSelector((state: { auth: IAuth }) => state.auth);

	const isNotSameUser = useMemo(() => {
		if (authStore.userUID === userUID) return false;
		else return true;
	}, [authStore.userUID, userUID]);

	return (
		<div
			className={Style['folder-icons']}
			data-uid={userUID}
			// onClick={() => router.push({ pathname: `/chat/${userUID}` })}
			onClick={() => isNotSameUser && router.push({ pathname: `/chat/${userUID}` })}
		>
			<div className={cx('user-avatar', onlineStatus.toLowerCase())}>
				<img src={userImg || generateAvatarImage(userUID)} />
				{(userAdminYN === 1 || userAdminYN === '1') && (
					<Icon name="star" color="yellow" className={Style['starIcon']} />
				)}
			</div>
			<div className={Style['username']}>{`${userName} (${userTitle})`}</div>
		</div>
	);
};

export default IndividualChatUser;
