import Image from 'next/image';
import { Label, RegisterStepOne, RegisterStepTwo, RegisterStepThree } from '@components/index';
import { Stepper, Step, StepLabel } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import DLogo from '@public/images/DLogo2.png';
import Style from './Register.module.scss';

const RegisterPage = (props: any) => {
	const cx = classNames.bind(Style);
	const [stepNum, setStepNum] = useState(1);
	const [registerData, setRegisterData] = useState({});

	const getStepOneData = (data: any) => {
		setRegisterData({
			...registerData,
			user_id: data.idInputValue,
			name: data.nameInputValue,
			passwd: data.pwInputValue,
		});
		console.log('step1');
		console.log(registerData);
		setStepNum(2);
	};
	const getStepTwoData = (data: any) => {
		setRegisterData({
			...registerData,
			team: data.teamSelectValue,
			title: data.titleSelectValue,
			phonenum: data.phoneNumValue,
		});
		console.log('step2');
		console.log(registerData);

		setStepNum(3);
	};

	const clickRegister = (data: any) => {
		console.log(data);
		setRegisterData({
			...registerData,
			detail: data.detail,
		});

		console.log({ ...registerData, detail: data.detail });
		axios
			.post('http://localhost:3066/api/auth/registerUser', {
				...registerData,
				detail: data.detail,
			})
			.then((res: any) => {
				console.log(res.data);
			});
	};

	const registerStep = (
		<div className={Style['loginMainRight']}>
			<Label
				content="회원가입"
				iconOrImage="image"
				nextImage={<Image src={DLogo} width={48} height={48} />}
				size="massive"
			/>
			<Stepper activeStep={stepNum - 1} alternativeLabel>
				<Step key="1">
					<StepLabel>one</StepLabel>
				</Step>
				<Step key="2">
					<StepLabel>two</StepLabel>
				</Step>
				<Step key="3">
					<StepLabel>three</StepLabel>
				</Step>
			</Stepper>
			{stepNum === 1 && <RegisterStepOne propFunction={getStepOneData} />}
			{stepNum === 2 && <RegisterStepTwo propFunction={getStepTwoData} />}
			{stepNum === 3 && <RegisterStepThree clickFunction={clickRegister} />}
		</div>
	);

	return (
		<div className={cx('loginDiv')}>
			<main className={cx('loginMain')}>{registerStep}</main>
		</div>
	);
};

// export const getServerSideProps = async (context: any) => {
// 	// console.log(context);
// 	// console.log(context.req.cookies);

// 	const axiosData = await axios.get('http://localhost:3066/api/register/get').then((response) => {
// 		if (response) {
// 			return response.data;
// 		}
// 	});

// 	return { props: { axiosData } };
// };

export default RegisterPage;
