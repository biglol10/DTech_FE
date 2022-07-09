import { useState } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import { InputLayout, InputWithIcon, InputDefault, Button } from '@components/index';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import Style from './Register.module.scss';

const RegisterStepTwo = (props: any) => {
	const cx = classNames.bind(Style);
	const labelSize = 'h4';

	const [teamInputValue, setTeamInputValue] = useState('');
	const [titleInputValue, setTitleInputValue] = useState('');
	const [phoneNumValue, setPhoneNumValue] = useState('');

	const clickNext = () => {
		console.log('clickNext2');
		props.propFunction({ teamInputValue, titleInputValue, phoneNumValue });
	};

	const getTeamList = () => {
		console.log(process.env.BK_SRVR_URL);
	};

	return (
		<>
			<div className={cx('idInputDiv')}>
				{/* 팀, 직급, 핸드폰번호*/}
				<InputLayout
					stretch={true}
					inputLabel="팀"
					inputLabelSize={labelSize}
					showInputLabel={true}
					autoFitErrorLabel={true}
					spacing={2}
				>
					<InputDefault
						id="inputId"
						placeholder="팀을 입력해주세요."
						value={teamInputValue}
						size="large"
						onChange={(obj: { value: string }) => {
							setTeamInputValue(obj.value);
						}}
						className={Style['inputIdField']}
					/>
				</InputLayout>
				<InputLayout
					stretch={true}
					inputLabel="직급"
					inputLabelSize={labelSize}
					showInputLabel={true}
					autoFitErrorLabel={true}
					spacing={2}
				>
					<InputDefault
						id="inputId"
						placeholder="직급을 입력해주세요."
						value={titleInputValue}
						size="large"
						onChange={(obj: { value: string }) => {
							setTitleInputValue(obj.value);
						}}
						className={Style['inputIdField']}
					/>
				</InputLayout>
				<InputLayout
					stretch={true}
					inputLabel="전화번호"
					inputLabelSize={labelSize}
					showInputLabel={true}
					autoFitErrorLabel={true}
					spacing={2}
				>
					<InputDefault
						id="inputId"
						placeholder="전화번호를 입력해주세요."
						value={phoneNumValue}
						size="large"
						onChange={(obj: { value: string }) => {
							setPhoneNumValue(obj.value);
						}}
						className={Style['inputIdField']}
					/>
				</InputLayout>
				<Button
					className={Style['registerButton']}
					content="다음"
					size="large"
					color="google plus"
					buttonType="none"
					onClick={clickNext}
				/>
			</div>
		</>
	);
};

export default RegisterStepTwo;
