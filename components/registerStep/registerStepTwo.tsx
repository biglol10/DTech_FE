import { useEffect, useState } from 'react';
import axios from 'axios';

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { InputLayout, InputDefault, Button, Label } from '@components/index';
import { Dropdown } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import Style from './Register.module.scss';

const RegisterStepTwo = (props: any) => {
	const cx = classNames.bind(Style);
	const labelSize = 'h4';

	const [teamSelectValue, setTeamSelectValue] = useState('');
	const [titleSelectValue, setTitleSelectValue] = useState('');
	const [phoneNumValue, setPhoneNumValue] = useState('');
	const [teamList, setTeamList] = useState([]);

	const clickNext = () => {
		console.log('clickNext2');
		props.propFunction({ teamSelectValue, titleSelectValue, phoneNumValue });
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
			<div className={cx('idInputDiv')} style={inputElCommStyle(0, 'left', true)}>
				<Label content="팀" size="big" />
				<Dropdown
					placeholder="팀 선택"
					fluid
					search
					selection
					options={teamList}
					onChange={(e, { value }: any) => {
						console.log(value);
						setTeamSelectValue(value);
					}}
				/>
				<Label content="직급" />
				<Dropdown
					placeholder="직급 선택"
					fluid
					search
					selection
					options={titleList}
					onChange={(e, { value }: any) => {
						console.log(value);
						setTitleSelectValue(value);
					}}
				/>
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
				<Button
					className={Style['registerButton']}
					content="다음"
					size="large"
					color="google plus"
					buttonType="none"
					onClick={clickNext}
				/>
			</div>
		</>
	);
};

export default RegisterStepTwo;
