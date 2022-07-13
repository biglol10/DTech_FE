import React, { useState } from 'react';
import { InputLayout, InputDefault } from '@components/index';
import Image from 'next/image';
import DLogo from '@public/images/DLogo2.png';
import { Icon, Image as SemanticUIImage } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import Style from './MainLayoutTemplate.module.scss';

interface LayoutProps {
	children: React.ReactNode;
}

const MainLayoutTemplate = ({ children }: LayoutProps) => {
	const cx = classNames.bind(Style);

	const [userSearch, setUserSearch] = useState('');
	const [isLogoBorderBottom, setIsLogoBorderBottom] = useState(false);
	const [iconLeft, setIconLeft] = useState(true);

	const noProfileImage =
		'data:image/png;base64,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';

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
									}}
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
										<div className={Style['divider']}>
											<span></span>
											<span>온라인</span>
											<span></span>
										</div>

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

										<div className={Style['divider']}>
											<span></span>
											<span>오프라인</span>
											<span></span>
										</div>

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
						<ul>
							<li className={Style['active']}>
								<a href="#home">대시보드</a>
							</li>
							<li>
								<a href="#news">채팅</a>
							</li>
							<li>
								<a href="#contact">게시판</a>
							</li>
							<li>
								<a href="#about">About</a>
							</li>
							<li>
								<SemanticUIImage src={noProfileImage} avatar />
								<span>Username</span>
							</li>
						</ul>
					</nav>
					<main className={Style['mainContent']}>{children}</main>
				</div>
			</div>
		</>
	);
};

export default MainLayoutTemplate;
