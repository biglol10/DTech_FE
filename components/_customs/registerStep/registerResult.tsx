/** ****************************************************************************************
 * @설명 : 회원가입 Step5 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-07-20     feature/BY/register        최초작성
 ********************************************************************************************/

import Link from 'next/link';

import { useEffect, useState } from 'react';
import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { Label, Button } from '@components/index';

import Style from './RegisterComp.module.scss';

const RegisterResult = (props: any) => {
	const [resultInfo, setResultInfo] = useState(props.resultData.result);
	const [userNameMsg, setUserNameMsg] = useState();

	console.log(props.resultData);

	return (
		<>
			<div style={inputElCommStyle(0, 'left', true)}>
				<div className={Style['step5Div']}>
					{resultInfo.result === 'success' && (
						<div>
							{/* <h1>
								{resultInfo.name} {resultInfo.title}님!
							</h1> */}
							<Label
								content={`${resultInfo.name} ${resultInfo.title}님!`}
								size="big"
							/>
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
					)}
					{resultInfo === 'error' && (
						<div>
							<Label content="회원가입에 실패했습니다." size="big" />
							<Link href="/login">
								<a className={Style['loginBtn']}>
									<Button
										content="로그인 페이지 이동"
										size="large"
										color="google plus"
										buttonType="none"
									/>
								</a>
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default RegisterResult;
