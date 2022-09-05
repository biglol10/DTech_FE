/** ****************************************************************************************
 * @설명 : 기술 테이블 컴포넌트
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-07-27   feature/JW/dashboard       최초작성
 ********************************************************************************************/

import React, { useState } from 'react';
import { techImage } from '@utils/constants/imageConstants';
import { Table, Pagination } from 'semantic-ui-react';
import { Avatar, AvatarGroup } from '@components/index';
import { generateAvatarImage } from '@utils/appRelated/helperFunctions';

import Style from './SkillTable.module.scss';

interface ITeamSkillCountObj {
	[val: string]: {
		SKILL_NM: string;
		SKILL_CNT: number;
		USER_INFO: {
			USER_NM: string;
			USER_UID: string;
			IMG_URL: string;
			TEAM_CD: string;
			USER_TITLE: string;
		}[];
	};
}

const SkillTable = ({ teamSkillData }: { teamSkillData: ITeamSkillCountObj }) => {
	const [activePage, setActivePage] = useState<number>(1);

	const imageList = [
		`${
			process.env.NODE_ENV === 'production' ? 'dtech' : ''
		}/images/AvatarBaseImage/AvatarBase_BLACK1.png`,
		`${
			process.env.NODE_ENV === 'production' ? 'dtech' : ''
		}/images/AvatarBaseImage/AvatarBase_BLUE1.png`,
		`${
			process.env.NODE_ENV === 'production' ? 'dtech' : ''
		}/images/AvatarBaseImage/AvatarBase_RED2.png`,
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
					{Object.keys(teamSkillData)
						.slice(pageSize * (activePage - 1), pageSize * activePage)
						.map((item, idx) => {
							const tempSkillObj = teamSkillData[item];

							// const itemSubject = item.SKILL_NM as keyof typeof techImage;
							const avatarGroupImgList = tempSkillObj.USER_INFO.map(
								(oneUser, idx2) => {
									if (oneUser.IMG_URL) {
										return oneUser.IMG_URL;
									} else {
										return `${
											process.env.NODE_ENV === 'production' ? 'dtech' : ''
										}/images/AvatarBaseImage/${generateAvatarImage(
											oneUser.USER_UID,
										)}`;
									}
								},
							);

							const avatarGroupUserList = tempSkillObj.USER_INFO.slice(0, 3).reduce(
								(previousVal, currentVal, idx3) => {
									if (idx3 === 0) {
										return `${previousVal}${currentVal.USER_NM} (${currentVal.USER_TITLE})`;
									} else {
										return `${previousVal}, ${currentVal.USER_NM} (${currentVal.USER_TITLE})`;
									}
								},
								'',
							);

							return (
								<Table.Row key={`${tempSkillObj.SKILL_NM}_${idx}`}>
									<Table.Cell>
										<Avatar
											labelSize="large"
											src={
												techImage[
													tempSkillObj.SKILL_NM.replace(
														'.',
														'',
													) as keyof typeof techImage
												]
											}
											fontColor="black"
											content={tempSkillObj.SKILL_NM}
										/>
									</Table.Cell>
									<Table.Cell>
										<AvatarGroup
											imageList={avatarGroupImgList}
											divHeight={20}
											totalCount={tempSkillObj.SKILL_CNT}
											usersString={avatarGroupUserList}
										/>
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
					totalPages={Math.floor(Object.keys(teamSkillData).length / pageSize) + 1}
					onPageChange={(event, data) => {
						setActivePage(data.activePage as number);
					}}
				/>
			</div>
		</>
	);
};

export default SkillTable;
