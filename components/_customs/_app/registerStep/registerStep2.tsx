/** ****************************************************************************************
 * @설명 : 회원가입 Step2 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-07-20     feature/BY/register        최초작성
 ********************************************************************************************/

import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { InputLayout, InputDefault, Button, InputDropdown } from '@components/index';
import classNames from 'classnames/bind';
import Style from './RegisterComp.module.scss';

const RegisterStep2 = (props: any) => {
	const cx = classNames.bind(Style);
	const labelSize = 'h4';

	const dispatch = useDispatch();

	const [teamSelectValue, setTeamSelectValue] = useState(props.registerData.team);
	const [teamSelectError, setTeamSelectError] = useState(false);
	const [titleSelectValue, setTitleSelectValue] = useState(props.registerData.title);
	const [titleSelectError, setTitleSelectError] = useState(false);
	const [phoneNumValue, setPhoneNumValue] = useState(
		props.registerData.phonenum === undefined ? '' : props.registerData.phonenum,
	);
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
			titleSelectValue,
			phoneNumValue,
			setTeamSelectError,
			setTitleSelectError,
			goNext: prop,
			propFunction: props.propFunction,
		});
	};

	return (
		<>
			<div style={inputElCommStyle(0, 'left', true)}>
				<InputLayout
					error={teamSelectError}
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
						value={teamSelectValue}
						onChange={(obj: { value: string }) => {
							setTeamSelectValue(obj.value);
							setTeamSelectError(false);
						}}
						className={Style['inputIdField']}
					/>
				</InputLayout>
				<InputLayout
					error={titleSelectError}
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
						placeholder="직급 선택."
						options={titleList}
						value={titleSelectValue}
						onChange={(obj: { value: string }) => {
							// console.log(obj.value);
							setTitleSelectValue(obj.value);
							setTitleSelectError(false);
						}}
						className={Style['inputIdField']}
					/>
				</InputLayout>
				<InputLayout
					stretch={true}
					inputLabel="휴대폰 번호"
					inputLabelSize={labelSize}
					showInputLabel={true}
					autoFitErrorLabel={true}
					spacing={2}
				>
					<InputDefault
						id="inputId"
						placeholder="휴대폰 번호를 입력해주세요."
						value={phoneNumValue}
						size="large"
						onChange={(obj: { value: string }) => {
							// 수정 필요!!!!
							const tempValue = obj.value
								.replace(/[^0-9]/g, '')
								.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
								.replace(/(-{1,2})$/g, '');

							console.log(tempValue);
							setPhoneNumValue(tempValue);
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
