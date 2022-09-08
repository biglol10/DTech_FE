/** ****************************************************************************************
 * @설명 : 유저정보 카드형태로 표시하는 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-07-27   feature/JW/dashboard       최초작성
 * 2      변지욱     2022-09-07   feature/JW/chatPage        자기 자신은 채팅기능 표시X
 ********************************************************************************************/

import { Avatar } from '@components/index';
import { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { generateAvatarImage } from '@utils/appRelated/helperFunctions';
import { useSelector } from 'react-redux';
import { IAuth } from '@utils/types/commAndStoreTypes';

import Style from './PersonCard.module.scss';

interface PersonDefail {
	username: string;
	profileUrl?: string | null;
	rank: string;
	skills: string;
	domains: string;
	githubUrl: string;
	detail: string;
	userUID: string;
}

const PersonCard = ({
	username,
	profileUrl = null,
	rank,
	skills,
	domains,
	githubUrl,
	detail,
	userUID,
}: PersonDefail) => {
	const router = useRouter();
	const [popupView, setPopupView] = useState(false);
	const authStore = useSelector((state: { auth: IAuth }) => state.auth);

	return (
		<div>
			<div className={Style['userAvatarArea']} onClick={() => setPopupView(!popupView)}>
				<Avatar
					content={username}
					src={profileUrl || generateAvatarImage(userUID)}
					imageSize={'mini'}
				/>
				{popupView && (
					<div className={Style['userClickPopup']}>
						<div onClick={() => alert('visit profile')}>
							<Icon name="user circle" />
							프로필 보기
						</div>
						{authStore.userUID !== userUID && (
							<>
								<hr className={Style['menu-separator']} />
								<div onClick={() => router.push(`/chat/${userUID}`)}>
									<Icon name="chat" />
									채팅
								</div>
							</>
						)}
					</div>
				)}
			</div>
			<table style={{ marginTop: '5%', tableLayout: 'fixed' }}>
				<tbody>
					<tr>
						<td>직급:</td>
						<td>{rank}</td>
					</tr>
					<tr>
						<td>Skill:</td>
						<td>
							<div>{skills}</div>
						</td>
					</tr>
					<tr>
						<td>도메인:</td>
						<td>
							<div>{domains}</div>
						</td>
					</tr>
					<tr>
						<td>깃헙:</td>
						<td>
							<div>
								<a href={githubUrl} target="_blank" rel="noreferrer">
									{githubUrl}
								</a>
							</div>
						</td>
					</tr>
					<tr>
						<td>소개:</td>
						<td>
							<div>{detail}</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default PersonCard;
