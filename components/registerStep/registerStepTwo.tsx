import { useEffect, useState, SyntheticEvent } from 'react';
import axios from 'axios';

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { InputLayout, InputDefault, Button, Label, InputDropdown } from '@components/index';
import { Dropdown } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import Style from './RegisterComp.module.scss';

const RegisterStepTwo = (props: any) => {
	const cx = classNames.bind(Style);
	const labelSize = 'h4';

	const [teamSelectValue, setTeamSelectValue] = useState('');
	const [titleSelectValue, setTitleSelectValue] = useState('');
	const [phoneNumValue, setPhoneNumValue] = useState('');
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
	});

	const getTeamList = () => {
		axios.post('http://localhost:3066/api/auth/getTeamList').then((res: any) => {
			const tempArr = res.data.resultData.queryResult;
			const newTempArr = tempArr.map((team: any) => {
				return { key: team.TEAM_CD, value: team.TEAM_CD, text: team.NAME };
			});

			setTeamList(newTempArr);
		});
	};

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
						onChange={(e: SyntheticEvent<HTMLElement, Event>, { value }: any) => {
							console.log(value);
							setTeamSelectValue(value);
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
						onChange={(e: SyntheticEvent<HTMLElement, Event>, { value }: any) => {
							console.log(value);
							setTitleSelectValue(value);
						}}
						className={Style['inputIdField']}
					/>
				</InputLayout>
				<InputLayout
					stretch={true}
					inputLabel="전화번호"
					inputLabelSize={labelSize}
					showInputLabel={true}
					autoFitErrorLabel={true}
					spacing={2}
				>
					<InputDefault
						id="inputId"
						placeholder="전화번호를 입력해주세요."
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
