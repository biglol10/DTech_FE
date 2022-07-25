import { useState } from 'react';
import { techImage } from '@utils/constants/techs';
import { Table, Pagination } from 'semantic-ui-react';
import { Avatar, AvatarGroup } from '@components/index';
import Style from './SkillTable.module.scss';

interface ITeamSkillData {
	subject: string;
	count: number;
}

const SkillTable = ({ teamSkillData }: { teamSkillData: ITeamSkillData[] }) => {
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
					{teamSkillData.slice(7 * (activePage - 1), 7 * activePage).map((item, idx) => {
						const itemSubject = item.subject as keyof typeof techImage;

						return (
							<Table.Row key={`${item.subject}_${idx}`}>
								<Table.Cell>
									<Avatar
										labelSize="large"
										src={techImage[itemSubject]}
										color="black"
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
					totalPages={Math.floor(teamSkillData.length / 7) + 1}
					onPageChange={(event, data) => {
						setActivePage(data.activePage as number);
					}}
				/>
			</div>
		</>
	);
};

export default SkillTable;
