import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import DLogo from '@public/images/DLogo2.png';
import { InputLayout, InputDefault } from '@components/index';
import Style from './index.module.scss';

const Index = () => {
	const [userSearch, setUserSearch] = useState('');

	return (
		<>
			<div className={Style['mainLayout']}>
				<div className={Style['left']}>
					<nav className={Style['sidebar']}>
						<div className={Style['wrapper']}>
							<img src="https://i.ibb.co/L8D5T60/light.png" />
							<img src="https://i.ibb.co/zmDbMVZ/diamond.png" />
							<img src="https://i.ibb.co/W5QZ9Fk/envelope.png" />
							<img src="https://i.ibb.co/CnKDBxC/flask.png" />
							<img src="https://i.ibb.co/MGs4Fyn/sent-mail.png" />
							<img src="https://i.ibb.co/zGtDpcp/map.png" />
						</div>
					</nav>
					<div className={Style['sidebarChat']}>
						<div className={Style['chatLogo']}>
							<Image src={DLogo} width={48} height={48} /> Dtech App
						</div>

						<div className={Style['chatArea']}>
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
												<div className={Style['user-avatar']}>
													<div className={Style['user-online']}></div>
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
												<div className={Style['user-avatar']}>
													<div className={Style['user-offline']}></div>
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
					</div>
				</div>
				<div className={Style['right']}></div>
			</div>
		</>
	);
};

export default Index;
