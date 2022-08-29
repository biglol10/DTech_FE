import axios from 'axios';

const techListRequest = async (props: any) => {
	const techListResult = await axios
		.post('http://localhost:3066/api/auth/getTechList')
		.then((res: any) => {
			if (res.data.resultData.status === 'success') {
				console.log('techListRequest');
				console.log(res.data);
				return {
					result: res.data.resultData.status,
					techList: res.data.resultData.queryResult,
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

	return techListResult;
};

export { techListRequest };
