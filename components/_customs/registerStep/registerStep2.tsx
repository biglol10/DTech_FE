/** ****************************************************************************************
 * @설명 : 회원가입 Step2 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-07-20     feature/BY/register        최초작성
 ********************************************************************************************/

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { InputLayout, InputDefault, Button, InputDropdown, InputPhone } from '@components/index';
import Style from './RegisterComp.module.scss';

const RegisterStep2 = (props: any) => {
	const labelSize = 'h4';

	const dispatch = useDispatch();

	// const [idInputValue, setIdInputValue] = useState(
	// 	useSelector((state: any) => state.register.idInputValue),
	// );
	const [teamSelectValue, setTeamSelectValue] = useState(
		useSelector((state: any) => state.register.teamSelectValue),
	);
	const [titleSelectValue, setTitleSelectValue] = useState(
		useSelector((state: any) => state.register.titleSelectValue),
	);
	const [phoneNumValue, setPhoneNumValue] = useState(
		useSelector((state: any) => state.register.phoneNumValue),
	);
	// const [teamSelectValue, setTeamSelectValue] = useState(props.registerData.team);
	// const [teamSelectError, setTeamSelectError] = useState(false);
	// const [titleSelectValue, setTitleSelectValue] = useState(props.registerData.title);
	// const [titleSelectError, setTitleSelectError] = useState(false);

	const [teamList, setTeamList] = useState([]);
	const titleList = [
		{ key: '사원', value: '사원', text: '사원' },
		{ key: '선임', value: '선임', text: '선임' },
		{ key: '책임', value: '책임', text: '책임' },
		{ key: '총괄', value: '총괄', text: '총괄' },
		{ key: '팀장', value: '팀장', text: '팀장' },
	];

	useEffect(() => {
		dispatch({
			type: 'TEAM_LIST',
			setTeamList,
		});
	}, []);

	const clickNext = (prop: boolean) => {
		dispatch({
			type: 'VALID_STEP2',
			teamSelectValue,
			setTeamSelectValue,
			titleSelectValue,
			setTitleSelectValue,
			phoneNumValue,
			setPhoneNumValue,
			goNext: prop,
			propFunction: props.propFunction,
		});
	};

	return (
		<>
			<div style={inputElCommStyle(0, 'left', true)}>
				<InputLayout
					error={teamSelectValue.teamSelectError}
					errorMsg="팀을 선택하세요."
					stretch={true}
					inputLabel="팀*"
					inputLabelSize={labelSize}
					showInputLabel={true}
					autoFitErrorLabel={true}
					// spacing={2}
				>
					<InputDropdown
						id="inputId"
						placeholder="팀 선택"
						options={teamList}
						value={teamSelectValue.teamSelectValue}
						onChange={(obj: { value: string }) => {
							setTeamSelectValue({
								...teamSelectValue,
								teamSelectValue: obj.value,
								teamSelectError: false,
							});
						}}
						className={Style['inputIdField']}
					/>
				</InputLayout>
				<InputLayout
					error={titleSelectValue.titleSelectError}
					errorMsg="직급을 선택하세요."
					stretch={true}
					inputLabel="직급*"
					inputLabelSize={labelSize}
					showInputLabel={true}
					autoFitErrorLabel={true}
					// spacing={2}
				>
					<InputDropdown
						id="inputId"
						placeholder="직급 선택"
						options={titleList}
						value={titleSelectValue.teamSelectValue}
						onChange={(obj: { value: string }) => {
							setTitleSelectValue({
								...titleSelectValue,
								titleSelectValue: obj.value,
								titleSelectError: false,
							});
						}}
						className={Style['inputIdField']}
					/>
				</InputLayout>
				<InputLayout
					error={phoneNumValue.phoneNumError}
					errorMsg="휴대폰 번호를 올바르게 입력하세요."
					stretch={true}
					inputLabel="휴대폰 번호"
					inputLabelSize={labelSize}
					showInputLabel={true}
					autoFitErrorLabel={true}
					spacing={2}
				>
					<InputPhone
						id="inputId"
						placeholder="휴대폰 번호를 입력해주세요."
						value={phoneNumValue.phoneNumValue}
						size="large"
						onChange={(obj: { value: string }) => {
							let phoneNumError = phoneNumValue.phoneNumError;

							if (obj.value.length === 11) {
								phoneNumError = false;
							}
							setPhoneNumValue({
								...phoneNumValue,
								phoneNumValue: obj.value,
								phoneNumError,
							});
						}}
						className={Style['inputIdField']}
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

export default RegisterStep2;
