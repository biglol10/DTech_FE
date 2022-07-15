import { useState } from 'react';
import { TextArea } from 'semantic-ui-react';

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { Label, Button } from '@components/index';

import classNames from 'classnames/bind';
import Style from './RegisterComp.module.scss';

const RegisterStepThree = (props: any) => {
	const cx = classNames.bind(Style);
	const [detail, setDetail] = useState('');

	const clickRegister = () => {
		console.log('clickRegister');
		props.clickFunction({ detail, goNext: true });
	};
	const clickPrev = () => {
		console.log('clickPrev2');
		props.clickFunction({ goNext: false });
	};

	return (
		<>
			<div style={inputElCommStyle(0, 'left', true)}>
				<Label content="회원님을 소개해 주세요." size="big" />
				<TextArea
					placeholder="관심 기술, 경험 프로젝트 등.."
					className={cx('registerTextarea')}
					onChange={(e, { value }: any) => {
						console.log(value);
						setDetail(value);
					}}
				/>
				<div className={Style['buttonBelow']}>
					<Button
						className={Style['registerButton']}
						content="이전"
						size="large"
						color="google plus"
						buttonType="none"
						onClick={clickPrev}
					/>
					<Button
						className={Style['registerButton']}
						content="회원가입"
						size="large"
						color="google plus"
						buttonType="none"
						onClick={clickRegister}
					/>
				</div>
			</div>
		</>
	);
};

export default RegisterStepThree;
