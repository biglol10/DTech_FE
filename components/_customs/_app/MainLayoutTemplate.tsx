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
 ********************************************************************************************/

import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from '@components/index';
import { Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import cookie from 'js-cookie';
import { useSocket } from '@utils/hooks/customHooks';
import axios from 'axios';
import { IAuth, IAppCommon, IUsersStatusArr } from '@utils/types/commAndStoreTypes';
import _ from 'lodash';

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

			document.addEventListener('mousedown', clickSettingOutside);
			return () => {
				document.removeEventListener('mousedown', clickSettingOutside);
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
					const onlineUsersArr = users.map((item) => item.userId);

					if (!_.isEqual(connectedUsersRef.current, onlineUsersArr)) {
						connectedUsersRef.current = onlineUsersArr;
						setOnlineUsers(onlineUsersArr);
					}
				},
			);
		}
		// 다른 dependency 추가하면 connectedUsers가 여러번 찍힘... 딱히 문제는 없지만 최소한으로 작동하는게 목적
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authStore]);

	useEffect(() => {
		axios
			.get('http://localhost:3066/api/auth/getUsersStatus', {
				params: { onlineUsers: onlineUsers.length > 0 ? onlineUsers : ['none'] },
				// headers: { Authorization: authStore.userToken },
			})
			.then((response) => {
				setUsersStatusArr(response.data.usersStatus);
			})
			.catch((err) => {});
	}, [dispatch, onlineUsers]);

	const logout = () => {
		disconnect();
		dispatch({
			type: 'AUTH_RESET',
		});
		cookie.remove('token');
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
							<img src="https://i.ibb.co/L8D5T60/light.png" />
							<img src="https://i.ibb.co/zmDbMVZ/diamond.png" />
							<img src="https://i.ibb.co/W5QZ9Fk/envelope.png" />
							<img src="https://i.ibb.co/CnKDBxC/flask.png" />
							<img src="https://i.ibb.co/MGs4Fyn/sent-mail.png" />
							<img src="https://i.ibb.co/zGtDpcp/map.png" />
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
										`${appCommon.route.currentRoute === 'chatPage' && 'active'}`
									]
								}
								onClick={() => router.push('/chat/sdafadsf')}
							>
								<a>채팅</a>
							</li>
							<li
								className={
									Style[
										`${
											appCommon.route.currentRoute === 'examplePage' &&
											'active'
										}`
									]
								}
							>
								<a>게시판</a>
							</li>
							<li
								className={
									Style[`${appCommon.route.currentRoute === 'about' && 'active'}`]
								}
							>
								<a>About</a>
							</li>
							<li
								id="li_userSettingArea"
								onClick={() => setSettingOpen(!settingOpen)}
							>
								<Avatar
									id="userSettingArea"
									color="white"
									content={authStore.userName}
									imageSize="mini"
									labelSize="big"
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
								});
							} else {
								return el;
							}
						})}
					</main>
				</div>
			</div>
		</>
	);
};

export default MainLayoutTemplate;
