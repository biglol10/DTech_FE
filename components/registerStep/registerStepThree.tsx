import { useState } from 'react';
import { TextArea } from 'semantic-ui-react';

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { Label, Button } from '@components/index';

import classNames from 'classnames/bind';
import Style from './Register.module.scss';

const RegisterStepThree = (props: any) => {
	const cx = classNames.bind(Style);
	const [detail, setDetail] = useState('');

	const clickRegister = () => {
		console.log('clickRegister');
		props.clickFunction({ detail });
	};

	return (
		<>
			<div className={cx('idInputDiv')} style={inputElCommStyle(0, 'left', true)}>
				<Label content="회원님을 소개해 주세요." size="big" />
				<TextArea
					placeholder="관심 기술, 경험 프로젝트 등.."
					className={cx('registerTextarea')}
					onChange={(e, { value }: any) => {
						console.log(value);
						setDetail(value);
					}}
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
		</>
	);
};

export default RegisterStepThree;
