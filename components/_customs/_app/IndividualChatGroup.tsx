import { useRouter } from 'next/router';
import { generateAvatarImage } from '@utils/appRelated/helperFunctions';
import { customStyleObj } from '@utils/styleRelated/stylehelper';
import classNames from 'classnames/bind';
import cookie from 'js-cookie';

import Style from './IndividualChatGroup.module.scss';

interface IIndividualChatGroup {
	chatUID: string;
	chatName: string;
	cnt: number;
	newMsgNoti?: boolean;
}

const IndividualChatGroup = ({
	chatUID,
	chatName,
	cnt,
	newMsgNoti = false,
}: IIndividualChatGroup) => {
	const cx = classNames.bind(Style);
	const router = useRouter();

	return (
		<div
			className={Style['folder-icons']}
			data-uid={chatUID}
			onClick={() => {
				cookie.set('currentChatRoom', chatUID);
				router.push(`/chat/room/${chatUID}`);
			}}
		>
			<div
				className={Style['user-avatar']}
				style={customStyleObj(0, [{ name: 'userCnt', value: cnt }])}
			>
				<img src={generateAvatarImage(chatUID)} alt="noImg" />
				<div>{cnt}</div>
			</div>
			<div className={cx('groupName', `${newMsgNoti ? 'newNoti' : 'noNoti'}`)}>
				{chatName}
			</div>
		</div>
	);
};

export default IndividualChatGroup;
