import { Avatar } from '@components/index';
import { Icon } from 'semantic-ui-react';
import Style from './PersonCard.module.scss';

interface PersonDefail {
	rank: string;
	skills: string;
	domains: string;
	githubUrl: string;
	detail: string;
}

const PersonCard = ({ rank, skills, domains, githubUrl, detail }: PersonDefail) => {
	return (
		<div>
			<div className={Style['userAvatarArea']}>
				<Avatar content="username1" />
				<div className={Style['userClickPopup']}>
					<div>
						<Icon name="user circle" />내 프로필 보기
					</div>
					<hr className={Style['menu-separator']} />
					<div>
						<Icon name="setting" />내 설정
					</div>
					<hr className={Style['menu-separator']} />
					<div>
						<Icon name="mail" />
						건의사항 남기기
					</div>
					<hr className={Style['menu-separator']} />
				</div>
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
