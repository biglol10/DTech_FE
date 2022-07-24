/** ****************************************************************************************
 * @설명 : 회원가입 Step5 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-07-20     feature/BY/register        최초작성
 ********************************************************************************************/

import Link from 'next/link';

import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { Label, Button } from '@components/index';

import Style from './RegisterComp.module.scss';

// TODO: 회원가입한 이름으로 표시 필요
const RegisterStep3 = (props: any) => {
	const resultInfo = props.resultData.result;

	return (
		<>
			<div style={inputElCommStyle(0, 'left', true)}>
				<div className={Style['step5Div']}>
					<h1>
						{/* {resultInfo.name} {resultInfo.title}님! */}
						장보영 선임님!
					</h1>
					<Label content="회원가입이 완료되었습니다." size="big" />
					<Link href="/login">
						<a className={Style['loginBtn']}>
							<Button
								content="로그인"
								size="large"
								color="google plus"
								buttonType="none"
							/>
						</a>
					</Link>
				</div>
			</div>
		</>
	);
};

export default RegisterStep3;
