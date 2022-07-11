import { useState } from 'react';
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
					<div className={Style['sidebar']}>
						<div className={Style['wrapper']}>
							<img src="https://i.ibb.co/L8D5T60/light.png" />
							<img src="https://i.ibb.co/zmDbMVZ/diamond.png" />
							<img src="https://i.ibb.co/W5QZ9Fk/envelope.png" />
							<img src="https://i.ibb.co/CnKDBxC/flask.png" />
							<img src="https://i.ibb.co/MGs4Fyn/sent-mail.png" />
							<img src="https://i.ibb.co/zGtDpcp/map.png" />
						</div>
					</div>
					<div className={Style['sidebarChat']}>
						<div className={Style['chatLogo']}>
							<Image src={DLogo} width={48} height={48} /> Dtech App
						</div>
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

						<div className={Style['divider']}>
							<span></span>
							<span>Online</span>
							<span></span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
