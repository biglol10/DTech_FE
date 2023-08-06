/** ****************************************************************************************
 * @설명 : 회원가입 페이지
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-07-20     feature/BY/register        최초작성
 ********************************************************************************************/

import Image from 'next/image';
import { Label } from '@components/index';
import { RegisterStep1, RegisterStep2, RegisterStep3, RegisterStep4, RegisterStep5, RegisterResult } from '@components/customs';
import { Stepper, Step, StepLabel } from '@mui/material';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import DLogo from '@public/images/DLogo2.png';
import Style from './Register.module.scss';

const RegisterPage = (props: any) => {
	const cx = classNames.bind(Style);
	const [stepNum, setStepNum] = useState(1);
	const [resultData, setResultData] = useState({});

	const goNextFunc = (data: any) => {
		if (stepNum === 5) {
			setResultData(data.registerResult);
		}
		if (data.goNext) {
			setStepNum((prev) => prev + 1);
		} else {
			setStepNum((prev) => prev - 1);
		}
	};

	const registerStep = (
		<div className={cx('loginMainCenter')}>
			<Label content="회원가입" iconOrImage="image" nextImage={<Image src={DLogo} width={48} height={48} />} size="massive" />
			{stepNum < 6 && (
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
					<Step key="4">
						<StepLabel></StepLabel>
					</Step>
					<Step key="5">
						<StepLabel></StepLabel>
					</Step>
				</Stepper>
			)}

			{stepNum === 1 && <RegisterStep1 propFunction={goNextFunc} />}
			{stepNum === 2 && <RegisterStep2 propFunction={goNextFunc} />}
			{stepNum === 3 && <RegisterStep3 propFunction={goNextFunc} />}
			{stepNum === 4 && <RegisterStep4 propFunction={goNextFunc} />}
			{stepNum === 5 && <RegisterStep5 propFunction={goNextFunc} />}
			{stepNum === 6 && <RegisterResult resultData={resultData} />}
		</div>
	);

	return (
		<div className={cx('loginDiv')}>
			<main className={cx('loginMain')}>{registerStep}</main>
		</div>
	);
};

export default RegisterPage;
