import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Button, InputDefault, Label, InputLayout, InputWithIcon } from '@components/index';
import { Icon } from 'semantic-ui-react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import Style from './Register.module.scss';

const RegisterStepOne = (props: any) => {
	const regEmail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	const labelSize = 'h4';

	const cx = classNames.bind(Style);
	const [idInputValue, setIdInputValue] = useState('');
	const [idInputError, setIdInputError] = useState(false);
	const [nameInputValue, setNameInputValue] = useState('');
	const [nameInputError, setNameInputError] = useState(false);
	const [pwInputValue, setPwInputValue] = useState('');
	const [pwInputError, setPwInputError] = useState(false);
	const [pw2InputValue, setPw2InputValue] = useState('');
	const [pw2InputError, setPw2InputError] = useState(false);

	const [idCheckMsg, setIdCheckMsg] = useState('중목확인 버튼을 클릭하세요');
	const [idConfirm, setIdConfirm] = useState(false);

	const userIdRef = useRef<any>();
	const userPwRef = useRef<any>();

	const clickNext = () => {
		console.log('clickNext');
		props.propFunction({ idInputValue, nameInputValue, pwInputValue });
	};

	useEffect(() => {
		getTeamList();
	});
	const getTeamList = () => {
		console.log('getTeamList');
		console.log(process.env.BK_SRVR_URL);
	};

	const idCheck = () => {
		axios
			.post('http://localhost:3066/api/auth/idCheck', { userId: idInputValue })
			.then((res: any) => {
				console.log(res.data);
				if (res.data.result === 'success') {
					if (res.data.foundId) {
						setIdCheckMsg('이미 등록된 아이디');
						setIdConfirm(true);
					} else {
						setIdCheckMsg('아이디 사용 가능');
						setIdConfirm(true);
					}
				}
			});
	};

	// const clickNext = () => {
	// 	if(idInputError&&nameInputError&&pwInputError&&pw2InputError&&idConfirm){

	// 	}
	// }

	return (
		<>
			<div className={cx('idInputDiv')}>
				<InputLayout
					error={idInputError}
					errorMsg="아이디를 올바로 입력해 주세요"
					stretch={true}
					inputLabel="아이디"
					inputLabelSize={labelSize}
					showInputLabel={true}
					autoFitErrorLabel={true}
					spacing={2}
				>
					<InputWithIcon
						id="inputId"
						ref={userIdRef}
						placeholder="아이디를 입력해주세요 (이메일)"
						value={idInputValue}
						size="large"
						onChange={(obj: { value: string }) => {
							console.log(obj.value);
							setIdConfirm(false);
							// setIdCheckMsg('중복확인 버튼을 클릭하세요2');
							setIdInputValue(obj.value);
							obj.value.length !== 0 && setIdInputError(!regEmail.test(obj.value));
						}}
						className={Style['inputIdField']}
						inputIcon={<Icon name="user" />}
						onEnter={() => userPwRef.current && userPwRef.current.focus()}
					/>
				</InputLayout>
				<Button
					className={Style['registerButton']}
					content="중복확인"
					size="large"
					color="google plus"
					buttonType="none"
					onClick={idCheck}
				/>
				{idCheckMsg}
			</div>

			<InputLayout
				error={nameInputError}
				errorMsg="아이디를 올바로 입력해주세요"
				stretch={true}
				inputLabel="이름"
				inputLabelSize={labelSize}
				showInputLabel={true}
				autoFitErrorLabel={true}
				spacing={2}
			>
				<InputWithIcon
					id="inputId"
					ref={userIdRef}
					placeholder="이름을 입력해주세요."
					value={nameInputValue}
					size="large"
					onChange={(obj: { value: string }) => {
						setNameInputValue(obj.value);
					}}
					className={Style['inputIdField']}
					inputIcon={<Icon name="user" />}
					onEnter={() => userPwRef.current && userPwRef.current.focus()}
				/>
			</InputLayout>
			<InputLayout
				error={pwInputError}
				errorMsg="비밀번호는 최소 6자리입니다"
				stretch={true}
				inputLabel="비밀번호"
				inputLabelSize={labelSize}
				showInputLabel={true}
				autoFitErrorLabel={true}
				spacing={2}
			>
				<InputWithIcon
					id="inputPw"
					ref={userPwRef}
					placeholder="비밀번호를 입력해주세요"
					value={pwInputValue}
					size="large"
					onChange={(obj: { value: string }) => {
						setPwInputValue(obj.value);

						if (obj.value.length !== 0) {
							const pwRegex = /^.{6,30}$/;

							setPwInputError(!pwRegex.test(obj.value));
						}
					}}
					className={Style['inputPwField']}
					inputIcon={<Icon name="lock" />}
					type="password"
				/>
			</InputLayout>
			<InputLayout
				error={pw2InputError}
				errorMsg="비밀번호가 일치하지 않습니다"
				stretch={true}
				inputLabel="비밀번호 확인"
				inputLabelSize={labelSize}
				showInputLabel={true}
				autoFitErrorLabel={true}
				spacing={7}
			>
				<InputWithIcon
					id="inputPw2Confirm"
					ref={userPwRef}
					placeholder="비밀번호를 입력해주세요"
					value={pw2InputValue}
					size="large"
					onChange={(obj: { value: string }) => {
						setPw2InputValue(obj.value);

						if (obj.value.length !== 0) {
							setPw2InputError(pwInputValue !== pw2InputValue);
						}
					}}
					className={Style['inputPwField']}
					inputIcon={<Icon name="lock" />}
					type="password"
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
		</>
	);
};

export default RegisterStepOne;
