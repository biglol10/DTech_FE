import Image from 'next/image';
import { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import LeftBackground1 from '@public/background/loginLeft.png';
import LeftBackground2 from '@public/background/loginLeft2.png';
import Style from './Login.module.scss';

const Login = () => {
	const leftBackground = [LeftBackground1, LeftBackground2];

	const [leftBackgroundIndex, setLeftBackgroundIndex] = useState(0);

	return (
		<div className={Style['loginDiv']}>
			<main className={Style['loginMain']}>
				<div
					className={Style['loginMainLeft']}
					style={{ backgroundImage: `url(${leftBackground[leftBackgroundIndex].src})` }}
				>
					<aside className={Style['loginBottomAside']}>
						<Icon
							name="arrow alternate circle left outline"
							size="huge"
							className={Style['loginBottomAside_icon']}
							style={{
								'--iconColor': `${leftBackgroundIndex === 1 ? 'black' : 'white'}`,
							}}
							onClick={() =>
								setLeftBackgroundIndex((prev) => {
									if (prev - 1 < 0) {
										return leftBackground.length - 1;
									} else {
										return prev - 1;
									}
								})
							}
						/>
						<Icon
							name="arrow alternate circle right outline"
							size="huge"
							className={Style['loginBottomAside_icon']}
							onClick={() =>
								setLeftBackgroundIndex((prev) => {
									if (prev + 1 > leftBackground.length - 1) {
										return 0;
									} else {
										return prev + 1;
									}
								})
							}
							style={{
								'--iconColor': `${leftBackgroundIndex === 1 ? 'black' : 'white'}`,
							}}
						/>
					</aside>
					{/* <Image src={leftPic} className={Style['loginMainLeftImage']}/> */}
				</div>
				<div style={{ backgroundColor: 'white', width: '35%', height: '80%' }}>
					asfd2222
				</div>
			</main>
		</div>
	);
};

export default Login;
