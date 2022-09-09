/** ****************************************************************************************
 * @설명 : 회원가입 Step6 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-08-01     feature/BY/register        최초작성
 ********************************************************************************************/

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { Button, Label, InputLayout } from '@components/index';

import Style from './RegisterComp.module.scss';

const RegisterStep4 = (props: any) => {
	const dispatch = useDispatch();
	// const [techList, setTechList] = useState([] as any);
	const [techSelectedList, setTechSelectedList] = useState(
		useSelector((state: any) => state.register.techSelectValue),
	);

	useEffect(() => {
		if (
			techSelectedList.techSelectValue.filter((tech: any) => tech.value === true).length === 0
		) {
			dispatch({
				type: 'TECH_LIST',
				techSelectedList,
				setTechSelectedList,
			});
		}
	}, []);

	const clickNext = (goNext: boolean) => {
		dispatch({
			type: 'VALID_STEP4',
			setTechSelectedList,
			techSelectedList,
			goNext,
			propFunction: props.propFunction,
		});
	};

	const handleTechClick = (key: any) => {
		const findIndex = techSelectedList.techSelectValue.findIndex(
			(element: any) => element.key === key,
		);

		if (findIndex !== -1) {
			setTechSelectedList({
				...techSelectedList,
				techSelectValue: techSelectedList.techSelectValue.map((tech: any) =>
					tech.key === key ? { ...tech, value: !tech.value } : tech,
				),
				techSelectError: false,
			});
		}
	};

	return (
		<>
			<div style={inputElCommStyle(0, 'left', true)}>
				<InputLayout
					error={techSelectedList.techSelectError}
					errorMsg="한 개 이상 선택하세요"
					inputLabel="보유한 기술 또는 관심분야를 선택해주세요."
					inputLabelSize="h5"
					showInputLabel={true}
					autoFitErrorLabel={true}
					spacing={2}
				>
					<div className={Style['techBtnDiv']}>
						{techSelectedList.techSelectValue.map((tech: any) => {
							return (
								<Button
									content={tech.name}
									key={tech.key}
									size="mini"
									color="grey"
									spacing={5}
									basic={!tech.value}
									onClick={(e: any) => {
										handleTechClick(tech.key);
									}}
								/>
							);
						})}
					</div>
				</InputLayout>
				<br />

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

export default RegisterStep4;
