/** ****************************************************************************************
 * @설명 : 기술 테이블 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-07-27   feature/JW/dashboard       최초작성
 ********************************************************************************************/

import { useState } from 'react';
import { techImage } from '@utils/constants/techs';
import { Table, Pagination } from 'semantic-ui-react';
import { Avatar, AvatarGroup } from '@components/index';
import Style from './SkillTable.module.scss';

interface ITeamSkillCountArr {
	SKILL_NM: string;
	USER_NM: string;
	USER_UID: string;
	TEAM_CD: string;
	TITLE: string;
	IMG_URL: string;
	SKILL_CNT: number;
}

const SkillTable = ({ teamSkillData }: { teamSkillData: ITeamSkillCountArr[] }) => {
	console.log(teamSkillData);
	const [activePage, setActivePage] = useState<number>(1);

	const imageList = [
		'https://ca.slack-edge.com/T02SCQ38A22-U039FT91QTD-g0ca8cf5c8e6-24',
		'https://ca.slack-edge.com/T02SCQ38A22-U02U080JHC2-29078f07fef3-24',
		'https://ca.slack-edge.com/T02SCQ38A22-USLACKBOT-sv41d8cd98f0-24',
		'https://ca.slack-edge.com/T02SCQ38A22-U02U2GTV8J0-3c397712af98-24',
		'https://ca.slack-edge.com/T02SCQ38A22-U0310788JFR-c2ebf48cb030-24',
		'https://ca.slack-edge.com/T02SCQ38A22-U039JQGH1M3-g396a0215b62-48',
		'https://ca.slack-edge.com/T02SCQ38A22-U02U08XSSAX-g106a193d8a0-48',
	];

	const pageSize = 6;

	return (
		<>
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell colSpan="1">Skill</Table.HeaderCell>
						<Table.HeaderCell colSpan="1">Members</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body className={Style['skillTableBody']}>
					{teamSkillData
						.slice(pageSize * (activePage - 1), pageSize * activePage)
						.map((item, idx) => {
							const itemSubject = item.SKILL_NM as keyof typeof techImage;

							return (
								<Table.Row key={`${item.USER_NM}_${idx}`}>
									<Table.Cell>
										<Avatar
											labelSize="large"
											src={techImage[itemSubject]}
											fontColor="black"
											content={itemSubject}
										/>
									</Table.Cell>
									<Table.Cell>
										<AvatarGroup imageList={imageList} divHeight={20} />
									</Table.Cell>
								</Table.Row>
							);
						})}
				</Table.Body>
			</Table>
			<div className={Style['paginationDiv']}>
				<Pagination
					activePage={activePage}
					firstItem={null}
					lastItem={null}
					pointing
					secondary
					totalPages={Math.floor(teamSkillData.length / pageSize) + 1}
					onPageChange={(event, data) => {
						setActivePage(data.activePage as number);
					}}
				/>
			</div>
		</>
	);
};

export default SkillTable;
