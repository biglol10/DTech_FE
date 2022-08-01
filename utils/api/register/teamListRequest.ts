import axios from 'axios';

// TODO: console.log 제거
const teamListRequest = async (props: any) => {
	console.log('teamListRequest');
	const teamListResult = await axios
		.post('http://localhost:3066/api/auth/getTeamList')
		.then((res: any) => {
			console.log(res);
			if (res.data.resultData.status === 'success') {
				return {
					result: res.data.resultData.status,
					teamList: res.data.resultData.queryResult,
				};
			} else {
				return {
					result: res.data.result,
				};
			}
		})
		.catch((err) => {
			return {
				result: 'error',
				errMessage: err.message,
			};
		});

	console.log(teamListResult);
	return teamListResult;
};

export { teamListRequest };
