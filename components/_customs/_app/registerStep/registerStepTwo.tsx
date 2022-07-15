import { useEffect, useState, SyntheticEvent } from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { InputLayout, InputDefault, Button, Label, InputDropdown } from '@components/index';
import { Dropdown } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import Style from './RegisterComp.module.scss';

const RegisterStepTwo = (props: any) => {
	const cx = classNames.bind(Style);
	const labelSize = 'h4';

	const dispatch = useDispatch();

	const [teamSelectValue, setTeamSelectValue] = useState(props.registerData.team);
	const [titleSelectValue, setTitleSelectValue] = useState(props.registerData.title);
	const [phoneNumValue, setPhoneNumValue] = useState(
		props.registerData.phonenum === undefined ? '' : props.registerData.phonenum,
	);
	const [teamList, setTeamList] = useState([]);

	const clickNext = () => {
		console.log('clickNext2');
		props.propFunction({ teamSelectValue, titleSelectValue, phoneNumValue, goNext: true });
	};
	const clickPrev = () => {
		console.log('clickPrev2');
		props.propFunction({ teamSelectValue, titleSelectValue, phoneNumValue, goNext: false });
	};

	useEffect(() => {
		getTeamList();
	}, []);

	const getTeamList = () => {
		dispatch({
			type: 'TEAM_LIST',
			setTeamList,
		});
	};

	// useEffect(() => {
	// 	if (phoneNumValue.length <= 11) {
	// 		setPhoneNumValue((prevNum: any) =>
	// 			prevNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
	// 		);
	// 	} else if (phoneNumValue.lengh === 13) {
	// 		setPhoneNumValue(
	// 			phoneNumValue.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
	// 		);
	// 	}

	// 	console.log(phoneNumValue);
	// }, [phoneNumValue]);

	const titleList = [
		{ key: '사원', value: '사원', text: '사원' },
		{ key: '선임', value: '선임', text: '선임' },
		{ key: '책임', value: '책임', text: '책임' },
		{ key: '총괄', value: '총괄', text: '총괄' },
		{ key: '팀장', value: '팀장', text: '팀장' },
	];

	return (
		<>
			<div style={inputElCommStyle(0, 'left', true)}>
				<InputLayout
					stretch={true}
					inputLabel="팀"
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
						}}
						className={Style['inputIdField']}
					/>
				</InputLayout>
				<InputLayout
					stretch={true}
					inputLabel="직급"
					inputLabelSize={labelSize}
					showInputLabel={true}
					autoFitErrorLabel={true}
					// spacing={2}
				>
					<InputDropdown
						id="inputId"
						placeholder="직급 선택."
						options={titleList}
						onChange={(obj: { value: string }) => {
							console.log(obj.value);
							setTitleSelectValue(obj.value);
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
							setPhoneNumValue(obj.value);
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
						onClick={clickPrev}
					/>
					<Button
						className={Style['registerButton']}
						content="다음"
						size="large"
						color="google plus"
						buttonType="none"
						onClick={clickNext}
					/>
				</div>
			</div>
		</>
	);
};

export default RegisterStepTwo;
