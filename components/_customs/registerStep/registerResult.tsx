/** ****************************************************************************************
 * @설명 : 회원가입 Step5 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-07-20     feature/BY/register        최초작성
 ********************************************************************************************/

import Link from 'next/link';

import { useEffect, useState } from 'react';

import { Header } from 'semantic-ui-react';
import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
import { Label, Button } from '@components/index';

import Style from './RegisterComp.module.scss';

const RegisterResult = (props: any) => {
	const [resultInfo, setResultInfo] = useState(props.resultData.result);
	// const [resultInfo, setResultInfo] = useState('error');
	// const [resultInfo, setResultInfo] = useState({
	// 	name: '장보영',
	// 	title: '총괄',
	// 	result: 'success',
	// });
	const [userNameMsg, setUserNameMsg] = useState();

	return (
		<>
			<div className={Style['stepDiv']}>
				{resultInfo.result === 'success' && (
					<div className={Style['successDiv']}>
						<div className={Style['helloUser']}>
							<div className={Style['helloUser1']}>
								<span>{`${resultInfo.name} ${resultInfo.title}님`}</span>
							</div>
							<div className={Style['helloUser2']}>
								<span>안녕하세요!</span>
							</div>
							<div className={Style['helloUser3']}>
								<span>방금 {resultInfo.title}님의 가입이 완료되었습니다.</span>
							</div>
							<div className={Style['helloUser4']}>
								<span>🎉🎊🎉</span>
							</div>
							<div className={Style['helloUser5']}>
								<span>로그인하셔서 DTech를 둘러보세요!</span>
							</div>
							{/* <Header as="h1">{`${resultInfo.name} ${resultInfo.title}님!`}</Header>
							<Label content="회원가입이 완료되었습니다." size="big" /> */}
						</div>

						<Link href="/login">
							<a className={Style['loginBtn']}>
								<div className={Style['buttonBelow']}>
									<Button
										content="로그인 페이지 이동"
										size="large"
										color="google plus"
										buttonType="none"
									/>
								</div>
							</a>
						</Link>
					</div>
				)}
				{resultInfo === 'error' && (
					<div className={Style['failDiv']}>
						<div>
							<span>회원가입에 실패했습니다.</span>
						</div>
						{/* <Label content="회원가입에 실패했습니다." size="big" /> */}
						<Link href="/login">
							<a className={Style['loginBtn']}>
								<div className={Style['buttonBelow2']}>
									<Button
										content="로그인 페이지 이동"
										size="large"
										color="google plus"
										buttonType="none"
									/>
								</div>
							</a>
						</Link>
					</div>
				)}
			</div>
		</>
	);
};

export default RegisterResult;
