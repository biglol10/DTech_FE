import { useState } from 'react';
import wrapper from '@store/rootReducer';
import { useRouter } from 'next/router';
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Icon, Table, Pagination } from 'semantic-ui-react';
import Image from 'next/image';
import { Avatar, AvatarGroup, Label } from '@components/index';
import { techImage } from '@utils/constants/techs';
import Style from './dashboard.module.scss';

interface ITeamSkillData {
	subject: string;
	count: number;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const imageList = [
	'https://ca.slack-edge.com/T02SCQ38A22-U039FT91QTD-g0ca8cf5c8e6-24',
	'https://ca.slack-edge.com/T02SCQ38A22-U02U080JHC2-29078f07fef3-24',
	'https://ca.slack-edge.com/T02SCQ38A22-USLACKBOT-sv41d8cd98f0-24',
	'https://ca.slack-edge.com/T02SCQ38A22-U02U2GTV8J0-3c397712af98-24',
	'https://ca.slack-edge.com/T02SCQ38A22-U0310788JFR-c2ebf48cb030-24',
	'https://ca.slack-edge.com/T02SCQ38A22-U039JQGH1M3-g396a0215b62-48',
	'https://ca.slack-edge.com/T02SCQ38A22-U02U08XSSAX-g106a193d8a0-48',
];

const TableExampleCelledStriped = ({ teamSkillData }: { teamSkillData: ITeamSkillData[] }) => {
	const [activePage, setActivePage] = useState<number>(1);

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

const Index = ({ teamSkillData }: { teamSkillData: ITeamSkillData[] }) => {
	const router = useRouter();

	const data = {
		labels: teamSkillData.map((item) => item.subject),
		datasets: [
			{
				label: 'asdf',
				data: teamSkillData.map((item) => item.count),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,

		plugins: {
			title: {
				display: false,
				text: 'DCX 모바일 기술팀 스킬 현황',
			},
			legend: {
				position: 'top' as const,
				display: false,
			},
		},
	};

	return (
		<>
			<div className={Style['dashboardTopMain']}>
				<div className={Style['skillOverview']}>
					<Label
						iconOrImage="image"
						nextImage={
							<img src="https://www.lgcns.com/wp-content/uploads/2022/03/img_dcx_introduceLogo-1.png" />
						}
						content="DCX 모바일 기술팀 스킬 현황"
						size="large"
					/>
					<br />
					<Bar options={options} data={data} />
				</div>
				<div className={Style['skillOverviewTable']}>
					<TableExampleCelledStriped teamSkillData={teamSkillData} />
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async (context: any) => {
	const { token } = parseCookies(context);

	const axiosData = await axios
		.get('http://localhost:3066/api/dashboard/getTeamSkills', {
			headers: { Authorization: token },
		})
		.then((response) => {
			return response.data.teamSkillData;
		})
		.catch((err) => {
			return [];
		});

	return {
		props: {
			teamSkillData: axiosData,
		},
	};
};

// export const getServerSideProps = wrapper.getServerSideProps(
// 	(store) =>
// 		async ({ req, res, ...etc }) => {
// 			const GET_PUBLIC_TASKS_KEY = '';
// 			const GET_GOALS_BY_IDS_KEY = '';

// 			console.log('store auth value is ');
// 			console.log(store);
// 			console.log(store.getState());
// 			console.log(store.getState().auth);

// 			const token = store.getState().auth.userToken;

// 			console.log('token value is');
// 			console.log(token);

// 			const axiosData = await axios
// 				.get('http://localhost:3066/api/dashboard/getTeamSkills')
// 				.then((response) => {
// 					console.log('response.data success');
// 					console.log(response.data);
// 					return response.data;
// 				})
// 				.catch((err) => {
// 					console.log('error response');
// 					return {};
// 				});

// 			// // 액션 디스패치 하기
// 			// store.dispatch(
// 			// 	dataActionCreators[DataActionType.GET_PUBLIC_TASKS]({
// 			// 		author: undefined,
// 			// 		key: GET_PUBLIC_TASKS_KEY,
// 			// 		startTime: new Date('1999-11-11'),
// 			// 		endTime: new Date('2222-11-11'),
// 			// 	}),
// 			// );

// 			// // 데이터 fetch 완료될때까지 기다리기
// 			// await waitDuringLoading(store, {
// 			// 	actionType: DataActionType.GET_PUBLIC_TASKS,
// 			// 	key: GET_PUBLIC_TASKS_KEY,
// 			// });

// 			// // state 에서 값 읽기
// 			// const tasksGoal = store
// 			// 	.getState()
// 			// 	.data[DataActionType.GET_PUBLIC_TASKS][GET_PUBLIC_TASKS_KEY].data?.map(
// 			// 		(item) => item.goal,
// 			// 	);

// 			// ...
// 			return { props: { axiosData } };
// 		},
// );

// export const getServerSideProps = wrapper.getServerSideProps({ store }=> {
// 	const state = store.getState();
// 	console.log('state', state);

// 	return {
// 		props: {},
// 	};
// });

export default Index;
