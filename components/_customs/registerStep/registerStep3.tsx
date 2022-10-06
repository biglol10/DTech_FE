/** ****************************************************************************************
 * @설명 : 회원가입 Step3 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-07-20     feature/BY/register        최초작성
 ********************************************************************************************/

import { useState } from 'react';
// import { TextArea } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { Button, InputLayout, TextArea, InputWithIcon } from '@components/index';

import classNames from 'classnames/bind';
import Style from './RegisterComp.module.scss';

const RegisterStep3 = (props: any) => {
	const labelSize = 'h4';
	const cx = classNames.bind(Style);
	const dispatch = useDispatch();
	const [userDetailValue, setUserDetailValue] = useState(
		useSelector((state: any) => state.register.userDetailValue),
	);
	const [userGithubValue, setUserGithubValue] = useState(
		useSelector((state: any) => state.register.userGithubValue),
	);
	const [userDomainValue, setUserDomainValue] = useState(
		useSelector((state: any) => state.register.userDomainValue),
	);

	const clickNext = (goNext: boolean) => {
		dispatch({
			type: 'VALID_STEP3',
			userDetailValue,
			userGithubValue,
			userDomainValue,
			goNext,
			propFunction: props.propFunction,
		});
	};

	return (
		<>
			<div className={Style['stepDiv']}>
				<InputLayout
					error={userDetailValue.userDetailError}
					errorMsg="1000자 이하로 소개해주세요."
					inputLabel="회원님을 소개해 주세요."
					inputLabelSize={labelSize}
					showInputLabel={true}
					autoFitErrorLabel={true}
					spacing={30}
				>
					<TextArea
						placeholder="관심 기술, 경험 프로젝트 등(1000자 이하)"
						className={cx('registerTextarea')}
						value={userDetailValue.userDetailValue}
						onChange={({ value }: any) => {
							let userDetailError = false;

							if (value.length > 1000) {
								userDetailError = true;
								setUserDetailValue({
									...userDetailValue,
									userDetailError,
								});
							} else {
								setUserDetailValue({
									...userDetailValue,
									userDetailError,
									userDetailValue: value,
								});
							}

							// setDetail(value);
						}}
					/>
				</InputLayout>

				<InputLayout
					stretch={true}
					inputLabel="GitHub URL"
					inputLabelSize={labelSize}
					showInputLabel={true}
					autoFitErrorLabel={true}
					spacing={2}
				>
					<InputWithIcon
						id="inputId"
						placeholder="Github 주소를 입력해주세요."
						value={userGithubValue.userGithubValue}
						size="large"
						onChange={(obj: { value: string }) => {
							setUserGithubValue({
								...userGithubValue,
								userGithubValue: obj.value,
							});
						}}
						className={Style['inputIdField']}
						inputIcon={<Icon name="github" />}
						// onEnter={() => userPwRef.current && userPwRef.current.focus()}
					/>
				</InputLayout>

				<InputLayout
					stretch={true}
					inputLabel="업무 도메인"
					inputLabelSize={labelSize}
					showInputLabel={true}
					autoFitErrorLabel={true}
					spacing={2}
				>
					<InputWithIcon
						id="inputId"
						placeholder="도메인"
						// value={nameInputValue.nameInputValue}
						size="large"
						onChange={(obj: { value: string }) => {
							setUserDomainValue({
								...userDomainValue,
								userDomainValue: obj.value,
							});
						}}
						className={Style['inputIdField']}
						inputIcon={<Icon name="book" />}
						onEnter={() => {
							clickNext(true);
						}}
						// onEnter={() => userPwRef.current && userPwRef.current.focus()}
					/>
				</InputLayout>

				<div className={Style['buttonBelow']}>
					<Button
						className={Style['registerButton']}
						content="이전"
						size="large"
						color="google plus"
						buttonType="none"
						onClick={() => {
							clickNext(false);
						}}
					/>
					<Button
						className={Style['registerButton']}
						content="다음"
						size="large"
						color="google plus"
						buttonType="none"
						onClick={() => {
							clickNext(true);
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default RegisterStep3;
