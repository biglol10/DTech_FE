/** ****************************************************************************************
 * @설명 : 회원가입 Step1 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-07-20     feature/BY/register        최초작성
 ********************************************************************************************/

import { useEffect, useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
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
	const [idInputValue, setIdInputValue] = useState(props.registerData.user_id);
	const [idInputError, setIdInputError] = useState(false);
	const [idInputErrMsg, setIdInputErrMsg] = useState('');

	const [nameInputValue, setNameInputValue] = useState(props.registerData.name);
	const [nameInputError, setNameInputError] = useState(false);

	const [pwInputValue, setPwInputValue] = useState(props.registerData.passwd);
	const [pwInputError, setPwInputError] = useState(false);
	const [pwInputErrMsg, setPwInputErrMsg] = useState('');

	const [pw2InputValue, setPw2InputValue] = useState(props.registerData.passwd);
	const [pw2InputError, setPw2InputError] = useState(false);
	const [pw2InputErrMsg, setPw2InputErrMsg] = useState('');

	// const [idCheckMsg, setIdCheckMsg] = useState('중복확인 버튼을 클릭하세요');
	const [idConfirm, setIdConfirm] = useState(props.registerData.id_confirmed);

	const userIdRef = useRef<any>();
	const userPwRef = useRef<any>();

	useEffect(() => {});

	const clickNext = () => {
		dispatch({
			type: 'VALID_STEP1',
			idInputValue,
			nameInputValue,
			pwInputValue,
			pw2InputValue,
			setNameInputError,
			setIdInputError,
			setIdInputErrMsg,
			setPwInputError,
			setPwInputErrMsg,
			setPw2InputError,
			setPw2InputErrMsg,
			idInputError,
			nameInputError,
			pwInputError,
			pw2InputError,
			setIdConfirm,
			idConfirm,
			propFunction: props.propFunction,
		});
		// props.propFunction({ idInputValue, nameInputValue, pwInputValue, pw2InputValue });
	};

	const idCheck = () => {
		dispatch({
			type: 'ID_CHECK',
			idInputValue,
			setIdInputError,
			setIdInputErrMsg,
			setIdConfirm,
		});
	};

	return (
		<>
			<InputLayout
				error={idInputError}
				errorMsg={idInputErrMsg}
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
						value={idInputValue}
						size="large"
						onChange={(obj: { value: string }) => {
							setIdConfirm(false);
							setIdInputValue(obj.value);
							obj.value.length !== 0 && setIdInputError(!regEmail.test(obj.value));

							if (!regEmail.test(obj.value)) {
								setIdInputErrMsg('이메일을 정확히 입력해 주세요');
							}
						}}
						className={Style['inputIdField']}
						inputIcon={<Icon name="user" />}
						onEnter={() => userPwRef.current && userPwRef.current.focus()}
					/>
					<Button
						className={cx('idCheckBtn')}
						content={idConfirm ? '사용가능!' : '중복확인'}
						size="large"
						color={idConfirm ? 'blue' : 'google plus'}
						buttonType="none"
						onClick={() => {
							if (regEmail.test(idInputValue)) {
								idCheck();
							}
						}}
					/>
				</>
			</InputLayout>

			<InputLayout
				error={nameInputError}
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
					value={nameInputValue}
					size="large"
					onChange={(obj: { value: string }) => {
						setNameInputValue(obj.value);
						if (obj.value.length !== 0) {
							setNameInputError(false);
						}
					}}
					className={Style['inputIdField']}
					inputIcon={<Icon name="user" />}
					onEnter={() => userPwRef.current && userPwRef.current.focus()}
				/>
			</InputLayout>
			<InputLayout
				error={pwInputError}
				errorMsg={pwInputErrMsg}
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
					value={pwInputValue}
					size="large"
					onChange={(obj: { value: string }) => {
						setPwInputValue(obj.value);
						if (obj.value.length !== 0) {
							const pwRegex = new RegExp(
								'^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})',
							);

							setPwInputError(!pwRegex.test(obj.value));
							if (!pwRegex.test(obj.value)) {
								setPwInputErrMsg(
									'최소 6자 이상 영어 소문자, 숫자, 특수문자가 포함되어야 합니다.',
								);
							}

							if (pw2InputValue !== undefined && pw2InputValue.length !== 0) {
								setPw2InputError(pwInputValue !== obj.value);
								setPw2InputErrMsg('비밀번호가 일치하지 않습니다');
							}
						}
					}}
					className={Style['inputPwField']}
					inputIcon={<Icon name="lock" />}
					type="password"
				/>
			</InputLayout>
			<InputLayout
				error={pw2InputError}
				errorMsg={pw2InputErrMsg}
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
					value={pw2InputValue}
					size="large"
					onChange={(obj: { value: string }) => {
						setPw2InputValue(obj.value);

						if (obj.value.length !== 0) {
							setPw2InputError(pwInputValue !== obj.value);
							setPw2InputErrMsg('비밀번호가 일치하지 않습니다');
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
		</>
	);
};

export default RegisterStep1;
