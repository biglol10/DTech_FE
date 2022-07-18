import { useState } from 'react';
import wrapper from '@store/rootReducer';
import { useRouter } from 'next/router';
import axios from 'axios';

const Index = (props: any) => {
	const router = useRouter();

	console.log('props from here');
	console.log(props);
	return (
		<div>
			safksaf;lj
			<br />
			<br />
			<button onClick={() => router.push('/')}>go to index</button>
		</div>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req, res, ...etc }) => {
			const GET_PUBLIC_TASKS_KEY = '';
			const GET_GOALS_BY_IDS_KEY = '';

			console.log('store auth value is ');
			console.log(store);
			console.log(store.getState());
			console.log(store.getState().auth);

			const token = store.getState().auth.userToken;

			console.log('token value is');
			console.log(token);

			const axiosData = await axios
				.get('http://localhost:3066/api/dashboard/getTeamSkills')
				.then((response) => {
					console.log('response.data success');
					console.log(response.data);
					return response.data;
				})
				.catch((err) => {
					console.log('error response');
					return {};
				});

			// // 액션 디스패치 하기
			// store.dispatch(
			// 	dataActionCreators[DataActionType.GET_PUBLIC_TASKS]({
			// 		author: undefined,
			// 		key: GET_PUBLIC_TASKS_KEY,
			// 		startTime: new Date('1999-11-11'),
			// 		endTime: new Date('2222-11-11'),
			// 	}),
			// );

			// // 데이터 fetch 완료될때까지 기다리기
			// await waitDuringLoading(store, {
			// 	actionType: DataActionType.GET_PUBLIC_TASKS,
			// 	key: GET_PUBLIC_TASKS_KEY,
			// });

			// // state 에서 값 읽기
			// const tasksGoal = store
			// 	.getState()
			// 	.data[DataActionType.GET_PUBLIC_TASKS][GET_PUBLIC_TASKS_KEY].data?.map(
			// 		(item) => item.goal,
			// 	);

			// ...
			return { props: { axiosData } };
		},
);

// export const getServerSideProps = wrapper.getServerSideProps({ store }=> {
// 	const state = store.getState();
// 	console.log('state', state);

// 	return {
// 		props: {},
// 	};
// });

export default Index;
