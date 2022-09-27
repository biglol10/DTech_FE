import React, { useCallback, useEffect, useState } from 'react';
import { InputLayout, SharpDivider, InputWithIcon } from '@components/index';
import Image from 'next/image';
import DLogo from '@public/images/DLogo2.png';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { IAuth, IUsersStatusArr, IAppCommon } from '@utils/types/commAndStoreTypes';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useChatUtil, useModal } from '@utils/hooks/customHooks';
import { modalUISize } from '@utils/constants/uiConstants';
import { CreateChatGroup, IndividualChatGroup } from '@components/customs';

import ChatSvg from '@styles/svg/chat.svg';

import IndividualChatUser from './IndividualChatUser';
import Style from './UserSidebar.module.scss';

interface IUnReadChatList {
	CONVERSATION_ID: string;
	USER_UID: string;
	GUBUN: 'private' | 'group';
}

const UserSidebar = ({
	iconLeft,
	usersStatusArr,
	groupChatArr,
}: {
	iconLeft: boolean;
	usersStatusArr: IUsersStatusArr[];
	groupChatArr: { CONVERSATION_ID: string; CONVERSATION_NAME: string; CNT: number }[];
}) => {
	const [isLogoBorderBottom, setIsLogoBorderBottom] = useState(false);
	const [userSearch, setUserSearch] = useState('');
	const { handleModal } = useModal();

	const cx = classNames.bind(Style);

	const router = useRouter();

	const authStore = useSelector((state: { auth: IAuth }) => state.auth);
	const appCommon = useSelector((state: { appCommon: IAppCommon }) => state.appCommon);

	const { init: initUnReadChatList, unReadArrAdd, unReadArrSlice } = useChatUtil();

	useEffect(() => {
		if (authStore && authStore.userUID) {
			axios
				.get(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/chat/getUnreadChatNoti`, {
					params: { fromUID: authStore.userUID },
				})
				.then((response) => {
					const resData = response.data.unReadList.map((item: IUnReadChatList) => {
						if (item.GUBUN === 'private') {
							return item.USER_UID;
						} else {
							return item.CONVERSATION_ID;
						}
					});

					initUnReadChatList(resData);
				})
				.catch((err) => {
					toast['error'](<>{'읽지 않은 메시지알림을 불러오지 못했습니다'}</>);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authStore]);

	useEffect(() => {
		const socket = authStore.userSocket;

		socket?.on('newMessageReceivedSidebar', ({ fromUID }: { fromUID: string }) => {
			if (fromUID !== appCommon.currentChatUser && fromUID) {
				unReadArrAdd(fromUID);
			} else {
				unReadArrSlice(fromUID);
			}
		});

		// TODO change the logic
		socket?.on('newMessageGroupReceivedSidebar', ({ fromUID }: { fromUID: string }) => {
			if (fromUID !== appCommon.currentChatGroup && fromUID) {
				unReadArrAdd(fromUID);
			} else {
				unReadArrSlice(fromUID);
			}
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appCommon.currentChatUser, authStore.userSocket]);

	const createChatRoom = useCallback(() => {
		handleModal({
			modalOpen: true,
			modalContent: <CreateChatGroup usersStatusArr={usersStatusArr} authStore={authStore} />,
			modalSize: modalUISize.SMALL,
			modalIsBasic: false,
		});
	}, [authStore, handleModal, usersStatusArr]);

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
							<SharpDivider className={Style['adminDivider']} content="*운영자*" />

							<div className={Style['usersAdmin']}>
								{usersStatusArr
									.filter((obj) => Number(obj.USER_ADMIN_YN))
									.map((item, idx: number) => (
										<IndividualChatUser
											key={`admin_${idx}`}
											onlineStatus={item.ONLINE_STATUS}
											userUID={item.USER_UID}
											userName={item.USER_NM}
											userTitle={item.USER_TITLE}
											userImg={item.USER_IMG_URL}
											userAdminYN={item.USER_ADMIN_YN}
											newMsgNoti={appCommon.unReadMsg.includes(item.USER_UID)}
										/>
									))}
							</div>

							<SharpDivider content="그룹채팅" />

							<div className={Style['groupChat']}>
								{groupChatArr.map((item, idx) => {
									return (
										<IndividualChatGroup
											key={`IndividualChatGroup_${idx}`}
											chatUID={item.CONVERSATION_ID}
											chatName={item.CONVERSATION_NAME}
											cnt={item.CNT}
											newMsgNoti={appCommon.unReadMsg.includes(
												item.CONVERSATION_ID,
											)}
										/>
									);
								})}
							</div>

							<SharpDivider content="온라인" />

							<div className={Style['usersOnline']}>
								{usersStatusArr
									.filter(
										(obj) =>
											obj.USER_NM.includes(userSearch || '') &&
											!Number(obj.USER_ADMIN_YN),
									)
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
													userAdminYN={item.USER_ADMIN_YN}
													newMsgNoti={appCommon.unReadMsg.includes(
														item.USER_UID,
													)}
												/>
											),
									)}
							</div>

							<SharpDivider content="오프라인" />

							<div className={Style['usersOffline']}>
								{usersStatusArr
									.filter(
										(obj) =>
											obj.USER_NM.includes(userSearch || '') &&
											!Number(obj.USER_ADMIN_YN),
									)
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
													newMsgNoti={appCommon.unReadMsg.includes(
														item.USER_UID,
													)}
												/>
											),
									)}
							</div>
						</div>
					</div>
					<div className={Style['createChatRoom']}>
						<ChatSvg />
						<span onClick={createChatRoom}>대화방 만들기</span>
					</div>
				</>
			)}
		</div>
	);
};

export default UserSidebar;
