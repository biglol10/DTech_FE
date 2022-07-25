import { useEffect, useMemo, useState } from 'react';
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
import Image from 'next/image';
import {
	Label,
	InputLayout,
	InputDropdown,
	InputSearch,
	SharpDivider,
	Avatar,
} from '@components/index';
import { techImage } from '@utils/constants/techs';
import { SkillTable } from '@components/customs';
import Style from './dashboard.module.scss';

interface ITeamSkillData {
	subject: string;
	count: number;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Index = ({ teamSkillData, aProp }: { teamSkillData: ITeamSkillData[]; aProp: string }) => {
	const router = useRouter();

	const [searchPerson, setSearchPerson] = useState('');

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

	const options3 = useMemo(() => {
		const techArr: any = [];

		Object.keys(techImage).map((item) => {
			const itemString = item as keyof typeof techImage;

			techArr.push({
				key: item,
				text: item,
				value: item,
				image: techImage[itemString],
			});

			return null;
		});

		return techArr;
	}, []);

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
					<SkillTable teamSkillData={teamSkillData} />
				</div>
			</div>
			<div className={Style['dashboardBottomMain']}>
				<div className={Style['skillConditionWrap']}>
					<InputLayout
						id={Style['dropdownLayout']}
						inputLabel="dropdown"
						inputLabelSize="h4"
						showInputLabel={false}
					>
						<InputDropdown
							id={Style['inputDropdown']}
							placeholder="선택해주세요"
							value={''}
							options={options3}
						/>
					</InputLayout>
					<InputLayout inputLabel="" showInputLabel={false}>
						<InputSearch
							id="inputPerson"
							placeholder="인물 검색"
							value={searchPerson}
							onChange={({ value }: { value: string }) => setSearchPerson(value)}
						/>
					</InputLayout>
					<ul>
						<li className={Style['active']}>사원</li>
						<li>선임</li>
						<li>책임</li>
					</ul>
				</div>
				<SharpDivider content="" />
				<div className={Style['peopleCardArea']}>
					<div>
						<div style={{ paddingBottom: '5px', borderBottom: '1px solid #F5B7B1' }}>
							<Avatar content="username1" />
						</div>
						<table style={{ marginTop: '5%' }}>
							<tbody>
								<tr>
									<td>직급:</td>
									<td>선임</td>
								</tr>
								<tr>
									<td>직급:</td>
									<td>선임</td>
								</tr>
							</tbody>
						</table>
						{/* <span>asfd</span> */}
					</div>
					<div>
						<div style={{ paddingBottom: '5px', borderBottom: '1px solid #F5B7B1' }}>
							<Avatar content="username1" />
						</div>
						<table style={{ marginTop: '5%' }}>
							<tbody>
								<tr>
									<td>직급:</td>
									<td>선임</td>
								</tr>
							</tbody>
						</table>
						{/* <span>asfd</span> */}
					</div>
					<div>
						<div style={{ paddingBottom: '5px', borderBottom: '1px solid #F5B7B1' }}>
							<Avatar content="username1" />
						</div>
						<table style={{ marginTop: '5%' }}>
							<tbody>
								<tr>
									<td>직급:</td>
									<td>선임</td>
								</tr>
							</tbody>
						</table>
						{/* <span>asfd</span> */}
					</div>
					<div>
						<div style={{ paddingBottom: '5px', borderBottom: '1px solid #F5B7B1' }}>
							<Avatar content="username1" />
						</div>
						<table style={{ marginTop: '5%' }}>
							<tbody>
								<tr>
									<td>직급:</td>
									<td>선임</td>
								</tr>
							</tbody>
						</table>
						{/* <span>asfd</span> */}
					</div>
					<div>
						<div style={{ paddingBottom: '5px', borderBottom: '1px solid #F5B7B1' }}>
							<Avatar content="username1" />
						</div>
						<table style={{ marginTop: '5%' }}>
							<tbody>
								<tr>
									<td>직급:</td>
									<td>선임</td>
								</tr>
							</tbody>
						</table>
						{/* <span>asfd</span> */}
					</div>
					<div>
						<div style={{ paddingBottom: '5px', borderBottom: '1px solid #F5B7B1' }}>
							<Avatar content="username1" />
						</div>
						<table style={{ marginTop: '5%' }}>
							<tbody>
								<tr>
									<td>직급:</td>
									<td>선임</td>
								</tr>
							</tbody>
						</table>
						{/* <span>asfd</span> */}
					</div>
					<div>
						<div style={{ paddingBottom: '5px', borderBottom: '1px solid #F5B7B1' }}>
							<Avatar content="username1" />
						</div>
						<table style={{ marginTop: '5%' }}>
							<tbody>
								<tr>
									<td>직급:</td>
									<td>선임</td>
								</tr>
							</tbody>
						</table>
						{/* <span>asfd</span> */}
					</div>
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
			aProp: process.env.S3_URL,
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
