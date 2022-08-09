/** ****************************************************************************************
 * @설명 : 회원가입 Step1 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-07-20     feature/BY/register        최초작성
 ********************************************************************************************/

import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button, InputLayout, InputWithIcon } from '@components/index';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames/bind';

import Style from './RegisterComp.module.scss';

const RegisterStep1 = (props: any) => {
	const regEmail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	const labelSize = 'h5';

	const dispatch = useDispatch();
	const cx = classNames.bind(Style);

	const [idInputValue, setIdInputValue] = useState(
		useSelector((state: any) => state.register.idInputValue),
	);

	const [nameInputValue, setNameInputValue] = useState(
		useSelector((state: any) => state.register.nameInputValue),
	);

	const [pwInputValue, setPwInputValue] = useState(
		useSelector((state: any) => state.register.pwInputValue),
	);
	const [pwInput2Value, setPwInput2Value] = useState(
		useSelector((state: any) => state.register.pwInput2Value),
	);

	const userIdRef = useRef<any>();
	const userPwRef = useRef<any>();

	const clickNext = () => {
		dispatch({
			type: 'VALID_STEP1',
			idInputValue,
			setIdInputValue,
			nameInputValue,
			setNameInputValue,
			pwInputValue,
			setPwInputValue,
			pwInput2Value,
			setPwInput2Value,
			goNext: true,
			propFunction: props.propFunction,
		});
		// props.propFunction({ idInputValue, nameInputValue, pwInputValue, pw2InputValue });
	};

	const idCheck = () => {
		console.log('idCheck');
		dispatch({
			type: 'ID_CHECK',
			idInputValue,
			setIdInputValue,
		});
	};

	return (
		<>
			<InputLayout
				error={idInputValue.idInputError}
				errorMsg={idInputValue.idInputErrMsg}
				stretch={true}
				inputLabel="이메일*"
				inputLabelSize={labelSize}
				showInputLabel={true}
				autoFitErrorLabel={true}
				spacing={20}
			>
				<>
					<InputWithIcon
						id="inputId"
						ref={userIdRef}
						placeholder="이메일을 입력해주세요."
						value={idInputValue.idInputValue}
						size="large"
						onChange={(obj: { value: string }) => {
							let idInputError = idInputValue.idInputError;
							let idInputErrMsg = idInputValue.idInputErrMsg;
							let idConfirm = idInputValue.idConfirm;

							if (obj.value.length !== 0) {
								idInputError = !regEmail.test(obj.value);
								if (!regEmail.test(obj.value)) {
									idInputErrMsg = '이메일을 정확히 입력해 주세요';
								}
							}
							idConfirm = false;

							setIdInputValue({
								...idInputValue,
								idInputError,
								idInputErrMsg,
								idInputValue: obj.value,
								idConfirm,
							});
						}}
						className={Style['inputIdField']}
						inputIcon={<Icon name="user" />}
						onEnter={() => userPwRef.current && userPwRef.current.focus()}
					/>
					<Button
						className={cx('idCheckBtn')}
						content={idInputValue.idConfirm ? '사용가능!' : '중복확인'}
						size="large"
						color={idInputValue.idConfirm ? 'blue' : 'google plus'}
						buttonType="none"
						onClick={() => {
							if (regEmail.test(idInputValue.idInputValue)) {
								idCheck();
							}
						}}
					/>
				</>
			</InputLayout>

			<InputLayout
				error={nameInputValue.nameInputError}
				errorMsg="이름을 입력하세요."
				stretch={true}
				inputLabel="이름*"
				inputLabelSize={labelSize}
				showInputLabel={true}
				autoFitErrorLabel={true}
				// spacing={2}
			>
				<InputWithIcon
					id="inputId"
					ref={userIdRef}
					placeholder="이름을 입력해주세요."
					value={nameInputValue.nameInputValue}
					size="large"
					onChange={(obj: { value: string }) => {
						let tempNameInputError = nameInputValue.nameInputError;

						if (obj.value.length !== 0) {
							// setNameInputError(false);
							tempNameInputError = false;
						}
						setNameInputValue({
							...nameInputValue,
							nameInputValue: obj.value,
							nameInputError: tempNameInputError,
						});
					}}
					className={Style['inputIdField']}
					inputIcon={<Icon name="user" />}
					onEnter={() => userPwRef.current && userPwRef.current.focus()}
				/>
			</InputLayout>
			<InputLayout
				error={pwInputValue.pwInputError}
				errorMsg={pwInputValue.pwInputErrMsg}
				stretch={true}
				inputLabel="비밀번호*"
				inputLabelSize={labelSize}
				showInputLabel={true}
				autoFitErrorLabel={true}
				// spacing={2}
			>
				<InputWithIcon
					id="inputPw"
					ref={userPwRef}
					placeholder="비밀번호를 입력해주세요"
					value={pwInputValue.pwInputValue}
					size="large"
					onChange={(obj: { value: string }) => {
						let pwInputError = pwInput2Value.pwInputError;
						let pwInputErrMsg = pwInput2Value.pwInputErrMsg;

						if (obj.value.length !== 0) {
							const pwRegex = new RegExp(
								'^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})',
							);

							pwInputError = !pwRegex.test(obj.value);
							if (!pwRegex.test(obj.value)) {
								pwInputErrMsg =
									'최소 6자 이상 영어 소문자, 숫자, 특수문자가 포함되어야 합니다.';
							}

							if (
								pwInput2Value.pwInputValue !== undefined &&
								pwInput2Value.pwInputValue !== ''
							) {
								setPwInput2Value({
									...pwInput2Value,
									pwInputError: pwInput2Value.pwInputValue !== obj.value,
									pwInputErrMsg: '비밀번호가 일치하지 않습니다',
								});
							}
						}
						setPwInputValue({
							...pwInputValue,
							pwInputValue: obj.value,
							pwInputError,
							pwInputErrMsg,
						});
					}}
					className={Style['inputPwField']}
					inputIcon={<Icon name="lock" />}
					type="password"
				/>
			</InputLayout>
			<InputLayout
				error={pwInput2Value.pwInput2Error}
				errorMsg={pwInput2Value.pwInput2ErrMsg}
				stretch={true}
				inputLabel="비밀번호 확인*"
				inputLabelSize={labelSize}
				showInputLabel={true}
				autoFitErrorLabel={true}
				// spacing={7}
			>
				<InputWithIcon
					id="inputPw2Confirm"
					ref={userPwRef}
					placeholder="비밀번호를 입력해주세요"
					value={pwInput2Value.pwInput2Value}
					size="large"
					onChange={(obj: { value: string }) => {
						let pwInput2Error = false;
						let pwInput2ErrMsg = '';

						if (obj.value.length !== 0) {
							pwInput2Error = pwInputValue.pwInputValue !== obj.value;
							pwInput2ErrMsg = '비밀번호가 일치하지 않습니다.';
						}

						setPwInput2Value({
							...pwInput2Value,
							pwInput2Value: obj.value,
							pwInput2Error,
							pwInput2ErrMsg,
						});
					}}
					onEnter={clickNext}
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
		</>
	);
};

export default RegisterStep1;
