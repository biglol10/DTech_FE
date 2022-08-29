import axios from 'axios';

const teamListRequest = async (props: any) => {
	const teamListResult = await axios
		.post('http://localhost:3066/api/auth/getTeamList')
		.then((res: any) => {
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

	return teamListResult;
};

export { teamListRequest };
