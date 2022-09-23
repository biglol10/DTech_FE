import axios from 'axios';

const boardListRequest = async (props: any) => {
	const postData = props;

	const boardListResult = await axios
		.post(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/board/getBoardList`, postData)
		.then((res: any) => {
			if (res.data.resultData.status === 'success') {
				return {
					result: res.data.resultData.status,
					boardList: res.data.resultData.queryResult,
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

	return boardListResult;
};

export { boardListRequest };
