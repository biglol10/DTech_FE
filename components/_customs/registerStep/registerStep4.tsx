/** ****************************************************************************************
 * @설명 : 회원가입 Step6 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-08-01     feature/BY/register        최초작성
 ********************************************************************************************/

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, LogoBtn } from '@components/index';
import { Label as Label2, Header } from 'semantic-ui-react';
import { siSimpleicons } from 'simple-icons/icons';

import Style from './RegisterComp.module.scss';

const RegisterStep4 = (props: any) => {
	const dispatch = useDispatch();
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			<div className={Style['stepDiv']}>
				<div className={Style['inputLabelHeader']}>
					<Header as="h3">보유한 기술 또는 관심있는 기술을 선택해주세요.</Header>
				</div>

				<div className={Style['techBtnDiv']}>
					{techSelectedList.techSelectValue.map((tech: any) => {
						return (
							<LogoBtn
								content={tech.name}
								key={tech.key}
								size="mini"
								color="grey"
								spacing={8}
								basic={!tech.value}
								backColor={tech.back_color}
								logo={tech.logo}
								logoColor={tech.logo_color}
								onClick={(e: any) => {
									handleTechClick(tech.key);
								}}
							/>
						);
					})}
				</div>
				<Label2
					basic
					color="red"
					pointing="above"
					size="tiny"
					style={{
						visibility: `${techSelectedList.techSelectError ? 'initial' : 'hidden'}`,
					}}
				>
					한 개 이상 선택해주세요.
				</Label2>
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
