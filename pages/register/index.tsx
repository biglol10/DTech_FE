import Image from 'next/image';
import { Label, RegisterStepOne, RegisterStepTwo, Button } from '@components/index';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import React, { useState, useRef } from 'react';
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
			team: 'TMN0000002',
			title: data.titleInputValue,
			phonenum: data.phoneNumValue,
		});
		console.log('step2');
		console.log(registerData);

		setStepNum(3);
	};

	const clickRegister = () => {
		axios.post('http://localhost:3066/api/auth/registerUser', registerData).then((res: any) => {
			console.log(res.data);
		});
	};

	const registerStepOne = (
		<div className={Style['loginMainRight']}>
			<Label
				content="회원가입"
				iconOrImage="image"
				nextImage={<Image src={DLogo} width={48} height={48} />}
				size="massive"
			/>
			{stepNum === 1 && <RegisterStepOne propFunction={getStepOneData} />}
			{stepNum === 2 && <RegisterStepTwo propFunction={getStepTwoData} />}
			{stepNum === 3 && (
				<Button
					className={Style['registerButton']}
					content="회원가입"
					size="large"
					color="google plus"
					buttonType="none"
					onClick={clickRegister}
				/>
			)}

			{/* <InputDefault
						id="inputId"
						placeholder="type text"
						onChange={getInputData}
						value={data}
					/>
					<h3>{data}</h3> */}
			{/* <Button content="SEND" onClick={sendData} /> */}
			{/* {resData.map((item: any) => (
						<h4 key={item.id}>
							{item.id} {item.name} {item.now}
						</h4>
					))} */}
		</div>
	);

	return (
		<div className={cx('loginDiv')}>
			<main className={cx('loginMain')}>{registerStepOne}</main>
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
