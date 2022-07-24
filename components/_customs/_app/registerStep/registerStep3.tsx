/** ****************************************************************************************
 * @설명 : 회원가입 Step3 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-07-20     feature/BY/register        최초작성
 ********************************************************************************************/

import { useState } from 'react';
import { TextArea } from 'semantic-ui-react';

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { Label, Button } from '@components/index';

import classNames from 'classnames/bind';
import Style from './RegisterComp.module.scss';

const RegisterStep3 = (props: any) => {
	const cx = classNames.bind(Style);
	const [detail, setDetail] = useState(props.registerData.detail);

	const clickNext = (goNext: boolean) => {
		props.propFunction({ detail, goNext });
	};

	return (
		<>
			<div style={inputElCommStyle(0, 'left', true)}>
				<Label content="회원님을 소개해 주세요." size="big" />
				<TextArea
					placeholder="관심 기술, 경험 프로젝트 등.."
					className={cx('registerTextarea')}
					value={detail}
					onChange={(e, { value }: any) => {
						setDetail(value);
					}}
				/>
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
