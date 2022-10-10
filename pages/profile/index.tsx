import { MainLayoutTemplate } from '@components/customs';
import { comAxiosRequest } from '@utils/appRelated/helperFunctions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, Label } from 'semantic-ui-react';
import Style from './profile.module.scss';

interface IUserInfo {
	USER_ID: string;
	USER_NM: string;
	USER_TITLE: string;
	TEAM_NM: string;
	USER_PHONENUM: string;
	USER_DETAIL: string;
	USER_DOMAIN: string;
	GITHUB_URL: string;
}
const Profile = () => {
	const uuid = useSelector((state: any) => state.auth.userUID);
	const userProfileImg = useSelector((state: any) => state.auth.userProfileImg);
	const [userInfo, setUserInfo] = useState<IUserInfo | undefined>();
	const [userSkills, setUserSkills] = useState([]);

	useEffect(() => {
		if (uuid !== '') {
			comAxiosRequest({
				url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/info/userInfo`,
				requestType: 'post',
				dataObj: { uuid },
				successCallback: (response) => {
					console.log('success');
					setUserInfo(response.data.resultData.queryResult[0]);
					// console.log(response.data.resultData.queryResult[0]);
				},
				failCallback: () => {
					console.log('failed');
				},
			});
		}
		comAxiosRequest({
			url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/info/userSkills`,
			requestType: 'post',
			dataObj: { uuid },
			successCallback: (response) => {
				console.log('success');
				console.log(response.data.resultData);
				setUserSkills(response.data.resultData.queryResult);
			},
			failCallback: () => {
				console.log('failed');
			},
		});
	}, [uuid]);

	return (
		<div>
			<div className={Style['profileCard']}>
				<div className={Style['profileTitle']}>
					<h1>내 프로필</h1>
				</div>
				<div className={Style['profileTop']}>
					<div className={Style['profileTopLeft']}>
						<Image src={userProfileImg} />
					</div>

					{userInfo !== undefined && (
						<div className={Style['profileTopRight']}>
							<div className={Style['infoDiv']}>
								<div className={Style['infoDivText1']}>아이디</div>
								<div className={Style['infoDivText2']}>{userInfo.USER_ID}</div>
							</div>
							<div className={Style['infoDiv']}>
								<div className={Style['infoDivText1']}>이름</div>
								<div className={Style['infoDivText2']}>{userInfo.USER_NM}</div>
							</div>
							<div className={Style['infoDiv']}>
								<div className={Style['infoDivText1']}>직급</div>
								<div className={Style['infoDivText2']}>{userInfo.USER_TITLE}</div>
							</div>
							<div className={Style['infoDiv']}>
								<div className={Style['infoDivText1']}>팀</div>
								<div className={Style['infoDivText2']}>{userInfo.TEAM_NM}</div>
							</div>
							<div className={Style['infoDiv']}>
								<div className={Style['infoDivText1']}>휴대폰 번호</div>
								<div className={Style['infoDivText2']}>
									{userInfo.USER_PHONENUM}
								</div>
							</div>
						</div>
					)}
				</div>
				{userInfo !== undefined && (
					<div className={Style['profileMiddle']}>
						<div className={Style['infoDiv']}>
							<div className={Style['infoDivText1']}>자기소개</div>
							<div className={Style['infoDivText2']}>
								<pre>{userInfo.USER_DETAIL}</pre>
							</div>
						</div>
						<div className={Style['infoDiv']}>
							<div className={Style['infoDivText1']}>도메인</div>
							<div className={Style['infoDivText2']}>{userInfo.USER_DOMAIN}</div>
						</div>
						<div className={Style['infoDiv']}>
							<div className={Style['infoDivText1']}>깃허브 주소</div>
							<div className={Style['infoDivText2']}>{userInfo.GITHUB_URL}</div>
						</div>
						{userSkills !== undefined && (
							<div className={Style['infoDiv']}>
								<div className={Style['infoDivText1']}>보유 스킬</div>
								<div className={Style['infoDivText2']}>
									{userSkills.map((skill: any) => `${skill.TECH_NM}, `)}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

Profile.PageLayout = MainLayoutTemplate;
Profile.displayName = 'profile';

export default Profile;
