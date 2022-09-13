import { useMemo } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { generateAvatarImage } from '@utils/appRelated/helperFunctions';
import { Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { IAuth } from '@utils/types/commAndStoreTypes';
import { useChatUtil } from '@utils/hooks/customHooks';

import Style from './IndividualChatUser.module.scss';

interface IIndividualChatUser {
	onlineStatus: 'ONLINE' | 'OFFLINE';
	userUID: string;
	userName: string;
	userTitle: string;
	userImg?: string;
	userAdminYN?: string | number;
	newMsgNoti?: boolean;
}

const IndividualChatUser = ({
	onlineStatus,
	userUID,
	userName,
	userTitle,
	userImg = '',
	userAdminYN = '0',
	newMsgNoti = false,
}: IIndividualChatUser) => {
	const cx = classNames.bind(Style);
	const router = useRouter();

	const { unReadArrSlice } = useChatUtil();

	const authStore = useSelector((state: { auth: IAuth }) => state.auth);

	const isNotSameUser = useMemo(() => {
		if (authStore.userUID === userUID) return false;
		else return true;
	}, [authStore.userUID, userUID]);

	return (
		<div
			className={Style['folder-icons']}
			data-uid={userUID}
			onClick={() => {
				isNotSameUser && router.push({ pathname: `/chat/${userUID}` });
				unReadArrSlice(userUID);
			}}
		>
			<div className={cx('user-avatar', onlineStatus.toLowerCase())}>
				<img src={userImg || generateAvatarImage(userUID)} />
				{(userAdminYN === 1 || userAdminYN === '1') && (
					<Icon name="star" color="yellow" className={Style['starIcon']} />
				)}
			</div>
			<div
				className={cx('username', `${newMsgNoti ? 'newNoti' : 'noNoti'}`)}
			>{`${userName} (${userTitle})`}</div>
		</div>
	);
};

export default IndividualChatUser;
