/** ****************************************************************************************
 * @설명 : App layout
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-07-13   feature/JW/layout           최초작성
 * 2      변지욱     2022-07-14   feature/JW/layoutchange     세팅팝업 추가 및 세팅영역 밖 클릭 시 세팅팝업 숨김처리
 * 3      변지욱     2022-08-18   feature/JW/socket           Socket으로 온라인 오프라인 유저 표시
 * 4      변지욱     2022-08-18   feature/JW/socket           온라인 유저 props로 전달
 * 5      변지욱     2022-08-27   feature/JW/layout           text변경에 따른 리랜더링 이상현상 해결
 * 6      변지욱     2022-08-29   feature/JW/layoutchat       신규로 가입한 사람이 있을 경우 socket event 받도록 함
 * 7      변지욱     2022-09-08   feature/JW/chatPage         Admin인 사람들은 따로 표시
 ********************************************************************************************/

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Avatar } from '@components/index';
import { Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import cookie from 'js-cookie';
import { useSocket } from '@utils/hooks/customHooks';
import axios from 'axios';
import { IAuth, IAppCommon, IUsersStatusArr } from '@utils/types/commAndStoreTypes';
import _ from 'lodash';
import { generateAvatarImage } from '@utils/appRelated/helperFunctions';
import * as RCONST from '@utils/constants/reducerConstants';

import GraphSvg from '@styles/svg/graph.svg';
import ChatSvg from '@styles/svg/chat.svg';
import CodingSvg from '@styles/svg/coding.svg';
import AboutSvg from '@styles/svg/about.svg';
import ProfileSvg from '@styles/svg/profile.svg';

import UserSidebar from './UserSidebar';
import Style from './MainLayoutTemplate.module.scss';

interface LayoutProps {
	children: React.ReactNode;
}

const MainLayoutTemplate = ({ children }: LayoutProps) => {
	const router = useRouter();

	const [iconLeft, setIconLeft] = useState(true);
	const [settingOpen, setSettingOpen] = useState(false);
	const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
	const [usersStatusArr, setUsersStatusArr] = useState<IUsersStatusArr[]>([]);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const connectedUsersRef = useRef<any>([]);
	const usersStatusArrRef = useRef<any>([]);

	const authStore = useSelector((state: { auth: IAuth }) => state.auth);
	const appCommon = useSelector((state: { appCommon: IAppCommon }) => state.appCommon);

	const { init: initSocket, disconnect } = useSocket();

	const dispatch = useDispatch();

	useEffect(() => {
		if (wrapperRef) {
			const clickSettingOutside = (event: any) => {
				if (
					wrapperRef.current &&
					!wrapperRef.current.contains(event.target) &&
					event.target.parentElement.id !== 'userSettingArea' &&
					event.target.parentElement.id !== 'userSettingAreaUL' &&
					event.target.parentElement.id !== 'li_userSettingArea'
				) {
					setSettingOpen(false);
				}
			};

			document.addEventListener('mousedown', clickSettingOutside, { capture: true });
			return () => {
				document.removeEventListener('mousedown', clickSettingOutside, { capture: true });

				cookie.remove('currentChatUser');
			};
		}
	}, []);

	useEffect(() => {
		const socket = authStore.userSocket;

		if (!socket) {
			initSocket(authStore.userId);
		} else {
			socket.on(
				'connectedUsers',
				({ users }: { users: { userId: string; socketId: string }[] }) => {
					const onlineUsersArr = users
						// .filter((item) => item.userId !== authStore.userId)
						.map((item2) => item2.userId);

					if (!_.isEqual(connectedUsersRef.current, onlineUsersArr)) {
						connectedUsersRef.current = onlineUsersArr;
						setOnlineUsers(onlineUsersArr);
					}
				},
			);

			socket.on('newUserCreated', () => getUsersStatus());
		}
		// 다른 dependency 추가하면 connectedUsers가 여러번 찍힘... 딱히 문제는 없지만 최소한으로 작동하는게 목적
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authStore]);

	const getUsersStatus = useCallback(() => {
		axios
			.get(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/auth/getUsersStatus`, {
				params: { onlineUsers: onlineUsers.length > 0 ? onlineUsers : ['none'] },
				// headers: { Authorization: authStore.userToken },
			})
			.then((response) => {
				const stateEqual = _.isEqual(usersStatusArrRef.current, response.data.usersStatus);

				if (!stateEqual) {
					usersStatusArrRef.current = response.data.usersStatus;
					setUsersStatusArr(response.data.usersStatus);
				}
			})
			.catch((err) => {});
	}, [onlineUsers]);

	useEffect(() => {
		getUsersStatus();
	}, [getUsersStatus]);

	const logout = () => {
		disconnect();
		dispatch({
			type: RCONST.AUTH_RESET,
		});
		cookie.remove('token');
		cookie.remove('currentChatUser');
		router.push('/login');
	};

	return (
		<>
			<div className={Style['mainLayout']}>
				<div className={Style['left']}>
					<nav className={Style['sidebar']}>
						<div>
							<Icon
								name={`angle double ${iconLeft ? 'left' : 'right'}`}
								size="big"
								onClick={() => setIconLeft(!iconLeft)}
							/>
						</div>
						<div className={Style['wrapper']}>
							<GraphSvg onClick={() => router.push('/dashboard')} />
							<ChatSvg onClick={() => router.push('/chat/chatArea')} />
							<CodingSvg onClick={() => router.push('/board')} />
							<AboutSvg onClick={() => router.push('/about')} />
							<ProfileSvg />
							{/* <img src="https://i.ibb.co/L8D5T60/light.png" />
							<img src="https://i.ibb.co/zmDbMVZ/diamond.png" />
							<img src="https://i.ibb.co/W5QZ9Fk/envelope.png" />
							<img src="https://i.ibb.co/CnKDBxC/flask.png" />
							<img src="https://i.ibb.co/MGs4Fyn/sent-mail.png" />
							<img src="https://i.ibb.co/zGtDpcp/map.png" /> */}
						</div>
					</nav>
					<UserSidebar iconLeft={iconLeft} usersStatusArr={usersStatusArr} />
				</div>
				<div className={Style['right']}>
					<nav className={Style['navHeader']}>
						<ul id="userSettingAreaUL">
							<li
								className={
									Style[
										`${
											appCommon.route.currentRoute === 'dashboard' && 'active'
										}`
									]
								}
								onClick={() => router.push('/dashboard')}
							>
								<a>대시보드</a>
							</li>
							<li
								className={
									Style[
										`${
											['chatPage', 'chatMainPage'].includes(
												appCommon.route.currentRoute as string,
											) && 'active'
										}`
									]
								}
								onClick={() => router.push('/chat/chatArea')}
							>
								<a>채팅</a>
							</li>
							<li
								className={
									Style[`${appCommon.route.currentRoute === 'board' && 'active'}`]
								}
								onClick={() => router.push('/board')}
							>
								<a>게시판</a>
							</li>
							<li
								className={
									Style[`${appCommon.route.currentRoute === 'about' && 'active'}`]
								}
								onClick={() => router.push('/about')}
							>
								<a>About</a>
							</li>
							<li
								id="li_userSettingArea"
								onClick={() => setSettingOpen(!settingOpen)}
							>
								<Avatar
									id="userSettingArea"
									fontColor="white"
									content={authStore.userName}
									imageSize="mini"
									labelSize="big"
									svgColor="white"
									src={
										authStore.userProfileImg ||
										generateAvatarImage(authStore.userUID)
									}
								/>
							</li>
						</ul>
					</nav>
					{settingOpen && (
						<div ref={wrapperRef} className={Style['settingPopup']}>
							<div>
								<Icon name="user circle" />내 프로필 보기
							</div>
							<hr className={Style['menu-separator']} />
							<div>
								<Icon name="setting" />내 설정
							</div>
							<hr className={Style['menu-separator']} />
							<div>
								<Icon name="mail" />
								건의사항 남기기
							</div>
							<hr className={Style['menu-separator']} />
							<div onClick={() => logout()}>
								<Icon name="user close" />
								로그아웃
							</div>
						</div>
					)}

					<main className={Style['mainContent']}>
						{React.Children.map(children, (el: any) => {
							if (el.type.displayName === 'chatPage') {
								return React.cloneElement(el, {
									usersStatusArr: usersStatusArr.filter(
										(item) => item.ONLINE_STATUS === 'ONLINE',
									),
									userToken: authStore.userToken,
								});
							} else {
								return React.cloneElement(el, {
									userToken: authStore.userToken,
								});
							}
						})}
					</main>
				</div>
			</div>
		</>
	);
};

export default React.memo(MainLayoutTemplate);
