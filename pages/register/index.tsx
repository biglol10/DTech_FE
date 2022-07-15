import Image from 'next/image';
import { Label } from '@components/index';
import { RegisterStepOne, RegisterStepTwo, RegisterStepThree } from '@components/customs';
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
		setStepNum(2);
	};
	const getStepTwoData = (data: any) => {
		setRegisterData({
			...registerData,
			team: data.teamSelectValue,
			title: data.titleSelectValue,
			phonenum: data.phoneNumValue,
		});
		if (data.goNext) {
			setStepNum((prev) => prev + 1);
		} else {
			setStepNum((prev) => prev - 1);
		}
	};

	const clickRegister = (data: any) => {
		if (data.goNext) {
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
		} else {
			setStepNum((prev) => prev - 1);
		}
	};

	const registerStep = (
		<div className={cx('loginMainCenter')}>
			<Label
				content="회원가입"
				iconOrImage="image"
				nextImage={<Image src={DLogo} width={48} height={48} />}
				size="massive"
			/>
			<Stepper activeStep={stepNum - 1} alternativeLabel className={cx('registerStepper')}>
				<Step key="1">
					<StepLabel></StepLabel>
				</Step>
				<Step key="2">
					<StepLabel></StepLabel>
				</Step>
				<Step key="3">
					<StepLabel></StepLabel>
				</Step>
			</Stepper>
			{stepNum === 1 && (
				<RegisterStepOne propFunction={getStepOneData} registerData={registerData} />
			)}
			{stepNum === 2 && (
				<RegisterStepTwo propFunction={getStepTwoData} registerData={registerData} />
			)}
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
