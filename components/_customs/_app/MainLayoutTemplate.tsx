/** ****************************************************************************************
 * @설명 : App layout
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-07-13   feature/JW/layout           최초작성
 * 2      변지욱     2022-07-14   feature/JW/layoutchange     세팅팝업 추가 및 세팅영역 밖 클릭 시 세팅팝업 숨김처리
 ********************************************************************************************/

import React, { useState, useEffect, useRef } from 'react';
import { Avatar, InputLayout, InputDefault, SharpDivider } from '@components/index';
import Image from 'next/image';
import DLogo from '@public/images/DLogo2.png';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import cookie from 'js-cookie';
import Style from './MainLayoutTemplate.module.scss';

interface LayoutProps {
	children: React.ReactNode;
}

const MainLayoutTemplate = ({ children }: LayoutProps) => {
	const cx = classNames.bind(Style);

	const router = useRouter();

	const [userSearch, setUserSearch] = useState('');
	const [isLogoBorderBottom, setIsLogoBorderBottom] = useState(false);
	const [iconLeft, setIconLeft] = useState(true);
	const [settingOpen, setSettingOpen] = useState(false);

	const wrapperRef = useRef<any>(null);

	const authStore = useSelector((state: any) => state.auth);
	const appCommon = useSelector((state: any) => state.appCommon);

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

	const logout = () => {
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
					<div
						className={cx('sidebarChat', `${iconLeft ? 'showSidebar' : 'hideSidebar'}`)}
					>
						{iconLeft && (
							<>
								<div
									className={Style['chatLogo']}
									style={{
										borderBottom: `${
											isLogoBorderBottom ? '1px solid #999999' : 'none'
										}`,
										cursor: 'pointer',
									}}
									onClick={() => router.push('/')}
								>
									<Image src={DLogo} width={48} height={48} /> Dtech App
								</div>

								<div
									className={Style['chatArea']}
									onScroll={(e: any) =>
										setIsLogoBorderBottom(e.target.scrollTop > 20)
									}
								>
									<div className={Style['userSearch']}>
										<InputLayout
											stretch={true}
											inputLabel="사용자 검색"
											inputLabelSize="h5"
											showInputLabel={true}
											spacing={32}
										>
											<InputDefault
												id="userSearchInput"
												placeholder="사용자 검색"
												value={userSearch}
												size="small"
												onChange={(obj: { value: string }) => {
													setUserSearch(obj.value);
												}}
												className="userSearchInput"
											/>
										</InputLayout>
									</div>

									<div className={Style['usersInfo']}>
										<SharpDivider content="온라인" />

										<div className={Style['usersOnline']}>
											{Array(3)
												.fill(0)
												.map((item, idx) => (
													<div
														className={Style['folder-icons']}
														key={`online_${idx}`}
													>
														<div
															className={cx('user-avatar', 'online')}
														>
															<img src="https://randomuser.me/api/portraits/women/71.jpg" />
														</div>
														<div className={Style['username']}>
															User Online{idx}
														</div>
													</div>
												))}
										</div>

										<SharpDivider content="오프라인" />

										<div className={Style['usersOffline']}>
											{Array(20)
												.fill(0)
												.map((item, idx) => (
													<div
														className={Style['folder-icons']}
														key={`offline_${idx}`}
													>
														<div
															className={cx('user-avatar', 'offline')}
														>
															<img src="https://randomuser.me/api/portraits/women/71.jpg" />
														</div>
														<div className={Style['username']}>
															User Offline{idx}
														</div>
													</div>
												))}
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
				<div className={Style['right']}>
					<nav className={Style['navHeader']}>
						<ul id="userSettingAreaUL">
							<li
								className={
									Style[`${appCommon.currentRoute === 'dashboard' && 'active'}`]
								}
								onClick={() => router.push('/dashboard')}
							>
								<a>대시보드</a>
							</li>
							<li
								className={
									Style[`${appCommon.currentRoute === 'chat' && 'active'}`]
								}
								onClick={() => router.push('/chat/sdafadsf')}
							>
								<a>채팅</a>
							</li>
							<li
								className={
									Style[`${appCommon.currentRoute === 'examplePage' && 'active'}`]
								}
							>
								<a>게시판</a>
							</li>
							<li
								className={
									Style[`${appCommon.currentRoute === 'about' && 'active'}`]
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

					<main className={Style['mainContent']}>{children}</main>
				</div>
			</div>
		</>
	);
};

export default MainLayoutTemplate;
