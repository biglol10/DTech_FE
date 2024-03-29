import axios from 'axios';

const techListRequest = async (props: any) => {
	const techListResult = await axios
		.post(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/auth/getTechList`)
		.then((res: any) => {
			if (res.data.resultData.status === 'success') {
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
