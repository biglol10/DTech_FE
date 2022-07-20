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
import { Icon, Table } from 'semantic-ui-react';
import Image from 'next/image';
import { AvatarGroup } from '@components/index';
import Style from './dashboard.module.scss';

interface IProps {
	[name: string]: unknown;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'January1',
	'February1',
	'March1',
	'April1',
	'May1',
	'June1',
	'July1',
];

export const data = {
	labels,
	datasets: [
		{
			label: 'Dataset 1',
			data: [10, 20, 50, 40, 5, 110, 30, 10, 20, 50, 40, 5, 110, 30],
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
	],
};

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Chart.js Bar Chart',
		},
	},
};

// const AvatarGroup = () => {
// 	return (
// 		<div className={Style['avatarGroup']}>
// 			<div className={Style['avatarUser']}>
// 				<img
// 					src="https://ca.slack-edge.com/T02SCQ38A22-U039FT91QTD-g0ca8cf5c8e6-24"
// 					// height={20}
// 					// width={20}
// 					style={{ height: '20px', width: '20px' }}
// 					className={Style['userImage']}
// 				/>
// 				<img
// 					src="https://ca.slack-edge.com/T02SCQ38A22-U02U080JHC2-29078f07fef3-24"
// 					// height={20}
// 					// width={20}
// 					style={{ height: '20px', width: '20px' }}
// 					className={Style['userImage']}
// 				/>
// 				<img
// 					src="https://ca.slack-edge.com/T02SCQ38A22-USLACKBOT-sv41d8cd98f0-24"
// 					// height={20}
// 					// width={20}
// 					style={{ height: '20px', width: '20px' }}
// 					className={Style['userImage']}
// 				/>
// 				<img
// 					src="https://ca.slack-edge.com/T02SCQ38A22-U02U2GTV8J0-3c397712af98-24"
// 					// height={20}
// 					// width={20}
// 					style={{ height: '20px', width: '20px' }}
// 					className={Style['userImage']}
// 				/>
// 				<img
// 					src="https://ca.slack-edge.com/T02SCQ38A22-U0310788JFR-c2ebf48cb030-24"
// 					// height={20}
// 					// width={20}
// 					style={{ height: '20px', width: '20px' }}
// 					className={Style['userImage']}
// 				/>
// 			</div>
// 		</div>
// 	);
// };

const TableExampleCelledStriped = () => (
	<Table celled>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell colSpan="1">Git Repository</Table.HeaderCell>
				<Table.HeaderCell colSpan="1">Git Repository</Table.HeaderCell>
				<Table.HeaderCell colSpan="1">Git Repository</Table.HeaderCell>
			</Table.Row>
		</Table.Header>

		<Table.Body>
			<Table.Row>
				<Table.Cell collapsing>
					<Icon name="folder" /> node_modules
				</Table.Cell>
				<Table.Cell>Initial commit</Table.Cell>
				<Table.Cell collapsing textAlign="right">
					10 hours ago
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>
					<Icon name="folder" /> test
				</Table.Cell>
				<Table.Cell>Initial commit</Table.Cell>
				<Table.Cell textAlign="right">10 hours ago</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>
					<Icon name="folder" /> build
				</Table.Cell>
				<Table.Cell>Initial commit</Table.Cell>
				<Table.Cell textAlign="right">10 hours ago</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>
					<Icon name="file outline" /> package.json
				</Table.Cell>
				<Table.Cell>Initial commit</Table.Cell>
				<Table.Cell textAlign="right">10 hours ago</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>
					<Icon name="file outline" /> Gruntfile.js
				</Table.Cell>
				<Table.Cell>Initial commit</Table.Cell>
				<Table.Cell textAlign="right">10 hours ago</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table>
);

const Index = (props: IProps) => {
	const router = useRouter();

	const imageList = [
		'https://ca.slack-edge.com/T02SCQ38A22-U039FT91QTD-g0ca8cf5c8e6-24',
		'https://ca.slack-edge.com/T02SCQ38A22-U02U080JHC2-29078f07fef3-24',
		'https://ca.slack-edge.com/T02SCQ38A22-USLACKBOT-sv41d8cd98f0-24',
		'https://ca.slack-edge.com/T02SCQ38A22-U02U2GTV8J0-3c397712af98-24',
		'https://ca.slack-edge.com/T02SCQ38A22-U0310788JFR-c2ebf48cb030-24',
	];

	console.log('props from here');
	console.log(props);
	return (
		<>
			<div className={Style['dashboardTopMain']}>
				<div className={Style['recentArticleArea']}>
					<TableExampleCelledStriped />
					<AvatarGroup imageList={imageList} divHeight={20} />
				</div>
				<div className={Style['skillOverview']}>
					<Bar options={options} data={data} />
				</div>
			</div>
		</>

		// <div className={Style['']}>
		// 	<Bar options={options} data={data} />
		// 	<br />
		// 	<br />
		// 	<button onClick={() => router.push('/')}>go to index</button>
		// </div>
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
