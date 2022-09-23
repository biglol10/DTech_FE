import axios from 'axios';

const submitBoardRequest = async (props: any) => {
	const postData = props;
	const submitBoardResult = await axios
		.post(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/board/setSubmitBoard`, postData)
		.then((res: any) => {
			if (res.data.resultData.status === 'success') {
				return {
					result: res.data.resultData.status,
					resultData: res.data.resultData.queryResult[0],
				};
			} else {
				return {
					result: res.data.resultData.status,
				};
			}
		})
		.catch((err) => {
			return {
				result: 'error',
				errMessage: err.message,
			};
		});

	return submitBoardResult;
};

export { submitBoardRequest };
