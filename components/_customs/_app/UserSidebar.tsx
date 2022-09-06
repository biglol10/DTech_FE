import React, { useState } from 'react';
import { InputLayout, SharpDivider, InputWithIcon } from '@components/index';
import Image from 'next/image';
import DLogo from '@public/images/DLogo2.png';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { IAuth, IUsersStatusArr } from '@utils/types/commAndStoreTypes';

import IndividualChatUser from './IndividualChatUser';
import Style from './UserSidebar.module.scss';

const UserSidebar = ({
	iconLeft,
	usersStatusArr,
}: {
	iconLeft: boolean;
	usersStatusArr: IUsersStatusArr[];
}) => {
	const [isLogoBorderBottom, setIsLogoBorderBottom] = useState(false);
	const [userSearch, setUserSearch] = useState('');

	const cx = classNames.bind(Style);

	const router = useRouter();

	const authStore = useSelector((state: { auth: IAuth }) => state.auth);

	return (
		<div className={cx('sidebarChat', `${iconLeft ? 'showSidebar' : 'hideSidebar'}`)}>
			{iconLeft && (
				<>
					<div
						className={Style['chatLogo']}
						style={{
							borderBottom: `${isLogoBorderBottom ? '1px solid #999999' : 'none'}`,
							cursor: 'pointer',
						}}
						onClick={() => router.push('/')}
					>
						<Image src={DLogo} width={48} height={48} /> Dtech App
					</div>

					<div
						className={Style['chatArea']}
						onScroll={(e: any) => setIsLogoBorderBottom(e.target.scrollTop > 20)}
					>
						<div className={Style['userSearch']}>
							<InputLayout
								stretch={true}
								inputLabel="사용자 검색"
								inputLabelSize="h5"
								showInputLabel={true}
								spacing={32}
							>
								<InputWithIcon
									id="userSearchInput"
									placeholder="사용자 검색"
									value={userSearch}
									size="small"
									onChange={(obj: { value: string }) => {
										setUserSearch(obj.value);
									}}
									inputIcon={<Icon name="delete" />}
								/>
							</InputLayout>
						</div>

						<div className={Style['usersInfo']}>
							<SharpDivider content="온라인" />

							<div className={Style['usersOnline']}>
								{usersStatusArr
									.filter((obj) => obj.USER_NM.includes(userSearch || ''))
									.map(
										(item, idx: number) =>
											item.USER_ID !== authStore.userId &&
											item.ONLINE_STATUS === 'ONLINE' && (
												<IndividualChatUser
													key={`online_${idx}`}
													onlineStatus="ONLINE"
													userUID={item.USER_UID}
													userName={item.USER_NM}
													userTitle={item.USER_TITLE}
													userImg={item.USER_IMG_URL}
												/>
											),
									)}
							</div>

							<SharpDivider content="오프라인" />

							<div className={Style['usersOffline']}>
								{usersStatusArr
									.filter((obj) => obj.USER_NM.includes(userSearch || ''))
									.map(
										(item, idx) =>
											item.USER_ID !== authStore.userId &&
											item.ONLINE_STATUS === 'OFFLINE' && (
												<IndividualChatUser
													key={`offline_${idx}`}
													onlineStatus="OFFLINE"
													userUID={item.USER_UID}
													userName={item.USER_NM}
													userTitle={item.USER_TITLE}
													userImg={item.USER_IMG_URL}
												/>
											),
									)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default UserSidebar;
